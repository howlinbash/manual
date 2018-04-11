[The Howlin Developer Guide](/index.md)



Bash
====

[Back to Unix](./index.md)


## Contents


- [Tips](##Tips)
- [Setup](##Setup)
- [History](##History)
- [alias](##alias)
- [Cool Tricks](##Cool Tricks)


## Tips


 * If you press 'Ctrl-s' by accident, unfreeze the terminal with 'Ctrl-Q'


## Setup


```bash
# Aggregate history of all terminals in the same .history. On your .bashrc
shopt -s histappend
export HISTSIZE=100000
export HISTFILESIZE=100000
export HISTCONTROL=ignoredups:erasedups
export PROMPT_COMMAND="history -a;history -c;history -r;$PROMPT_COMMAND"

# Add vi keybindings for bash 
# and all readline-enabled applications (python, mysql, etc)
vim ~/.inputrc
'Set editing-mode vi'
```


## History


```bash
!0:p # error
!-1:p                         # last command
!-2:p                         # penultimate command
!-3:p                         # 3rd last command
```

errors don't get added to history stack.

If bash_history gets out of sync reindex it with `history -w`


## alias


```bash
# Does command already exist?
type ll
# If not append the alias to the .bash_aliases file
echo "alias ll='ls -l'" >> .bash_aliases
```


## Cool Tricks


```bash
# Chain commands with the semi-colon.
cd /usr/bin;ls;cd;

# Command substitution
ls -l $(which cp)

# Bang-Bang: Use last typed command. Great if you forget sudo.
vim /etc/hosts # Error! You need to be root user.
sudo !!

# Bang-Dollar: Use last argument.
ls /some/long/directory
cd !$

# Caret Substitution
vim /etc/Somefile.conf # Oops, that file doesn't exist!
^f^F # (vim /etc/SomeFile.conf)

# Make a bunch of file group with a changing suffix.
touch doc_{1..5}.txt

# this will print
doc_1.txt
doc_2.txt
doc_3.txt
doc_4.txt
doc_5.txt

# build a dir for every month of the year...
mkdir {2009..2011}-0{1..9} {2009..2011}-{10..12}

# Replace first arg with second arg {arg1,arg2}
cp filename{,-old}
cp filename{-old,}
cp filename{-v1,-v2}

```




```bash
# move everything into newly created test dir
mkdir test && mv !(test) test
# 
!!
!$
!^
cp bash{,.bak}
cp {_,}bash
```
