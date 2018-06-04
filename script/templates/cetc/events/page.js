const theme = require('../../theme');
const form = require('./form');
const list = require('./list');

module.exports = async (req) => {
    return theme(req,`
    <style>
        .event-list-right{
            width: 100%;
            box-sizing: border-box;
        }
        .event-list-left {
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 1.5em;
         }
         @media screen and (max-width:900px){
            .event-list-right {
                width : 100%;
                padding:0em;
            }
            .event-list-left {
                width : 100%;
                padding:0em;
            }
         }
    </style>
    <h1 style="font-size: 1.2em;font-style: italic;text-align:right;padding-top:1em;">Events Management</h1>
    <div style="display: flex;flex-wrap:wrap">
        <div class="event-list-left">
        ${req.print(list(req))}
        </div>
        <div class="event-list-right">
        ${req.print(form(req))}
        </div>
    </div>
    `);
};