const {fetch} = require('../../../../config');

function printContactsTable(contacts) {
    return contacts.map(contact => `
        <tr data-id="${contact._id}">
            <td>${contact.name || ''}</td>
            <td>${contact.phone || ''}</td>
            <td><a href="mailto:${contact.email}">${contact.email || ''}</a></td>
            <td>${contact.company || ''}</td>
            <td style="text-align: center" ><a href="/svc/exports.vcard?id=${contact._id}" onclick="event.stopPropagation();"><i class="far fa-id-card"></i></a></td>
            <td>
                <i class="far fa-trash-alt" data-id="${contact._id}" onclick="event.stopPropagation();app.deleteContact(event);"></i>
            </td>
        </tr>
    `).join('');
}

module.exports = async (req) => {
    let contacts = await fetch('/res/cetc_contacts');
    contacts = contacts.docs;
    return `
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
        <table class="contact-list-table" cellspacing="0">
            <thead>
                <tr style="height: 2.2em;">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th style="text-align: center">VCF</th>
                    <th></th>
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
                
                function onTrClicked(event) {
                    document.querySelectorAll('.contact-list-table tr').forEach(function(tr){
                        tr.classList.remove('selected');
                    }); 
                    event.currentTarget.classList.add('selected');
                    app.loadContactForm(event.currentTarget.getAttribute('data-id'));
                }
                
                function populateListeners(){
                    document.querySelectorAll('.contact-list-table tr').forEach(function(tr){
                        tr.addEventListener('click',onTrClicked);
                    });    
                }
                
                function deleteContact(event){
                    var id = event.target.getAttribute('data-id');
                    app.showConfirmation('Are you sure you want to delete ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes' ){
                            App.net.fetch('/res/cetc_contacts/'+id,{},'DELETE').then(function(){
                                app.showNotification('Contact deleted.');
                                refreshContactListTable();
                                app.clearContactForm();
                            });        
                        }    
                    });
                }
                
                function refreshContactListTable(){
                    App.net.fetch('/res/cetc_contacts').then(function(result){
                        var contacts = result.docs;
                        document.querySelector('.contact-list-table tbody').innerHTML = contacts.map(function(contact){
                            return '<tr data-id="'+contact._id+'">' +
                             '<td>'+contact.name+'</td>' +
                             '<td>'+contact.phone+'</td>' +
                             '<td><a href="mailto:'+contact.email+'">'+contact.email+'</a></td>' +
                             '<td>'+contact.company+'</td>' +
                             '<td><i class="far fa-trash-alt" data-id="'+contact._id+'" onclick="event.stopPropagation();app.deleteContact(event);"></i></td>' +
                              '</tr>';
                        }).join('');
                        populateListeners();
                    });
                }
                populateListeners();
                exports.app.refreshContactListTable = refreshContactListTable;
                exports.app.deleteContact = deleteContact;
            })(window)
            
        </script>
    `
}