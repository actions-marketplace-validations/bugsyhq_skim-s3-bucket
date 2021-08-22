# Skim S3 Bucket

This action removes (skims) old objects from S3 or compatible buckets. Perfect for temporary storage or backup environments where only recent objects are needed.

This action can be run on a schedule to periodically remove old objects. Keep in mind that GitHub actions are not guaranteed to run, so this should not be used in time-sensitive situations.

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
# .github/workflows/skim_s3_bucket
name: Skim S3 Bucket

# Optional: Skim the bucket the first minute of every hour
on:
  schedule:
    - cron: '1 * * * *'

# Skim the bucket
jobs:
  skim-s3-bucket:
    runs-on: ubuntu-latest
    steps:
      - uses: bugsyhq/skim-s3-bucket@v0.1.2
        with:
          access-key-id: '...'
          secret-access-key: ${{ secrets.SECRET_ACCESS_KEY }}
          region: '...'
          endpoint: 'https://...'
          bucket:  '...'
          objects-to-keep: 1
```
