[The Howlin Developer Guide](/index.md)



Network
=======

[Back to Unix](./intro.md)


## SSH


### Generate new key-pair

```bash
# Create key-pair with custom comment
ssh-keygen -r rsa -b 4096 -C "git-wolf"

# Create unique name for key-pair
/home/howlin/.ssh/id_rsa_git

# Ensure ssh-agent is enabled
eval "$(ssh-agent -s)" # Agent pid 999

# Add to key to ssh-agent
ssh-add ~/.ssh/id_rsa_git

# Add public key to clipboard to add to server
xclip -sel clip < ~/.ssh/id_rsa_git.pub

# Test connection
ssh -T git@gitlab.com
```


### Glossary

```bash
config             # Config file
authorized_keys    # keys that have access to my computer
known_hosts        # a server i've connected to before
```


### Config File

```bash
# Appending an entry to the config file mean you can type
ssh brace

# As opposed to:
ssh paul@192.168.1.231 -i ~/.ssh/id_rsa_brace -p 4242

# Add something like this to ~/.ssh/config
Host brace
  HostName 192.168.1.231
  Port 4242
  User paul
  IdentityFile ~/.ssh/id_rsa_brace
```


## Rsync and filesharing


```bash
# Create target directory
drjones~$ mkdir test

# cd into the directory you wish to sync (eg profjones:~/test/).
rsync -av . drjones@muddy.local:~/test
```

### Alternatives

 * scp
 * ftp
 * sftp


### FTP

```bash
ftp user@server
ls
cd

# Standard HTTP commands like put get etc...
put filename
```


## To Parse


```bash
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
```
