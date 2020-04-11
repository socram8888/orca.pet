#!/bin/bash -e
cd "$(dirname "$0")"
export GEM_HOME="$HOME/.gems"
export PATH="${GEM_HOME}/bin:$PATH"
bundle exec jekyll serve
