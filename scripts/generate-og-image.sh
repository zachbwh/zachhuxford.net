#!/usr/bin/env bash
#
# Generate an OG image by compositing the site favicon onto a thumbnail.
#
# Usage:
#   ./scripts/generate-og-image.sh <thumbnail> <output>
#
# Example:
#   ./scripts/generate-og-image.sh src/content/blog/my-post/thumbnail.jpeg public/og/my-post.png
#
# The thumbnail should ideally be 1200x630 (standard OG dimensions).
# The favicon is composited in the bottom-left over a gradient.

set -euo pipefail

THUMBNAIL="${1:?Usage: generate-og-image.sh <thumbnail> <output>}"
OUTPUT="${2:?Usage: generate-og-image.sh <thumbnail> <output>}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
FAVICON="$PROJECT_ROOT/public/apple-touch-icon.png"

if [ ! -f "$THUMBNAIL" ]; then
  echo "Error: thumbnail not found: $THUMBNAIL" >&2
  exit 1
fi

if [ ! -f "$FAVICON" ]; then
  echo "Error: favicon not found: $FAVICON" >&2
  echo "Run the site build or add public/apple-touch-icon.png first." >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

# Read thumbnail dimensions and derive sizes proportionally
read -r WIDTH HEIGHT <<< "$(magick identify -format '%w %h' "$THUMBNAIL")"
ICON_SIZE=$(( HEIGHT / 3 ))
PADDING=$(( HEIGHT / 40 ))

magick "$THUMBNAIL" \
  \( -size "${WIDTH}x${HEIGHT}" gradient:'#000000CC-#00000000' -flip \) \
  -composite \
  \( "$FAVICON" -resize "${ICON_SIZE}x${ICON_SIZE}" \) \
  -gravity SouthWest -geometry "+${PADDING}+${PADDING}" \
  -composite \
  "$OUTPUT"

echo "Generated: $OUTPUT"
