# Skim S3 Bucket

This action skims old objects from S3 or compatible buckets.

## Inputs

### `access-key-id`

**Required** AWS public access key

### `secret-access-key`

**Required** AWS secret access key

### `region`

**Required** Region of the S3 service

### `endpoint`

**Required** Endpoint of the S3 service

### `bucket`

**Required** Name of the bucket

### `objects-to-keep`

Number of objects to keep. Defaults to 1

## Example usage

```yml
uses: bugsyhq/skim-s3-bucket@v0.1.1
with:
  access-key-id: '...'
  secret-access-key: ${{ secrets.SECRET_ACCESS_KEY }}
  region: '...'
  endpoint: 'https://...'
  bucket:  '...'
  objects-to-keep: 1
```