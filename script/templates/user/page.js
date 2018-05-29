const theme = require('../theme');
const form = require('./form');
const list = require('./list');

module.exports = async (req) => {
    return theme(req,`
    <style>
        .user-list-right{
            width: 30%;
            padding-left:0.5em;
            box-sizing: border-box;
        }
        .user-list-left {
            box-sizing: border-box;
            width: 70%;
            padding-right:0.5em;
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
    <h1 style="font-size: 1.2em;font-style: italic;padding-left: 0.1em;padding-bottom: 1em;padding-top:1.5em;">Users Management</h1>
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