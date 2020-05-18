#!/bin/bash -e
cd "$(dirname "$0")"
npm install
npx webpack
bundle exec jekyll serve
