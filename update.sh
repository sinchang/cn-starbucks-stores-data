#!/usr/bin/env bash
npm run build
npm run check
npm run db
echo ========== CHECKING FOR CHANGES ========
changes=$(git diff format.json)
if [ -n "$changes" ]; then
  git add .
  now=$(date +"%Y-%m-%d")
  git commit -m "Update $now"
  git push
else
  echo "... No changes found"
fi
