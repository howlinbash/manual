


[The Howlin Developer Guide](../home.md)



# Yeoman

Install
```bash
npm install -g yo
npm install -g generator
```

Start new project. move to project directory
```bash
yo
```

make sure live reload is setup

Start server
```bash
grunt serve
```

If you get weird error fix with this.
```bash
npm install grunt-autoprefixer --save-dev
```

Stop server
```bash
C-c
```

Build site for web (website gets minified and dumped into dist folder)
```bash
grunt build
```
