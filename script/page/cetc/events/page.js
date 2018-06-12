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
         .hidden{
            display: none;
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
    
    <div style="display: flex;align-items: center;margin-top:1em;margin-bottom: 1em;">
        <div style="color: #333333;white-space: nowrap" class="add-event-button" onclick="App.pubsub.publish('cetc.events.page:form')">
            <i class="fas fa-plus-circle" style="font-size: 1.5em"></i><span style="margin-left: 0.3em">Add Event</span>
        </div>
        <h1 style="font-size: 1.2em;font-style: italic;text-align:right;width: 100%;margin:0px">Events Management</h1>
    </div>
    <div style="display: flex;flex-wrap:wrap">
        <div class="event-list-left">
        ${req.print(list(req))}
        </div>
        <div class="event-list-right hidden">
        ${req.print(form(req))}
        </div>
    </div>
     <script>
    
        (function(exports){
            exports.app = exports.app || {};
            var app = exports.app;
            
            var eventList = document.querySelector('.event-list-left');
            var eventForm = document.querySelector('.event-list-right');
            var addEventButton = document.querySelector('.add-event-button');
            
            App.pubsub.subscribe('cetc.events.page:list',function(){
                eventList.classList.remove('hidden');
                addEventButton.classList.remove('hidden');
                eventForm.classList.add('hidden');
            });
            
            App.pubsub.subscribe('cetc.events.page:form',function(){
                eventList.classList.add('hidden');
                addEventButton.classList.add('hidden');
                eventForm.classList.remove('hidden');
            });
            
            
        })(window);
    </script>
    `);
};