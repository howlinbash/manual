[The Howlin Developer Guide](/index.md)



Vim
===


## Jotter


```bash
~                  toggle case
W                  WORD
E                  END
g_                 To the last non blank character
gm                 move across line to middle of screen
ge (gE)            backward to the end of word
t                  move to before char (like f)
dap                delete around paragraph
dk                 deletes 2 lines up
dj                 deletes 2 lines down
dvj                deletes from the cursor until the character below the cursor
d<C-V>j            deletes the character under and below the cursor.
)                  [count] sentences forwards
(                  [count] sentences backwards
:r FILENAME        will paste file contents below curser
:r! ls             will paste command output below curser
```


### Patterns

```bash
cwBAR/FOO<ent>.n.n change word, find next, repeat change word
```


### Tips

```bash
leader bindings on vimrc file
```


### To Add

```bash
Custom Colours     set ft=socket-bug
tmux fix           set term=screen-256color
window manipulation
focus split        ctrl-w _
equalize splits    ctrl-w =
resize split       :30winc -
                   :30winc +
```


## My Macros


```bash
"nyy               "Yank any of the below macros to n

# tab to col 20
hvgeldi 19.020|vwhd0
# make a numbered list
Yp
# Remove == Title tags
0dw$bd$0k
# Add || Box Title tag
i|  A  |0O=i=78.j0f|kld$yyjp
# Add == Title Tag
0Oji== A ==o
# Add === TITLE Tag
0OjVgUi===A===0ok
```


## Intro


### Basics

```bash
:q                 Quit
:wq                Save & Quit
:w FILENAME        Save (copy) as
CTRL W-W           switch window
```


### Tips

```bash
When typing a : command, press CTRL-D to see possible completions.
                   Press <TAB> to use one completion.
.                  repeat last command
<C-n>              auto completion
<C-p>              auto completion
```


## Essentials


### Navigate

```bash
hjkl               scroll
w                  start of word
5w                 move 5 words right
e                  end of word
$                  end of line
0                  start of line
gg                 top of doc -- also [[
G                  bottom of doc -- also ]]
500G               move to line 500
20|                move cursor horisontally to 20th char of line
ctrl O             move curser to previous position
ctrl I             move curser forward again
%                  move to matching bracket ) } ]
M                  move to middle of screen
L                  move to bottom of screen
)                  move forward sentence
(                  move backward sentence
{                  Move up by paragraph
}                  Move down by paragraph
f                  move to next character in line
fy                 move to the next 'y' character
;                  move to next match
,                  move to previous match
F                  move behind cursor for previous character in line
3fy                move to 3rd 'y' on line
ty                 move to just before 'y' character
dt"                delete everything until the "
ct-u               page up
ct-d               page down
^                  move to first word on line
g_                 go to last character on line
```


### Insert

```bash
esc                leave insert
i                  insert mode
a                  append AFTER the curser
I                  insert at start of line
A                  append end of line
o                  insert on line below
O                  insert on line above
r                  replace character
R                  Replace text
```


### Undo

```bash
u                  undo
U                  undo edits on whole line
ctrl-r             Redo
```


### Delete

```bash
x                  delete
dw                 delete word
d5w                delete next 5 words
d$                 delete to the end of line
d5$                delete to end of line and 4 lines below also
dd                 delete line
d5d                delete 5 lines
p                  put dd line(s) below curser
P                  put dd line(s) from curser
ci"                change content inside quotes
di                 delete content inside quotes
ce                 change till end of word
de                 delete till end of word
```


### Substitute

```bash
:s/old/new/        substitute old with new
:s/old/new/g       substitute old with new for whole line
:%s/old/new/g      substitute whole file
:%s/old/new/gc     substitute whole file with prompts
:#,#s/old/new/g    substitute between range #,#
    #examples
:%s/and .*//       delete pattern to end of line
:%s/\s\+$//        remove trailing whitespace
:%s/^M//g          remove GUI carriage returns. see line below:
                   type: :%s/<Ctrl-V><Ctrl-M>//g
                   Where <Ctrl-V><Ctrl-M> means type Ctrl+V then Ctrl+M.
:%s/^M/\r/g        replace ^M with a 'vim' carriage return.
```


### Search

```bash
/                  search forward for phrase
n                  next result
N                  previous result
?                  search backward for phrase
:set ic            ignore case
/ignore\c          ignore case (this once)
:set noic          undo ignore case
:set hls           highlight all search results (& show partial patches)
:noh               undo above
```


### Copy-Paste

```bash
y                  copy (yank)
yy                 yank line
d                  cut
p                  paste
P                  paste after cursor
v<motion>:w<file>  writes selection to disc
```


### Style

```bash
gu                 change sentence to lowercase
gU                 change sentence to uppercase
```


## Visual


### Basics

```bash
v                  select
vw                 select word
v$                 select line
```


### vi & va (inside & around)

```bash
Suppose the cursor is on the first 'o' of
(map (+) ("foo")).
vi"                will select foo.
va"                will select "foo".
vi)                will select "foo".
va)                will select ("foo").
v2i)               will select map (+) ("foo")
v2a)               will select (map (+) ("foo"))
vat                html tags - select from one tag to last
```


### Block Editing

```bash
^                  move to first character
<C-v>              start block selection
<C-d>              pick a movement argument (could also be jjj or %)
I//[esc]           use // to comment block
```


## Interface


### Windows

```bash
:help              windows-intro
:vsplitright       open new window on the right
ctrl-w             toggle through windows
ctrl-w h/j/k/l     move cursur in this direction
ctrl-w r           rotate windows
ctrl-w x           swap windows
:q                 close window
:30winc <          narrow window by 30
```


### Buffers

```bash
:buffers           list all buffers currently open
:b1                edit buffer 1
:b2                edit buffer 2
:bn                edit next buffer
:bp                edit previous buffer
```


## Advanced


### Macros

```bash
q                  start macro
f                  macro variable (can be any letter)
q                  stop macro
@f                 repeat macro
5@f                repeat macro 5 times
@@                 repeat last macro
V}:normal @x       repeat macro to end of paragraph
VG:normal @x       repeat macro to document base
```


### Registers

```bash
:help registers
"fyy               yank line to register 'f'
p                  paste the above yanked line
"jdd               delete line to register 'j'
"Fyy               a capitalised letter will append to register
"jp                paste the J register
```


### Tips

```bash
You can edit macros by treating them as registers.
You can add a macro to a macro -- meta-macros :-)
```


## The Shell


### Shell Access

```bash
:sh                access the shell
:!                 execute an external command
:r FILENAME        will paste file contents below curser
:r! ls             will paste command output below curser
```


### File System Explorer

```bash
:Sexplore          Open FS explorer
:Sexplore!         Open narrow IDE style browser
:Se! .             open from root directory
i                  toggle to get preferred style
r                  reverse order
s                  list by name, time or size
d                  creates a new directory
%                  creates and opens a new file
D                  deletes a directory or file
R                  renames a file
o                  opens the file in a horizontal split
v                  opens the file in a vertical split
P                  opens in the file in the adjacent window
```


### Searching

```bash
*/filepat          files in current directory which satisfy filepat
**/filepat         files in current directory or below which satisfy...
*//pattern         files in the current directory which contain the pattern
**//pattern        files in the current directory or below which contain...
```


## Configuiration


### Appearance

```bash
:color slate       change theme to slate
:set tw=80         set width of terminal screen
gq                 wrap text to tw
gqG                wrap text to tw to document base
gp}                wrap text to tw to paragraph end
```


### .vimrc Options

```bash
:set
 - colorcolumn=80  add a guide line for width
 - colorcolumn&    revert to default setting
 - ruler           show positional coordinates on status bar
 - laststatus=2    add status bar
 - number          add numbers to the side
 - hlsearch        highlight all search results
   - :noh          will unhighlight text
```


## Help


### Help

```bash
:help w            help with w command
```


### Prepends

```bash
(nothing)          Normal mode command                     :help x
v_                 Visual mode command                     :help v_u
i_                 Insert mode command                     :help i_<Esc>
:                  Command-line command                    :help :quit
c_                 Command-line editing                    :help c_<Del>
:                  Command-line command                    :help :quit
c_                 Command-line editing                    :help c_<Del>
-                  Vim command argument                    :help -r
''                 .vimrc style options                    :help 'textwidth'
:h c_CTRL-D        list all command line options
:h insert-index    index of all insert commands
:h user-manual     vim user-manual index
```
