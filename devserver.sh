#!/bin/bash -e
cd "$(dirname "$0")"
bundle config path vendor/bundle
bundle install
bundle exec jekyll serve
