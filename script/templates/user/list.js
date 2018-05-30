const {fetch} = require('../../../config');

function printUserTable(users) {
    return users.map(user => `
        <tr data-id="${user._id}">
            <td>${user.name || ''}</td>
            <td>${user.email || ''}</td>
            <td>${user.phone || ''}</td>
            <td>
                <i class="far fa-trash-alt" data-id="${user._id}" onclick="event.stopPropagation();app.deleteUser(event);"></i>
            </td>
        </tr>
    `).join('');
}

module.exports = async (req) => {
    let users = await fetch('v1/system_users');
    users = users.docs;
    return `
        <style>
            .user-list-table th , td {
                padding: 0.3em;
                
            }
            .user-list-table th  {
                text-align: left;
                font-size: 1.1em;
            }
            
            .user-list-table thead {
                border-bottom: 1px solid #000000;
            }
            
            .user-list-table tr {
                border-bottom: 1px solid #cccccc;
            }
            
            .user-list-table {
                width: 100%;
                font-size: 12px;
                
            }
            .user-list-table tr.selected{
                background: #eeeeee;
            }
        </style>
        <table class="user-list-table" cellspacing="0">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${printUserTable(users)}
            </tbody>
        </table>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                
                function onTrClicked(event) {
                    document.querySelectorAll('.user-list-table tr').forEach(function(tr){
                        tr.classList.remove('selected');
                    }); 
                    event.currentTarget.classList.add('selected');
                    app.loadUserForm(event.currentTarget.getAttribute('data-id'));
                }
                
                function populateListeners(){
                    document.querySelectorAll('.user-list-table tr').forEach(function(tr){
                        tr.addEventListener('click',onTrClicked);
                    });    
                }
                
                function deleteUser(event){
                    var id = event.target.getAttribute('data-id');
                    app.showConfirmation('Are you sure you want to delete ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes' ){
                            fetch('/v1/system_users/'+id,{
                                method : 'DELETE',
                                credentials : 'same-origin',
                                header : {
                                    'content-type' : 'application-json'
                                }
                            }).then(function(result){
                                return result.json();
                            }).then(function(){
                                app.showNotification('User deleted.');
                                refreshUserListTable();
                                app.clearUserForm();
                            });        
                        }    
                    });
                    
                    
                }
                
                function refreshUserListTable(){
                    fetch('/v1/system_users').then(function(results){
                        return results.json();
                    }).then(function(result){
                        var users = result.docs;
                        document.querySelector('.user-list-table tbody').innerHTML = users.map(function(user){
                            return '<tr data-id="'+user._id+'">' +
                             '<td>'+user.name+'</td>' +
                             '<td>'+user.email+'</td>' +
                             '<td>'+user.phone+'</td>' +
                             '<td><i class="far fa-trash-alt" data-id="'+user._id+'" onclick="event.stopPropagation();app.deleteUser(event);"></i></td>' +
                              '</tr>';
                        }).join('');
                        populateListeners();
                    });
                }
                populateListeners();
                exports.app.refreshUserListTable = refreshUserListTable;
                exports.app.deleteUser = deleteUser;
            })(window)
            
        </script>
    `
}