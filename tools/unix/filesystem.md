[The Howlin Developer Guide](/index.md)



Filesystem
==========

[Back to Unix](./index.md)


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


## Variations


### MacOS

|Path | Description
|--- | ---
|```-/Users```|**Root**: 
|```-/Library```|**Root**: 
|```-/Volumes```|**Root**: 
