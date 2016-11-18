#!/usr/bin/env bash
CLOUDFRONT_DISTRIBUTION=E2X6XVNS18EPPG
OUTPUT=/tmp/sync-output
aws configure set preview.cloudfront true
npm run build
aws s3 sync public/ s3://docs.smooch.io/ --delete > $OUTPUT
PATTERN="s3://docs.smooch.io"
INVALIDATION_BATCH="Paths={Quantity=1,Items=[/**]},CallerReference=\"build${CIRCLE_BUILD_NUM}\""
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --invalidation-batch "${INVALIDATION_BATCH}"
