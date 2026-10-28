#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

find lib test -name '*.dart' \
  -not -path '*/atoms/icon/*' \
  -not -name 'tokens.dart' \
  -print0 | xargs -0 dart format "$@"
