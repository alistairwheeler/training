#!/bin/bash
GIT_DIR=/var/git/misc/training.git
GIT_WORK=/home/maxime2/training-git
FRONT_DIR=/home/maxime2/front

echo "Updating deployed resources"
git --work-tree=$GIT_WORK --git-dir=$GIT_DIR checkout -f -b master
rm -rf $FRONT_DIR
mv $GIT_WORK/training/dist/* $FRONT_DIR/
rm -rf $GIT_WORK
echo "Done"
