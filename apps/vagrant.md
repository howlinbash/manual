[The Howlin Developer Guide](/index.md)



Vagrant
=======


### Quick Start

```bash
# Check installation worked ok
vagrant -v

# cd to file and add the distro
vagrant box add hashicorp/precise32 

# initialise vagrant
vagrant init hashicorp/precise32 
 
# start vagrant
vagrant up

# ssh into VM
vagrant ssh

# exit VM
exit

# stop vagrant
vagrant halt
```


### Setup Developer Vhost Domain

```bash
# Open Vagrant config file
vim VagrantFile

# Uncomment line 27 and change ip string to 55.55.55.5
config.vm.network "private_network", ip: "55.55.55.5"

# Exit vim and reload Vagrant
vagrant reload

# Load IP 55.55.55.5 in browser
it works!

# Append developer domain to local host file.
sudo vim /etc/hosts
55.55.55.5	mysite.dev
```


### Next

Setup Vagrant Machine

```bash
# Start and enter machine
vagrant up
vagrant ssh

# Install nginx (for example)
sudo apt-get update
sudo apt-get install nginx
sudo service nginx start
```
