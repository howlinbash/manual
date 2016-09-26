


[The Howlin Developer Guide](../home.md)



# Unix

 * [Unix Basics](./basics.md)
 * [Bash](./bash.md)
 * [Network](./network.md)
 * [OS X](./osx.md)
 * [Search](./search.md)
 * [System Debugging](./debug.md)



## To Do

* Grab CS50 Notes
* build users and groups
* finish utilities



## Utilities

### Cal

```bash
cal                # display this month
cal -3             # display next three months
cal -y             # display this year
cal -Y             # display next twelve months
cal 2012           # display 2012
```

```bash
column
diff
sort
tree
xargs
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



## Cat, Pipe and Redirection

cat > newdoc.txt
 - then type what you want in the document carriage returns are fine. 
 - Ctrl-D to exit

```bash

# Cat a bunch of files together
cat ./* >> newfile.txt

| less
```



## Users & Groups



## Permissions

```bash
#print numerical chmod value
stat -f "%OLp" <filename>

#give it the numbers you want
chmod 600 <filename>

 1445  find . -type f -exec chmod 644 {} \;
 1438  find . -type d -exec chmod 755 {} \;
```



## Filesystem

For more info on unmentioned dirs check out:  

```man hier```

|Path | Description
|--- | ---
|```/```|**Root**: The root directory, where everything begins.
|```/bin```|**Binaries**: Contains binaries (programs) like ```ls``` and ```cp``` that must be present for the system to boot and run.
|```/boot```|**Boot**: Contains all the files needed for successful booting process.
|```/dev```|**Devices**: This is a special directory that contains device nodes. “Everything is a file” also applies to devices. Here is where the kernel maintains a list of all the devices it understands.
|```/etc```|**Et Cetera**: The etc directory contains all of the system-wide configuration files. It also contains a collection of shell scripts that start each of the system services at boot time. Everything in this directory should be readable text.
|```/home```|**Home**: In normal configurations, each user is given a directory in /home. Ordinary users can write files only in their home directories. This limitation protects the system from errant user activity.
|```/lib```|**Libraries**: Contains shared library files used by the core system programs. Linux distributions may have variants ```/lib32``` and ```/lib64``` for multi-architecture support.
|```/media```|**Media**: On modern Linux systems the /media directory will contain the mount points for removable media such as USB drives, CD-ROMs, etc. that are mounted automatically at insertion.
|```/mnt```|**Mount**: On older Linux systems, the /mnt directory contains mount points for removable devices that have been mounted manually.
|```/opt```|**Optional**: The /opt directory is used to install “optional” software or locally installed software. This is mainly used to hold commercial software products that may be installed on your system.
|```/proc```|**Processes**: ```procfs``` virtual filesystem showing information about processes as files.
|```/root```|**Root Home**: The home directory for the superuser root - that is, the system administrator. This account's home directory is usually on the initial filesystem, and hence not in /home (which may be a mount point for another filesystem) in case specific maintenance needs to be performed, during which other filesystems are not available. Such a case could occur, for example, if a hard disk drive suffers physical failures and cannot be properly mounted.
|```/sbin```|**Root**: This directory contains “system” binaries such as ```init```. These are programs that perform vital system tasks that are generally reserved for the superuser.
|```/srv```|**Server**: Server data (data for services provided by system).
|```/sys```|**System**: In some Linux distributions, contains a sysfs virtual filesystem, containing information related to hardware and the operating system. On BSD systems, commonly a symlink to the kernel sources in ```/usr/src/sys```.
|```/tmp```|**Temporary**: The /tmp directory is intended for storage of temporary, transient files created by various programs. Some configurations cause this directory to be emptied each time the system is rebooted.
|```/usr```|**Universal System Resources**: The ```/usr``` directory tree is likely the largest one on a Linux system. It contains all the programs and support files used by regular users.
|```/usr/bin```|/usr/bin contains the executable programs installed by your Linux distribution. It is not uncommon for this directory to hold thousands of programs.
|```/usr/lib```|The shared libraries for the programs in /usr/bin.
|```/usr/local```|The /usr/local tree is where programs that are not included with your distribution but are intended for system-wide use are installed. Programs compiled from source code are normally installed in /usr/local/bin. On a newly installed Linux system, this tree exists, but it will be empty until the system administrator puts some- thing in it.
|```/usr/sbin```|Contains more system administration programs.
|```/usr/share```|Contains all the shared data used by programs in /usr/bin. This includes things like default configuration files, icons, screen backgrounds, sound files, etc.
|```/user/share/doc```|Most packages installed on the system will include some kind of documentation In /usr/share/doc, we will find documentation files organized by package.
|```/var```|**Variable**: A place for files that may change often - especially in size, for example e-mail sent to users on the system, or process-ID lock files.

### OS X Variations

|Path | Description
|--- | ---
|```-/Users```|**Root**: 
|```-/Library```|**Root**: 
|```-/Volumes```|**Root**: 

### To Add

* lost+found
* run
