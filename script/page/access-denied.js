const theme = require("./theme");
module.exports = (req) => {
    theme(req,{title:'Access Denied',breadcrumb:[],content : `
        <div style="text-align: center">
            <div style="display: inline-block">
            <div style="display: flex;margin:3em;align-items: center;">
                <i class="fas fa-ban" style="font-size: 2em;color:darkred"></i>
                <h1 style="font-size: 1.5em;margin-left:0.5em;color:#333">Access Denied</h1>
            </div>
            </div>
        </div>
    `});
};