#!/bin/bash -e
cd "$(dirname "$0")"
changed=$(git status --porcelain | wc -l)
if [ $changed -eq 0 ]; then
	echo "No differences - nothing to do"
	exit 0
fi
git add .
git commit -m "Updated web"
git push
