#!/bin/bash -e
cd "$(dirname "$0")"
bundle
bundle exec jekyll serve
