[The Howlin Developer Guide](/index.md)



OS X
====

[Back to Unix](./index.md)


## Open Application


```bash
open -a "iTunes"
```


## Networking


```bash
# Get ip address
ipconfig getifaddr en1

# List Open Ports
lsof -i -P | grep -i "listen"
```
