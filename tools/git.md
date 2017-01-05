


[The Howlin Developer Guide](../home.md)



# Git



## Quick Start

```bash
# Install git to projects home directory
git init

# All steps to 1st commit. don't push to keep offline.
git status
git add [file]
git commit -m "first commit"
git push
```



## Branches

```bash
# Make a new branch
git branch new-branch
git checkout new-branch

# Merge the branch. push/pull for online repository.
git checkout master	
git pull
git merge new-branch
git push

# Delete branch
git branch -d new-branch

# Push a branch as a branch
git checkout -b another-branch
git add file1 file2
git commit -m "another-edit"
git push origin another-branch 		   

# Push local branch to hub
git push -u origin branch-name

# Delete branch on hub
git push --delete origin pigeon-comments

```



## Analysis

```bash
# List all commits
git log

# Show details of last commit
git show --summary

# Show files changed between commits
git diff --name-only hash1 hash2

# What's the difference between my local uncommited file and the last commit
git diff routes/index.js

# Show origin/master/server/hub details
git config --get remote.origin.url # Offline version
git remote show origin             # sshes into hub
```



## Back-tracking

```bash
# Reset file
git checkout file

# Remove your last commit
git reset --soft HEAD~1

# Revert to last commit -delete all changes since!
git reset HEAD --hard

# or...
git reset --hard hash1

# Removing files
git rm file                    # rm file from git and local fs
git rm -r directory            # rm dir from git and local fs
git rm --cached file           # rm file from git; keep local copy
git rm -r --cached directory   # rm dir from git; keep local copy
```

### Git Stash

```bash
git stash
git stash list
git stash show
git stash pop
git stash drop
```



## Create Remote Repo for Untracked Project

Create new repo on Gitlab and grab ssh url

```bash
cd npl
git init
git remote add origin git@gitlab.com:howlinbash/npl.git
touch README.md .gitignore
git add README.md .gitignore
git commit -m "Setup Repo"
git push -u origin master
```



## New Tricks


