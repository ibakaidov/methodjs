const fs = require('fs');
const PATH = require('path');

class Methodjs {
    static getInstance() {
        if (Methodjs.instance == null) Methodjs.instance = new Methodjs();
        return Methodjs.instance;
    }


    constructor() {
        this.tree = {};
        this.eco = {};
        this.class = Methodjs;
    }
    register(objectName, options, method) {
        if (this.tree[objectName] == null) {
            this.registerObject(objectName);
        }
        options.name = method.name;
        options.objectName = objectName;
        method.options = options;

        this.tree[objectName][options.name] = method;
    }
    registerRead(objectName, options, method) {
        options.type = 'get';
        this.register(objectName, options, method);

    }
    registeWrite(objectName, options, method) {
        options.type = 'post';
        this.register(object, options, method);
    }

    registerObject(objectName) {
        this.tree[objectName] = {};
    }

    express(app) {
        for (let objectName in this.tree) {
            if (this.tree.hasOwnProperty(objectName)) {
                let object = this.tree[objectName];
                for (let methodName in object) {
                    if (object.hasOwnProperty(methodName)) {
                        let method = object[methodName];
                        app[method.options.type]('/' + objectName + '/' + methodName, (req, res, next) => {
                            method({ req, res }).then((result) => {
                                res.send(result);
                            }).catch(next);
                        })
                    }
                }
            }
        }
    }

    loadTreeFromDir(path) {
        let allObjectDirs = fs.readdirSync(path).map((dirPath) => { return PATH.join(path, dirPath); });
        allObjectDirs.forEach((objectDirPath) => {
            let allFilesPath = fs.readdirSync(objectDirPath).map((filePath) => { return PATH.join(object, filePath) })
            allFilesPath.forEach((filePath)=>{require(filePath)})
        });

    }
}

module.exports = Methodjs;