#!/bin/bash
GIT_DIR=/var/git/misc/training.git
GIT_WORK=/var/www/docs2

echo "Updating deployed resources"
cd
[ ! -d $GIT_WORK ] && mkdir $GIT_WORK
git --work-tree=$GIT_WORK --git-dir=$GIT_DIR checkout -f master
echo "Done"
