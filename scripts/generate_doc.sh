#!/bin/bash
set -e

# ensure jsdoc exists
if ! [ -x "$(command -v jsdoc)" ]; then
  echo -e 'Error: jsdoc is required and not installed !\n\nTo install run:   "npm install -g jsdoc"' >&2
  exit 1
fi
jsdoc ../assets -d ../doc
