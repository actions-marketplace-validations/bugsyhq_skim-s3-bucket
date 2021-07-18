const core = require('@actions/core')
const { S3Client, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const accessKeyId = core.getInput('access-key-id')
const secretAccessKey = core.getInput('secret-access-key')
const region = core.getInput('region')
const endpoint = core.getInput('endpoint')
const Bucket = core.getInput('bucket')
const objectsToKeep = core.getInput('objects-to-keep')

try {
  const client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region, endpoint })

  const getSkimmableKeys = async () => {
    const listObjects = new ListObjectsV2Command({ Bucket })
    const response = await client.send(listObjects)
    
    const objects = response.Contents
    if (!objects) return

    const sortedObjects = objects.sort((a, b) => {
      return (a.LastModified - b.LastModified)
    })

    const skimmableObjects = sortedObjects.slice(0, -objectsToKeep)
    if (!skimmableObjects) return

    return skimmableObjects.map(object => object.Key)
  }

  const deleteObjects = async (keys) => {
    let output = []

    for (const Key of keys) {
      const deleteObject = new DeleteObjectCommand({ Bucket, Key })
      const response = await client.send(deleteObject)
      output.push(response)
    }

    return output
  }

  getSkimmableKeys().then(keys => deleteObjects(keys).then(output => console.log(output)))
} catch (error) {
  core.setFailed(error.message);
}
