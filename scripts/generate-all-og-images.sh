#!/usr/bin/env bash
#
# Generate OG images for all blog posts.
#
# Finds each blog post's thumbnail via its frontmatter and composites
# the favicon onto it, writing the result to public/og/<slug>.png.
#
# Usage:
#   ./scripts/generate-all-og-images.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CONTENT_DIR="$PROJECT_ROOT/src/content/blog"
OUTPUT_DIR="$PROJECT_ROOT/public/og"

mkdir -p "$OUTPUT_DIR"

count=0

for post_dir in "$CONTENT_DIR"/*/; do
  slug="$(basename "$post_dir")"
  index_file="$post_dir/index.mdx"

  if [ ! -f "$index_file" ]; then
    # Try .md fallback
    index_file="$post_dir/index.md"
    if [ ! -f "$index_file" ]; then
      echo "Skipping $slug: no index.mdx or index.md found"
      continue
    fi
  fi

  # Extract thumbnail path from frontmatter
  thumbnail_rel=$(grep '^thumbnail:' "$index_file" | head -1 | sed 's/^thumbnail: *//' | sed 's/^["'\'']*//;s/["'\'']*$//')

  if [ -z "$thumbnail_rel" ]; then
    echo "Skipping $slug: no thumbnail in frontmatter"
    continue
  fi

  thumbnail="$post_dir/$thumbnail_rel"

  if [ ! -f "$thumbnail" ]; then
    echo "Skipping $slug: thumbnail not found at $thumbnail"
    continue
  fi

  "$SCRIPT_DIR/generate-og-image.sh" "$thumbnail" "$OUTPUT_DIR/$slug.png"
  count=$((count + 1))
done

echo "Generated $count OG image(s)"
