#!/bin/sh

echo "Update images"
npm run optimize-images

echo "Delete old images"
npm run cleanup-images