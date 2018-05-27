const theme = require("./theme");
module.exports = (req,res) => {
    res.end(
    theme(`
    <h1>
    Access Denied
    </h1>
    `));
}