

[The Howlin Developer Guide](../home.md)





# Git




## Basics



### Quick Start


```bash
# Install git to projects home directory
git init

# All steps to 1st commit. don't push to keep offline.
git status
git add [file]
git commit -m "first commit"
git push
```



### Branches


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
git push --delete origin branch-name
```



### Analysis


```bash
# List all commits
git log

# Show details of last commit
git show --summary

# Show files changed between commits
git diff --name-only <hash-penult> <hash-latest>

# What's the difference between my local uncommited file and the last commit
git diff routes/index.js

# Show origin/master/server/hub details
git config --get remote.origin.url # Offline version
git remote show origin             # sshes into hub
```



### Back-tracking


```bash
# Undo an overzealous 'git add' run:
git reset

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

# Recover File
git checkout [hash] -- path/to/file
```




## Committing



### Tips


```bash
# commit all tracked/modified files without using add
git commit -a -m "message"

# Rename a file
git mv                        # this command is shorthand for...

    mv README.md README
    git rm README.md
    git add README
```



### Removing files


```bash
rm <file>                     # rm file from working dir -but not repo or stage
git rm <file>                 # SAA but will remove from repo on commit
git rm -f <file>              # rm an as of yet uncommited (yet staged) file
git rm --cached <file>        # unstage a file (but keep it in working dir)
git rm -r <directory>         # rm dir from git and local fs
git rm log/\*.log             # rm all .log files in log dir
git rm \*~                    # rm all files that end with ~
```


### git tags


```bash
git tag                       # list the tags
git tag -l "v0.12*"           # list all versions prefixed with 0.12
git tag -a v1.4 -m "my v1.4"  # create annotated tag
git tag show v1.4             # show tag data
git tag -a v1.2 <hash>        # retrospectively add tag to <hash>
git push origin v1.5          # push individual tag (otherwise it wont be)
git push origin --tags        # push all tags
git checkout -b version2 v2.0 # checkout (to branch-name version2) v.2.0
```




## Branching



```bash 
## Branch Managemnet

git branch                    # list current branches
git branch -v                 # include summary of last commit
git branch --merged           # already merged (ie if no *, its ok to delete)
git branch --no-merged        # contains un-merged work (-d will fail)
git branch -d testing         # delete branch
git branch -D testing         # force delete branch
```



### A Useful Workflow

You’ll follow these steps:

 - Do work on a website.
 - Create a branch for a new story you’re working on.
 - Do some work in that branch.

At this stage, you’ll receive a call that another issue is critical.
You need a hotfix. You’ll do the following:

 - Switch to your production branch.
 - Create a branch to add the hotfix.
 - After it’s tested, merge the hotfix branch, and push to production.

Switch back to your original story and continue working.

```bash 
git checkout -b iss53
# this command is shorthand for...

    git branch iss53
    git checkout iss53


# Working on issue 53
git checkout -b iss53
vim index.html
git commit -a -m 'added a new footer [issue 53]'

# Recieve call for needed 'hotfix'
# Stop working on issue 53 and create new branch
git checkout master
git checkout -b hotfix
vim index.html
git commit -a -m 'fixed the broken email address'

# hotfix in place, merge back to master with 'fast-foward merge'
git checkout master
git merge hotfix
git branch -d hotfix

# Get back to work on issue 53 (hotfix has not yet been added to this branch)
git checkout iss53
vim index.html
git commit -a -m 'finished the new footer [issue 53]'

# Merge iss53 with a merge commit.
# A new commit made from 2 ancestors (old master and new hotfix master)
git checkout master
git merge iss53
git branch -d iss53
```




## Merging



### Rebasing



```bash
   -------------------------------------------------------
 !   D O   N O T   R E B A S E   S H A R E D   R E P O S   ! 
   -------------------------------------------------------
```

```bash
                                experiment
                                   :
                                 ( c4 )
                               / 
                              /  master
                             /     :
( c0 ) <-- ( c1 ) <-- ( c2 ) <-- ( c3 )
```


the experiment branch (c4), is descended from an old master commit (c2)
master is upto c3.
instead of merging c2,3 & 4 into a new commit on master (c5)...
rebase will add c4 onto the end of c3 on the master and then ff the master


```bash
                                 master    experiment
                                   :          :
( c0 ) <-- ( c1 ) <-- ( c2 ) <-- ( c3 ) <-- ( c4 )

git checkout experiment       # ready to rebase from branch
git rebase master             # append c4 to c3 on master
git checkout master           # switch to master to update
git merge experiment          # fast foward master to c4
```

The end result is the same commit that merge would create (c5 == c4)
but the history would look linear with rebase. No trace of 'experment' branch.


#### A topic branch off another topic branch

You branched a topic branch (server) to add some server-side functionality to
your project, and made a commit.

Then, you branched off that to make the client-side changes (client) and
committed a few times.

Finally, you went back to your server branch and did a few more commits.

```bash
                               master
                                 :
 ( c1) <-- ( c2) <-- ( c5) <-- ( c6)
                 \
                  \
                   \          
                     ( c3) <-- ( c4) <-- (c10)
                           \               :
                            \            server
                             \
                               ( c8) <-- ( c9)
                                           :
                                         client
```

Suppose you want to merge your client-side changes into your master to release,
but you want to hold off on the server-side changes until it’s tested further.

You can take the changes on client that aren’t on server and replay them on
your master branch by using the --onto option.

```bash
git rebase --onto master server client
```


```bash
                               master
                                 :
 ( c1) <-- ( c2) <-- ( c5) <-- ( c6) <-- ( c8) <-- ( c9)
                 \                                   :
                  \                                client
                   \          
                     ( c3) <-- ( c4) <-- (c10)
                                           :
                                         server
```
                    
```bash
git checkout master           # !
git merge client              # fast-forward master
git rebase master server      # Do the same with the server
git checkout master           # !
git merge server              # fast-forward master
git branch -d client          # both branches are now merged
git branch -d server          # so they can be deleted
```
                                         

```bash
                                           master
                                             :
 - ( c2) <-- ( c5) <-- ( c6) <-- ( c8) <-- ( c9) <-- ( c3) <-- ( c4) <-- (c10)
                                             :                             :
                                           client                        server
```




## Analysis



### Log

```bash
git log
git log -p                    # Print diff for each commit
git log --stat                # Print abbreviated stats (also shortstat)
git log --graph               # Add a commit-merge graph
git log --name-only           # Just show the filename changed
git log --name-status         # add the Ms, the As and the Ds
git log --abbrev-commit       # Abbreviate hash
git log --pretty=oneline      # One line per commit
git log --pretty=short        # Short <p> per commit (also full, fuller)
git log --pretty=format:"%h - %an, %ar : %s"             # custom format

# filters
git log -2                    # limit to last two commits
git log --grep=test           # grep the commit messages
git log -Slibrary             # grep the file contents (for function)
git log --since=10.years
git log --author=Chacon

# A nice combo
git log --stat --abbrev-commit --pretty=oneline -5          # visual
git log --name-status --abbrev-commit --pretty=oneline -5   # abbrev

# A good way to examine different branches
git log --oneline --decorate --graph -10 --all
```


### Short Status


```bash
git status -s                 # Left column: staging area; right: working tree

 M README                     # Modified but not yet staged.
MM Rakefile                   # Modified, staged and then modified again.
A  lib/git.rb                 # A new file; added to staging area.
M  lib/simplegit.rb           # A modified file; staged.
?? LICENSE.txt                # A new file; not staged.
```



### Staging


```bash
git diff                      # compares all working dir changes to staging
git diff --staged             # compares all staged changes to last commit
git diff --cached             # compares all staged changes to last commit
```




## Working with Remotes



### Create Remote Repo for Untracked Project


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


### Remotes


```bash
git remote                    # See which remote servers you have configured
git remote add [name] [url]   # Add remote-tracking reference
git remote -v                 # Show urls
git remote show [remote-name] # Shows everything else

git pull [remote-name]        # eg: git pull origin
git fetch [remote-name]       # git pull without auto-merge.
git push origin [branch]      # eg: git push origin master

git remote rename origin og   # rename origin to og
git remote remove og          # remove remote origin
```


Remote-tracking branches are references to the state of remote branches.
They’re local references that you can’t move;
they’re moved automatically for you whenever you do any network communication.
Remote-tracking branches act as bookmarks to remind you where the branches in
your remote repositories were the last time you connected to them.

these commands show you the references the remote has

```bash
gie remote show [remote]      # show all references on remote
git remote show origin        # e.g. all tags, branches...
```

if you set up a remote-tracking branch these references will be included

they take the form (remote)/(branch). eg origin/master

```bash
git fetch origin              # grab all the data from origin

git push origin hotfix        # push hotfix branch to hotfix branch on server
git push origin hotfix:server # push hotfix branch to server branch on server

git fetch origin/hotfix
git merge origin/hotfix
git checkout -b hotfix origin/hotfix
```

Checking out a local branch from a remote-tracking branch automatically creates
what is called a “tracking branch” (and the branch it tracks is called an
“upstream branch”).

Tracking branches are local branches that have a direct relationship to a 
remote branch.

If you’re on a tracking branch and type git pull, Git automatically knows which
server to fetch from and branch to merge into.

```bash
# this command sets up a tracking branch [hotfix] of the upstream-branch on the
# remote server [origin/hotfix]
git checkout -b hotfix origin/hotfix

# it can be called with shorthand as...
git checkout --track origin/hotfix         # or ...
git chekcout hotfix

# customize name of local branch
git checkout -b hf origin/hotfix

# pin local branch to specific upstream branch with -u
git branch -u origin/hotfix


git branch -vv                # cached info on branches
git fetch --all               # update info
git branch -vv                # up to date info on all branches

# once merged you can delete branch on the server like this
git push origin --delete hotfix
```




## Back Tracking


### Undoing Things

```bash
# Forgot to add changes
git commit -m 'my commit'     # Make a commit but forget to add a file/change
git add forgotten_file        # Add the forgotten file/change
git commit --amend            # Amend the commit
  
git reset HEAD <file>         # unstage a file 
```




## House Keeping



### Ignoring Files


```bash
*.a                           # ignore all files ending with .a
!lib.a                        # --but do track lib.a, (whilst doing above)
/TODO                         # ignore the TODO file but not the subdir/TODO
TODO/                         # this is perhaps the inverse of above
TODO                          # perhaps this ignores them both
build/                        # ignore all files in the build/ directory
doc/*.txt                     # ignore doc/notes.txt, but not doc/server/boo.txt
doc/**/*.pdf                  # ignore all .pdf files in the doc/ directory
```



### Git Clean


```bash
git clean                     # this will remove all untracked (unwanted) files
git stash --all               # git clean is dangerous. this may be safer
git clean -f -d               # remove dirs as well (force)(like rm -rf)
git clean -n                  # do a dry run (so you can see what will be lost)
git clean -d -n               # same but remove dirs as well
git clean -n -d -x            # remove gitignore files
git clean -i                  # interactive	
```



### Git Stash


```bash
git stash                     # save mess to be commited later
git stash -u                  # also stash untracked files
git stash --patch             # interactively stash files
git stash --keep-index        # don't stash anything already saved with git add
git stash list                # show current stash[es]
git stash show                # diff summary between stash and last commit
git stash show -p             # show diff details
git stash apply               # revert stash
git stash drop                # remove stash (perhaps after applying it)
git stash pop                 # combine apply and drop
git stash drop@{0}            # remove stash at index 0
git stash branch              # recover stash from old commit and apply
```




## WorkFlows



### NVIE


http://nvie.com/posts/a-successful-git-branching-model/

```bash
  feature branches        dev       release     hotfixes     master     
                                    branches                                          

  Feature for                                     ____....----( ) <── Tag 0.1            
  future relsease                 ____....----````            /|    
                          ( )-````                           | |    
   │    Major feature      |                                |  |    
   │    for next release  ( )                              /   |    
   │                       |                              /    |    
   │           │  __...---( )       Severe bug           |     |    
   V    ___.---│``       / |        fixed for            |     |    
  ( )```       │       /   |        production: ──┐     /      |    
   |           │     /     |        hotfix 0.2    │    /       |
   |           │   /      ( )                     │   |        |    
   |           V /         |                      │   |        |
   |          ( )          |                      │  /         |    
   |           |           |                      V /          |
  ( )          |           |                      ( )          |    
   |           |           |                ..--``   `\_       |
   |          ( )          |         _..--``            `\     |    
   |           |           |   ..--``  ^                  `\_  |
   |           |          ( )``        │                     `( ) <── Tag 0.2
   |           |           |                                   |
   |          ( )          |    Incorporate bug fix in dev     |    
   |             ``--.._   |                                   |    
   |                    ``( )                                  |    
   |    From this          | ``--.._            Start of       |    
   |    point on,  ───────>|        ``( ) <──── release        |    
   |    "next release"     |           |        branch for     |    
   |    means the          |          ( )       1.0            |    
   |    release            |   _..--`` |                       |    
   |    after 1.0         ( )``       ( ) <──── only bug       |    
   |               _..--`` |           |        fixes          |
  ( )         ( )``        |          ( )                      |    
   |           |           |   _..--`` ^ ``-.._                |    
   |          ( )         ( )``        │       ``--._          |    
   |           |           |           │             ``--._    |    
   |          ( )          |                               ``-( ) <── Tag 1.0
   |             \         |       Bug fixes from              |             
  ( )             `\       |       release branch may be       |
     ``-.._         `\     |       continuously merged         |    
           ``--._     `\   |       back into dev               |    
                 ``--._ `\ |                                   |    
                       ``-( )                                  |    
                           | ``--.._                           |    
                           |        ``( )                      |    
                           |   _..--``   ``-.._                |
                          ( )``                ``--._          |    
                                                     ``--._    |    
                                                           ``-( )   
```


#### Feature branches 

May branch off from:
 - dev

Must merge back into:
 - dev

Branch naming convention:
 - anything except master, dev, release-\*, or hotfix-\*

**Creating a feature branch**

When starting work on a new feature, branch off from the dev branch. 

```bash
git checkout -b myfeature dev
```

**Incorporating a finished feature on dev**

Finished features are merged into the dev branch.

```bash
git checkout dev
git merge --no-ff myfeature
git branch -d myfeature
git push origin dev
```


#### Release branches

May branch off from:
 - dev

Must merge back into:
 - dev and master

Branch naming convention:
 - release-\*

**Creating a release branch**

```bash
git checkout -b release-1.2 dev
./bump-version.sh 1.2
git commit -a -m "Bumped version number to 1.2"
```

**Finishing a release branch**

```bash
git checkout master
git merge --no-ff release-1.2
git tag -a 1.2
```

To keep the changes of the release branch, we must merge back into dev.

```bash
git checkout dev
git merge --no-ff release-1.2
```

This step may well lead to a merge conflict. If so, fix it and commit.  
We may now remove the release branch.

```bash
git branch -d release-1.2
```


#### Hotfix branches

May branch off from:
 - master

Must merge back into:
 - dev and master

Branch naming convention:
 - hotfix-\*

**Creating the hotfix branch**

Hotfix branches are created from the master branch.

```bash
git checkout -b hotfix-1.2.1 master
./bump-version.sh 1.2.1
git commit -a -m "Bumped version number to 1.2.1"
```

Don’t forget to bump the version number after branching off!  
Then, fix the bug and commit the fix in one or more separate commits.

```bash
git commit -m "Fixed severe production problem"
```

**Finishing a hotfix branch**

When finished, the bugfix needs to be merged into master, but also into dev.  
This ensures the bugfix is included in the next release.  
This is mirrors how release branches are finished.

First, update master and tag the release.

```bash
$ git checkout master
$ git merge --no-ff hotfix-1.2.1
$ git tag -a 1.2.1
```

Next, include the bugfix in dev, too:

```bash
$ git checkout dev
$ git merge --no-ff hotfix-1.2.1
```

**Note**  
You may instead wish to merge the hotfix into the release branch instead.




## New Tricks

```bash
# pair the correct ssh key (host) with the correct remote repo
git remote set-url origin git@<host>:howlinbash/dot.git
git remote set-url origin git@gitl:howlinbash/dot.git

git reflog                    # view git history (a git of git if you will)
git reset HEAD@{1}            # 

git stash show -p             # show last stash diff
git stash list                # show all stashes
git stash apply               # un stash stash to return to where left off

git merge --squash <branch>   # merge branch as 1 commit
```

