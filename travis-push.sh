#!/usr/bin/env bash
npm run build
npm run check

git config --global user.email "sinchangwen@gmail.com"
git config --global user.name "sinchang"

echo ========== CHECKING FOR CHANGES ========
changes=$(git diff format.json)
if [ -n "$changes" ]; then
  now=$(date +"%Y-%m-%d")
  git checkout -b $now
  git add .
  git commit -m "Update $now"
  git remote rm origin
  git remote add origin https://sinchang:${GITHUB_TOKEN}@github.com/sinchang/cn-starbucks-stores-data.git > /dev/null 2>&1
  git push origin master
else
  echo "... No changes found"
fi
