[The Howlin Developer Guide](../home.md)



Bash
====

[Back to Unix](./intro.md)


Tips
----


 * If you press 'Ctrl-s' by accident, unfreeze the terminal with 'Ctrl-Q'


Setup
-----


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


History
-------


```bash
# print the 2133rd command from the history log
history 2133 
```


alias
-----


```bash
# Does command already exist?
type ll
# If not append the alias to the .bash_aliases file
echo "alias ll='ls -l'" >> .bash_aliases
```


Tricks
------


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
