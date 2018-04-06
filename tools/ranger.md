[The Howlin Developer Guide](/index.md)



Ranger
======


## Cheatsheet

```bash
m                   # bookmark
'                   # find bookmark
''                  # go back to last dir

cw                  # rename
a                   # append before extension

z                   # view settings to toggle
zd                  # toggle list dirs first setting
zf                  # filter files (run without arg to reset)
F                   # clear filter
zh                  # toggle hidden files setting

f                   # find (dynamic, case-insensitive; will open if found)
/                   # find file

<space>             # select file
v                   # select all files in dir
V                   # Visual mode (select)
yy                  # yank file to *new* register
ya                  # yank file to current register
yr                  # yank file from current register
pp                  # paste register

E                   # open file (editor)
l                   # open file (editor)
i                   # open file (pager)
r                   # open file with

o                   # change sort order
on                  # change sort order back to normal
or                  # reverse sort order
om                  # sort by last modified
os                  # sort by size
ot                  # sort by type
oe                  # sort by extension

:                   # ranger console
!                   # shell console
S                   # load Shell from current directory
<C-d>               # close shell (return to ranger)

gh                  # go home
gr                  # go /
ge                  # go /etc
gm                  # go /media

:cd                 # use shell style movement

emi                 # console -p15 shell mkdir -p ; mv %%s $_
emd                 # console mkdir%space
eto                 # console touch%space
egit                # set vcs_aware!
eex                 # chmod 744
enx                 # chmod 644
exh                 # extracthere
```

## Customising

Avoid these first chars

```bash
m, y, o, g, z, 
```
