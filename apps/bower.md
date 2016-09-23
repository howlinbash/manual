


[The Howlin Developer Guide](../home.md)



# Bower



## Quick Start

```bash
# Install
npm install -g bower

# Goto project folder, add jquery (for example)
bower install jquery

# Check if the installation worked
bower list

# Get path for index.html
bower list --path

# Uninstall
bower uninstall jquery

# Install old version
bower install jquery#1.9.1

# We dont want dependencies to ship with the git repo, so we build json file 
# (say yes to all defaults).
bower init 
```

A bower.json package is created.  
add the newly created bower_components dir to your gitignore file.

If someone downloads your git repo they then install bower dependencies with

```bash
bower install
```
