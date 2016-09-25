


[The Howlin Developer Guide](../home.md)



# Unix

 * search
 * network
 * find
 * filesharing
 * basics
 * filesystem

# basics

Linux		
		
//Navigate	
pwd
whoami	
ls -altr	
cd
cd ..	
cd 	
cd /	
		
rm	
srm	
mv	
mv olddir /newpath/newdirname
cp	
scp
touch	
mkdir	
open	
open -a "iTunes"
kill
cal	calendae
df -ah	file system size



# 4 
type
which 
whereis         find a commands location:
whatis*
*not all nix's

help
info
man
alias
| less

## alias

```bash
# Does command already exist?
type ll
# If not append the alias to the .bash_aliases file
echo "alias ll='ls -l'" >> .bash_aliases
```

cat > newdoc.txt
 - then type what you want in the document carriage returns are fine. 
 - Ctrl-D to exit

```bash
# Chain commands with the semi-colon.
cd /usr/bin;ls;cd;

# Cat a bunch of files together
cat ./* >> newfile.txt


# Make a bunch of file group with a changing suffix.
touch doc_{1..5}.txt
- this prints
doc_1.txt
doc_2.txt
doc_3.txt
doc_4.txt
doc_5.txt

# build a dir for every month of the year...
mkdir {2009..2011}-0{1..9} {2009..2011}-{10..12}

command substitution
ls -l $(which cp)

#history tricks
history | less
 - print the 2133rd command from the history log
$!2133




# chmod.txt


#print numerical chmod value
stat -f "%OLp" <filename>

#give it the numbers you want
chmod 600 <filename>

 1445  find . -type f -exec chmod 644 {} \;
 1438  find . -type d -exec chmod 755 {} \;


# find.txt


turn command line spreadsheet into a file directory manual like so\

grep -n "#......;" directory/file.css 
	8:	color: #606060;
	30:	color: #f4473a;
	34:	color: #f4473a;
	83:	background: #3a4755;

grep "#......;" directory/file.css | sed -e 's/.*\(\#.\{6\}\).*/\1/' 
	#606060
	#f4473a
	#f4473a
	#3a4755

grep "#......;" directory/file.css | sed -e 's/.*\(\#.\{6\}\).*/\1/' | sort | uniq
	#3a4755
	#606060
	#f4473a

grep -nr "selected_choice" ./
	Binary file .//.process.php.swp matches
	.//process.php:12:	  $selected_choice = $_POST['choice'];
	.//process.php:37://7	  if($correct_choice == $selected_choice){

find / -name 'QUERY'
locate

search history
history | grep 'diff' > Desktop/jotter/tmp/diff.txt 



# ftp.txt



ftp user@server
ls
cd
put filename



# ip.txt



#get ip address
ipconfig getifaddr en1

#ips
64 - cmd
66 - willie
70 - muddy
77 - berry




# network.txt




get ip address
ipconfig getifaddr en1

//List Open Ports
lsof -i -P | grep -i "listen"




# rsync.txt



#create target directory
drjones~$ mkdir test

#cd into the directory you wish to sync (eg profjones:~/test/).
rsync -av . drjones@muddy.local:~/test


# ssh.txt



ssh config

rsa key

#authorized_keys


#known_hosts
~/.ssh/
a server i've connected to before

willie 66
muddy 70
raspberry 77

service ssh restart

==process==
server sends public key to client

:set 
https://confluence.atlassian.com/bitbucket/configure-multiple-ssh-identities-for-gitbash-mac-osx-linux-271943168.html

 ssh-add .ssh/id_rsa_pp
 ssh-add -l


# tips.txt


BASH
ctrl-r              search your command history as you type
!!                  use last typed command. Great if you forget sudo.
- Aggregate history of all terminals in the same .history. On your .bashrc:
      shopt -s histappend
      export HISTSIZE=100000
      export HISTFILESIZE=100000
      export HISTCONTROL=ignoredups:erasedups
      export PROMPT_COMMAND="history -a;history -c;history -r;$PROMPT_COMMAND"
- Pressed 'Ctrl-s' by accident and the terminal is frozen? Unfreeze: 'Ctrl-Q'



unix.txt


I have marked with a * those which I think are absolutely essential
Items for each section are sorted by oldest to newest. Come back soon for more!

BASH
* In bash, 'ctrl-r' searches your command history as you type
- Input from the commandline as if it were a file by replacing 
  'command < file.in' with 'command <<< "some input text"'
- '^' is a sed-like operator to replace chars from last command 
  'ls docs; ^docs^web^' is equal to 'ls web'. The second argument can be empty.
* '!!' expands to the last typed command. Useful for root commands: 
  'cat /etc/...' [permission denied] 'sudo !!'
* '!!:n' selects the nth argument of the last command, and '!$' the last arg
  'ls file1 file2 file3; cat !!:1-2' shows all files and cats only 1 and 2
- 'ESC-.' fetches the last parameter of the previous command
* Related, include 'shopt -s histverify histreedit' on your .bashrc to
  double-check all expansions before submitting a command
- More in-line substitutions: http://tiny.cc/ecv0cw http://tiny.cc/8zbltw
- 'nohup ./long_script &' to leave stuff in background even if you logout
- 'cd -' change to the previous directory you were working on
- 'ctrl-x ctrl-e' opens an editor to work with long or complex command lines
* Use traps for cleaning up bash scripts on exit http://tiny.cc/traps
* 'shopt -s cdspell' automatically fixes your 'cd folder' spelling mistakes
* Add 'set editing-mode vi' in your ~/.inputrc to use the vi keybindings 
  for bash and all readline-enabled applications (python, mysql, etc)
- Aggregate history of all terminals in the same .history. On your .bashrc:
      shopt -s histappend
      export HISTSIZE=100000
      export HISTFILESIZE=100000
      export HISTCONTROL=ignoredups:erasedups
      export PROMPT_COMMAND="history -a;history -c;history -r;$PROMPT_COMMAND"
- Pressed 'Ctrl-s' by accident and the terminal is frozen? Unfreeze: 'Ctrl-Q'



PSEUDO ALIASES FOR COMMONLY USED LONG COMMANDS
- function lt() { ls -ltrsa "$@" | tail; }
- function psgrep() { ps axuf | grep -v grep | grep "$@" -i --color=auto; }
- function fname() { find . -iname "*$@*"; }
- function remove_lines_from() { grep -F -x -v -f $2 $1; }
  removes lines from $1 if they appear in $2
- alias pp="ps axuf | pager"
- alias sum="xargs | tr ' ' '+' | bc" ## Usage: echo 1 2 3 | sum
- function mcd() { mkdir $1 && cd $1; }


VIM
- ':set spell' activates vim spellchecker. Use ']s' and '[s' to move between
  mistakes, 'zg' adds to the dictionary, 'z=' suggests correctly spelled words
- check my .vimrc http://tiny.cc/qxzktw and here http://tiny.cc/kzzktw for more


TOOLS
* 'htop' instead of 'top'
- 'ranger' is a nice console file manager for vi fans
- Use 'apt-file' to see which package provides that file you're missing
- 'dict' is a commandline dictionary
- Learn to use 'find' and 'locate' to look for files
- Compile your own version of 'screen' from the git sources. Most versions
  have a slow scrolling on a vertical split or even no vertical split at all.
  Alternatively, use 'tmux', though it is not as ubiquitous as 'screen'.
* 'trash-cli' sends files to the trash instead of deleting them forever. 
  Be very careful with 'rm' or maybe make a wrapper to avoid deleting '*' by
  accident (e.g. you want to type 'rm tmp*' but type 'rm tmp *')
- 'file' gives information about a file, as image dimensions or text encoding
- 'sort -u' to check for duplicate lines
- 'echo start_backup.sh | at midnight' starts a command at the specified time
- Pipe any command over 'column -t' to nicely align the columns
* Google 'magic sysrq' to bring a Linux machine back from the dead
- 'diff --side-by-side fileA.txt fileB.txt | pager' to see a nice diff
* 'j.py' http://tiny.cc/62qjow remembers your most used folders and is an 
  incredible substitute to browse directories by name instead of 'cd' 
- 'dropbox_uploader.sh' http://tiny.cc/o2qjow is a fantastic solution to 
  upload by commandline via Dropbox's API if you can't use the official client
- learn to use 'pushd' to save time navigating folders (j.py is better though)
- if you liked the 'psgrep' alias, check 'pgrep' as it is far more powerful
* never run 'chmod o+x * -R', capitalize the X to avoid executable files. If
  you want _only_ executable folders: 'find . -type d -exec chmod g+x {} \;'
- 'xargs' gets its input from a pipe and runs some command for each argument
* run jobs in parallel easily: 'ls *.png | parallel -j4 convert {} {.}.jpg'
- grep has a '-c' switch that counts occurences. Don't pipe grep to 'wc -l'.
- 'man hier' explains the filesystem folders for new users
- 'tree' instead of 'ls -R'
* Recover corrupt zip files: First, make copies and **ALWAYS WORK ON A COPY**
    First: 'zip -F  corrupt_copy1.zip --out recover1.zip'
    Then:  'zip -FF corrupt_copy2.zip --out recover2.zip'
    Last:  'ditto -x -k corrupt_copy3.zip --out out_folder/'
  Merge the contents of the two recovered zipfiles and the out_folder. You
  will be able to recover most of the data.
* Use GNU datamash for basic numerical, textual and statistical operations
  on text files: 'seq 10 | datamash sum 1 mean 1'


NETWORKING
- Don't know where to start? SMB is usually better than NFS for newbies.
  If really you know what you are doing, then NFS is the way to go.
* If you use 'sshfs_mount' and suffer from disconnects, use 
  '-o reconnect,workaround=truncate:rename'
- 'python -m SimpleHTTPServer 8080' or 'python3 -mhttp.server localhost 8080'
  shares all the files in the current folder over HTTP. 
* 'ssh -R 12345:localhost:22 -N server.com' forwards server.com's port 12345 
  to your local ssh port, even if you machine is behind a firewall/NAT.
  'ssh localhost -p 12345' from server.com will get you in your machine. 
* Read on 'ssh-agent' to strenghten your ssh connections using private keys, 
  while avoiding typing passwords every time you ssh.
- 'socat TCP4-LISTEN:1234,fork TCP4:192.168.1.1:22' forwards your port
  1234 to another machine's port 22. Very useful for quick NAT redirection.
- Some tools to monitor network connections and bandwith:
  'lsof -i' monitors network connections in real time
  'iftop' shows bandwith usage per *connection*
  'nethogs' shows the bandwith usage per *process*
* Use this trick on .ssh/config to directly access 'host2' which is on a private 
  network, and must be accessed by ssh-ing into 'host1' first
  Host host2
      ProxyCommand ssh -T host1 'nc %h %p'
  	  HostName host2
* Pipe a compressed file over ssh to avoid creating large temporary .tgz files
  'tar cz folder/ | ssh server "tar xz"' or even better, use 'rsync'
* ssmtp can use a Gmail account as SMTP and send emails from the command line.
  'echo "Hello, User!" | mail user@domain.com' ## Thanks to Adam Ziaja.
  Configure your /etc/ssmtp/ssmtp.conf:
      root=***E-MAIL***
      mailhub=smtp.gmail.com:587
      rewriteDomain=
      hostname=smtp.gmail.com:587
      UseSTARTTLS=YES
      UseTLS=YES
      AuthUser=***E-MAIL***
      AuthPass=***PASSWORD***
      AuthMethod=LOGIN
      FromLineOverride=YES

                                     -~-

(CC) by-nc, Carlos Fenollosa <carlos.fenollosa@gmail.com>
Retrieved from http://cfenollosa.com/misc/tricks.txt
Last modified: Fri Jul 11 10:07:34 CEST 2014


## Filesystem

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
|```-/Library```|**Root**: These are similar to DLLs in Windows.
|```-/Volumes```|**Root**: 

lost+found
run
