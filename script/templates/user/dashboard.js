const theme = require('../theme');
const menu = require('../index/menu-top');
module.exports = (req) => {
    return theme(`
    ${req.print(menu(req))}
    <div>
        <div>
        <h3>Users List</h3>
        <table>
        
        </table>
        </div>
    </div>
    `);
};