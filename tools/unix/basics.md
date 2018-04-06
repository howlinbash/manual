[The Howlin Developer Guide](/index.md)



Unix Basics
===========

[Back to Unix](./index.md)


## Navigation


```bash
pwd                # Print working directory (where am I?)
whoami             # Print username
cd                 # Change directory (default same as below)
cd ~               # Change directory to $(whoami) home 
cd ..              # Go back one directory
cd ../..           # Go back two directories (ad infinitum)
cd some/dir        # Move forward to dir inside some
cd /               # Go to root directory
cd -               # Go back to last working directory
```


## Modification


```bash
rm                 # Remove file
rm -rf             # Remove folder and it's contents
srm                # Secure remove file
mv                 # Move (or rename) file or folder
cp                 # Copy file
cp -rv             # Copy folder and it's contents printing each event to screen
touch              # Create a file called (arguments)
mkdir              # Create directory called (arguments)
mkdir -p           # Create nested directory (like/this)
```


## Help 


```bash
type               # Write description of command type
which              # Print command's binary location
whereis            # Print command's binary, source and manual location
whatis             # Display one-line manual page description
help               # View help page for command
info               # View info page for command
man                # View man page for command
file               # Determine file type
```


ls
--


```bash
ls -1              # List dir contents in one column
ls -a              # List hidden dotfiles as well
ls -A              # Above but ignore .. and . files
ls -d .*           # List only hidden dotfiles
ls -l              # List info on files
ls -lh             # Above but make file size human readable
ls -r              # Reverse default sort order of list command
ls -t              # List in date order
```
