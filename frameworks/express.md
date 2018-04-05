[The Howlin Developer Guide](/index.md)



Express.js
==========


### Quick Start

```bash
# install
npm install -g express-generator

# create app
express exp2014 --hogan -c less

# move to directory and install dependencies
cd exp2014
npm install 

# run the app
DEBUG=exp2014:* ./bin/www

# auto reload
npm install -g nodemon
nodemon bin/www

# Debug socket.io
DEBUG=socket.io* node bin/www
```
