[The Howlin Developer Guide](/index.md)



Users & Groups
==============

[Back to Unix](./index.md)


## Cheatsheet


```bash
# Print numerical chmod value
stat -f "%OLp" <filename>

# Give it the numbers you want
chmod 600 <filename>

# Recursively change file permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```


## Permissions


```bash
PERMISSION      COMMAND
 U   G   W
rwx rwx rwx     chmod 777 filenam
rwx rwx r-x     chmod 775 filename
rwx r-x r-x     chmod 755 filename

rw- rw- r--     chmod 664 filename
rw- r-- r--     chmod 644 filename

U = User
G = Group
W = World

r = Readable
w = writable
x = executable
- = no permission
```

Another way of looking at it:
```bash
400     read by owner
040     read by group
004     read by anybody (other)
200     write by owner
020     write by group
002     write by anybody
100     execute by owner
010     execute by group
001     execute by anybody
```

To get a combination, just add them up.
For example:
to get read, write, execute by owner,
read, execute, by group,
and execute by anybody...

add 400+200+100+040+010+001 to give 751.
