const RESOURCE_DIR = `${__dirname}/../../../.resources/`;
const fs = require('fs');

class Middleware {

    constructor(){
    }

    save(name,method,version,content){
        if(!this.isDirectoryExist(name)){
            fs.mkdirSync(this.directoryPath(name));
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
        console.log(`Module ${name}/${method}@${version} exist ? ${isModuleExist}`);
        return isModuleExist;
    }

    load(name,method,version){
        if(!this.isExist(name,method,version)){
            console.log(`Module ${name}/${method}@${version} does not exist`);
            return false;
        }
        console.log(`Module ${name}/${method}@${version} does exist !`);
        return require(this.relativePath(name,method,version));
    }

    remove(name,method,version){
        fs.unlinkSync(this.path(name,method,version));
    }
}

module.exports = new Middleware();