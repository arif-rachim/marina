const theme = require('../../theme');
const {fetch} = require('../../../../config');

function printContactsCard(contacts) {
    return contacts.map(contact => `
        <div style="width: 320px">
        <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="margin: 1em">
            <div  class="card-body">
                
                <h5 class="card-title">${contact.name || ''}</h5>
                <h6 class="card-subtitle">${contact.company || ''}</h6>
                
                <p class="card-text">
                    <div>${contact.jobTitle || ''}</div>
                    <div>${contact.email || ''}</div>
                    <div>${contact.phone || ''}</div>
                </p>
                <div style="position: relative">
                    <div style="right: 0px;top: -3em;position: absolute">
                        <a href="/svc/exports.vcard?id=${contact._id}">
                            <i class="far fa-id-card" style="font-size:2em;"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `).join('');
}

module.exports = async (req) => {
    let contacts = await fetch('/res/cetc_contacts');
    contacts = contacts.docs;
    return theme(req,`
        <style>
            .contact-list-table th , td {
                padding: 0.3em;
                
            }
            .contact-list-table th  {
                text-align: left;
            }
            
            .contact-list-table thead {
                border-bottom: 1px solid #000000;
            }
            
            .contact-list-table tr {
                border-bottom: 1px solid #cccccc;
            }
            
            .contact-list-table {
                width: 100%;
                
            }
            .contact-list-table tr.selected{
                background: #eeeeee;
            }
        </style>
        <div style="display: flex">
            <div>
            <input type="text" name="search-contact" class="form-control" style="margin-top: 1em;width: 200px;" placeholder="Search">
            </div>
            <span style="width: 100%"></span>
            <h1 style="font-size: 1.2em;font-style: italic;text-align:right;padding-top:1em;width: 300px">Contacts Card</h1>
        </div>
        <div class="contact-list-card-container" style="display: flex;flex-wrap: wrap;margin-left:-1em; width: calc(100% + 2em);">
            ${printContactsCard(contacts)}
        </div>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                 
                document.querySelector('[name="search-contact"]').addEventListener('keyup',debounce(searchContacts,500));
                var cardsContainer = document.querySelector('.contact-list-card-container');
                
                
                function printContactsCard(contacts){
                    return contacts.map(function(contact){
                        return '<div style="width: 320px">'+
                                '<div class="card shadow-sm p-3 mb-5 bg-white rounded" style="margin: 1em">'+
                                '    <div  class="card-body">'+
                                '        <h5 class="card-title">'+(contact.name || "")+'</h5>'+
                                '        <h6 class="card-subtitle">'+(contact.company || "")+'</h6>'+
                                '        <p class="card-text">'+
                                '            <div>'+(contact.jobTitle || "")+'</div>'+
                                '            <div>'+(contact.email || "")+'</div>'+
                                '            <div>'+(contact.phone || "")+'</div>'+
                                '            <td style="text-align: center">'+
                                '                <a href="/svc/exports.vcard?id='+(contact._id)+'">'+
                                '                    <i class="far fa-id-card" ></i>'+
                                '                </a>'+
                                '            </td>'+
                                '        </p>'+
                                '    </div>'+
                                '</div>'+
                                '</div>'
                    }).join('');
                }
                
                function debounce(func, wait, immediate) {
                    var timeout;
                    return function() {
                        var context = this, args = arguments;
                        var later = function() {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                };
                
                function searchContacts(event) {
                    var query = event.target.value;
                    if(query.length > 0){
                        App.net.fetch('/res/cetc_contacts?name='+query+'&company='+query+'&email='+query,{},'GET',true)
                        .then(function(result){
                            cardsContainer.innerHTML = printContactsCard(result.docs);
                        });
                    }else{
                        App.net.fetch('/res/cetc_contacts',null,'GET',true)
                        .then(function(result){
                            cardsContainer.innerHTML = printContactsCard(result.docs);
                        });
                    }
                    
                }
                
            })(window)
            
        </script>
    `)
}