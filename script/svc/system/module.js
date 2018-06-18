const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');


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


module.exports = async (req,res) => {
    const path = req.query.path.split('.').join('/');
    const name = req.query.name;
    const fileName = `script/${path}.js`;
    const {code,map} = await build(fileName,name);
    res.end(code);
};