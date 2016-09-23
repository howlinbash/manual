


[The Howlin Developer Guide](../home.md)



# Bower

Install
```bash
npm install -g bower
```

Goto project folder, add jquery (for example)
```bash
bower install jquery
```

Check if the installation worked
```bash
bower list
```

Get path for index.html
```bash
bower list --path
```

Uninstall
```bash
bower uninstall jquery
```

Install old version
```bash
bower install jquery#1.9.1
```

We dont want dependencies to ship with the git repo, so we build json file (say yes to all defaults).
```bash
bower init 
```

A bower.json package is created.  
add the newly created bower_components dir to your gitignore file.

If someone downloads your git repo they then install bower dependencies with
```bash
bower install
```
