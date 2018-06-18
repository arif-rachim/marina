const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
// see below for details on the options



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
    console.log(bundle.imports); // an array of external dependencies
    console.log(bundle.exports); // an array of names exported by the entry point
    console.log(bundle.modules); // an array of module objects
    const { code, map } = await bundle.generate({format: 'iife',name});
    return {code,map}
}


module.exports = async (req,res) => {
    const path = req.query.path.split('.').join('/');
    const name = req.query.name;
    const fileName = `script/client/${path}.js`;
    const {code,map} = await build(fileName,name);
    res.end(code);
};