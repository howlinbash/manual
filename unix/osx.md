[The Howlin Developer Guide](../home.md)



OS X
====

[Back to Unix](./intro.md)


Open Application
----------------


```bash
open -a "iTunes"
```


Networking
----------


```bash
# Get ip address
ipconfig getifaddr en1

# List Open Ports
lsof -i -P | grep -i "listen"
```
