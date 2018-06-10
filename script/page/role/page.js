const theme = require('../theme');
const form = require('./form');
const list = require('./list');

module.exports = async (req) => {
    return theme(req,`
    <style>
        .role-list-right{
            width: 30%;
            padding-left:0.5em;
            box-sizing: border-box;
        }
        .role-list-left {
            box-sizing: border-box;
            width: 70%;
            padding-right:0.5em;
            margin-bottom: 1.5em;
         }
         @media screen and (max-width:900px){
            .role-list-right {
                width : 100%;
                padding:0em;
            }
            .role-list-left {
                width : 100%;
                padding:0em;
            }
         }
    </style>
    <h1 style="font-size: 1.2em;font-style: italic;text-align:right;padding-top:1em;">Roles Management</h1>
    <div style="display: flex;flex-wrap:wrap">
        <div class="role-list-left">
        ${req.print(list(req))}
        </div>
        <div class="role-list-right">
        ${req.print(form(req))}
        </div>
    </div>
    `);
};