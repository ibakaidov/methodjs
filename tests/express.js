const express = require('express');

const methodjs = require('../').getInstance();

const app = express();

methodjs.registerRead('time', {}, function current() {
    return new Promise(function (resolve, reject) {
        resolve({ time: new Date().toLocaleTimeString() });
    })
});

methodjs.registerRead('server', {}, function echo(req) {
    return new Promise(function (resolve, reject) {
        resolve({ name: req.query.name });
    })
});
methodjs.registerRead('server', {}, function error(req) {

    return new Promise(function (resolve, reject) {
        reject(new Error('some cool error'))
    })
});

methodjs.express(app);

app.listen(3000);