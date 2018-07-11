const RESOURCE_DIR = `${__dirname}/../../../.resources/`;
const fs = require('fs');

class Middleware {

    constructor(){
    }

    save(name,method,version,content){
        if(!this.isDirectoryExist(name)){
            let path = __dirname;
            ['/','../','../','../','.resources/','db/',`${name}/`].forEach(subPath => {
               path = path+ subPath;
               if(!fs.existsSync(path)){
                   fs.mkdirSync(path);
                   console.log('Create path ',path);
               }
            });
        }
        fs.writeFileSync(this.path(name,method,version),content,{encoding:'utf-8'});
    }

    path(name,method,version){
        return `${this.directoryPath(name)}/${method}@${version}.js`;
    }

    directoryPath(name){
        return `${RESOURCE_DIR}/db/${name}`;
    }

    relativePath(name,method,version){
        return `../../../.resources/db/${name}/${method}@${version}`;
    }

    isDirectoryExist(name){
        return fs.existsSync(this.directoryPath(name));
    }

    isExist(name,method,version){
        const isModuleExist = fs.existsSync(this.path(name,method,version));
        return isModuleExist;
    }

    load(name,method,version){
        if(!this.isExist(name,method,version)){
            return false;
        }
        return require(this.relativePath(name,method,version));
    }

    remove(name,method,version){
        fs.unlinkSync(this.path(name,method,version));
    }
}

module.exports = new Middleware();