#!/usr/bin/env bash
OUTPUT=/tmp/sync-output
aws configure set preview.cloudfront true
rm -rf public
npm run build

echo 'Generating Slate docs'
cd slate
rm -rf build
grunt exec:buildSlateDocs > /dev/null
mv build ../public/rest > /dev/null
cd ..

echo 'Publishing to S3'
aws s3 sync public/ s3://docs.smooch.io/ --delete > $OUTPUT
PATTERN="s3://docs.smooch.io"
INVALIDATION_BATCH="Paths={Quantity=1,Items=[/**]},CallerReference=\"build${CIRCLE_BUILD_NUM}\""

echo 'Invalidating Cloudfront'
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --invalidation-batch "${INVALIDATION_BATCH}" > /dev/null
