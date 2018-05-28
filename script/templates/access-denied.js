const theme = require("./theme");
module.exports = (req) => {
    return theme(`
    <h1>
    Access Denied
    </h1>
    `);
}