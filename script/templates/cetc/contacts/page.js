const theme = require('../../theme');
const form = require('./form');
const list = require('./list');

module.exports = async (req) => {
    return theme(req,`
    <style>
        .contact-list-right{
            width: 100%;
            box-sizing: border-box;
        }
        .contact-list-left {
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 1.5em;
         }
         
         .hidden {
            display: none;
         }
         @media screen and (max-width:900px){
            .contact-list-right {
                width : 100%;
                padding:0em;
            }
            .contact-list-left {
                width : 100%;
                padding:0em;
            }
         }
    </style>
    
    <div style="display: flex;align-items: center;margin-top:1em;margin-bottom: 1em;">
        <div style="color: #333333;white-space: nowrap" class="add-contact-button" onclick="PubSub.publish('cetc.contacts.page:form')">
            <i class="fas fa-plus-circle" style="font-size: 1.5em"></i><span style="margin-left: 0.3em">Add Contact</span>
        </div>
        <h1 style="font-size: 1.2em;font-style: italic;text-align:right;width: 100%;margin:0px">Contacts Management</h1>
    </div>
    <div style="display: flex;flex-wrap:wrap">
        <div class="contact-list-left">
        ${req.print(list(req))}
        </div>
        <div class="contact-list-right hidden">
        ${req.print(form(req))}
        </div>
    </div>
    <script>
    
        (function(exports){
            exports.app = exports.app || {};
            var app = exports.app;
            
            var contactList = document.querySelector('.contact-list-left');
            var contactForm = document.querySelector('.contact-list-right');
            var addContactButton = document.querySelector('.add-contact-button');
            
            PubSub.subscribe('cetc.contacts.page:list',function(){
                contactList.classList.remove('hidden');
                addContactButton.classList.remove('hidden');
                contactForm.classList.add('hidden');
            });
            
            PubSub.subscribe('cetc.contacts.page:form',function(){
                contactList.classList.add('hidden');
                addContactButton.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
            
            
        })(window);
    </script>
    `);
};