const theme = require('../theme');
module.exports = (req) => {
    return theme(`
    <div>Hello World</div>
    `);
};