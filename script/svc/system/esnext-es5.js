const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const mkdir = require('../../common/mkdir');
const fs = require('fs');
const {guid} = require('../../common/utils');
async function build(filename,name) {
    const inputOptions = {
        input : filename,
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude : 'node_modules/**'
            })
        ]
    };
    const bundle = await rollup.rollup(inputOptions);
    const { code, map } = await bundle.generate({format: 'iife',name});
    return {code,map}
}


module.exports = (req,res) => {
    const script = req.body.script;
    const path = req.body.path.split("/");

    const fileName = path.pop();
    const directory = path.join("/");

    mkdir(directory);
    const tempFileName = `${directory}/${fileName}-${guid()}-tmp.js`;
    fs.writeFile(tempFileName,script.trim(),err => {
        if(err){
            return console.error(err);
        }
        build(tempFileName,'__').then(({code,map}) => {
            const emptyVar = 'var __ = ';
            if(code.indexOf(emptyVar) >= 0){
                code = code.replace(emptyVar,'\n window.addEventListener("load",function(){');
                code = code +'});';
            }else{
                code = '\n window.addEventListener("load",function(){' + code + '});';
            }

            fs.unlinkSync(tempFileName);
            res.end(JSON.stringify({success:true,code}));
        }).catch(err => {
            console.error(err);
            res.end(JSON.stringify({success:false,message:err.message}));
            fs.unlinkSync(tempFileName);
        });
    });
};