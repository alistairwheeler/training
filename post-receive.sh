#!/bin/bash
GIT_DIR=/var/git/misc/training.git
GIT_WORK=training-git
FRONT_DIR=front

echo "Updating deployed resources"
cd
[ ! -d $GIT_WORK ] && mkdir $GIT_WORK
git --work-tree=$GIT_WORK --git-dir=$GIT_DIR checkout -f master
rm -rf $FRONT_DIR
mv $GIT_WORK/training/dist ./$FRONT_DIR
echo "Done"
