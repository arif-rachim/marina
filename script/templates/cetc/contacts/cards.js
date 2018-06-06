const theme = require('../../theme');
const {fetch} = require('../../../../config');

function printContactsTable(contacts) {
    return contacts.map(contact => `
        <tr data-id="${contact._id}">
            <td>${contact.name || ''}</td>
            <td>${contact.company || ''}</td>
            <td>${contact.jobTitle || ''}</td>
            <td>${contact.phone || ''}</td>
            <td>${contact.email || ''}</td>
            <td style="text-align: center">
                <a href="/svc/exports.vcard?id=${contact._id}">
                    <i class="far fa-id-card"></i>
                </a>
            </td>
        </tr>
    `).join('');
}

module.exports = async (req) => {
    let contacts = await fetch('v1/cetc_contacts');
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
        <div>
            <input type="text" name="search-contact" class="form-control" style="margin-top: 1em;width: 200px;float: left;" placeholder="Search">
            <h1 style="font-size: 1.2em;font-style: italic;text-align:right;padding-top:1em;float:right">Contacts Card</h1>
        </div>
        <table class="contact-list-table" cellspacing="0">
            <thead>
                <tr style="height: 2.2em;">
                    <th>Name</th>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style="text-align: center">VCard</th>
                </tr>
            </thead>
            <tbody>
                ${printContactsTable(contacts)}
            </tbody>
        </table>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                 
                document.querySelector('[name="search-contact"]').addEventListener('keyup',debounce(searchContacts,500));
                var tableBody = document.querySelector('.contact-list-table tbody');
                
                function printContactsTable(contacts) {
                    return contacts.map(function(contact) {
                        return '<tr data-id="'+contact._id+'">'+
                        '    <td>'+(contact.name || "")+'</td>'+
                        '    <td>'+(contact.company || "")+'</td>'+
                        '    <td>'+(contact.jobTitle || "")+'</td>'+
                        '    <td>'+(contact.phone || "")+'</td>'+
                        '    <td>'+(contact.email || "")+'</td>'+
                        '    <td style="text-align: center">'+
                        '        <a href="/svc/exports.vcard?id='+(contact._id)+'">'+
                        '            <i class="far fa-id-card"></i>'+
                        '        </a>'+
                        '    </td>'+
                        '</tr>'
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
                        app.fetch('/v1/cetc_contacts?name='+query+'&company='+query+'&email='+query,{},'GET',false)
                        .then(function(result){
                            tableBody.innerHTML = printContactsTable(result.docs);
                            populateListeners();
                        });
                    }else{
                        app.fetch('/v1/cetc_contacts',null,'GET',false)
                        .then(function(result){
                            tableBody.innerHTML = printContactsTable(result.docs);
                            populateListeners();
                        });
                    }
                    
                }
                 
                
                function onTrClicked(event) {
                    document.querySelectorAll('.contact-list-table tr').forEach(function(tr){
                        tr.classList.remove('selected');
                    }); 
                    event.currentTarget.classList.add('selected');
                }
                
                function populateListeners(){
                    document.querySelectorAll('.contact-list-table tr').forEach(function(tr){
                        tr.addEventListener('click',onTrClicked);
                    });    
                }
                
                populateListeners();
            })(window)
            
        </script>
    `)
}