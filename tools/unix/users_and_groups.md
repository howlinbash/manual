[The Howlin Developer Guide](/index.md)



Users & Groups
==============

[Back to Unix](./index.md)


## Permissions


```bash
#print numerical chmod value
stat -f "%OLp" <filename>

#give it the numbers you want
chmod 600 <filename>

 1445  find . -type f -exec chmod 644 {} \;
 1438  find . -type d -exec chmod 755 {} \;
```
