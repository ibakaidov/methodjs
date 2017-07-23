# Methodjs

Framework for create server rest API.

## Install

``` bash
    npm install --save methodjs
```

## Using

### Step #0: require and set methodjs to root.

index.js

``` javascript

const methodjs = require('methodjs').getInstance();

methodjs.eco.db = require('./libs/somedb'); //add your db module to ecosystem

methodjs.loadTreeFromDir(__durname+'/methods/'); // load all modules from dir

methodjs.express(app); //register  urls for methods in your express.js app

```

### Step #1: create project structure

``` bash
    mkdir methods # create  dir for method files
    mkdir methods/time # create time object
    touch methods/time/current.js # create file for time.current method
```

### Step #2: register method to methodjs

 methods/time/current.js:

 ```javascript
const methodjs = require('methodjs').getInstance();

const app = express();

methodjs.registerRead('time', {}, function current({req, res}) {
    return new Promise(function (resolve, reject) {
        resolve({ time: new Date().toLocaleTimeString() });
    })
});

 ```
 ### Step #3: call your method

 ``` bash
    curl 127.0.0.1:3000/time/current
 ```