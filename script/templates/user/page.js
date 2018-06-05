const theme = require('../theme');
const form = require('./form');
const list = require('./list');

module.exports = async (req) => {
    return theme(req,`
    <style>
        .user-list-right{
            width: 35%;
            padding-left:0.5em;
            box-sizing: border-box;
        }
        .user-list-left {
            box-sizing: border-box;
            width: 65%;
            padding-right:0.5em;
            margin-bottom: 1.5em;
         }
         @media screen and (max-width:900px){
            .user-list-right {
                width : 100%;
                padding:0em;
            }
            .user-list-left {
                width : 100%;
                padding:0em;
            }
         }
    </style>
    <h1 style="font-size: 1.2em;font-style: italic;text-align:right;padding-top:1em;">Users Management</h1>
    <div style="display: flex;flex-wrap:wrap">
        <div class="user-list-left">
        ${req.print(list(req))}
        </div>
        <div class="user-list-right">
        ${req.print(form(req))}
        </div>
    </div>
    `);
};