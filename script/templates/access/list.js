const {fetch} = require('../../../config');

function printAccessTable(accessibility) {
    return accessibility.map(access => `
        <tr data-id="${access._id}">
            <td>${access.name || ''}</td>
            <td>${access.path || ''}</td>
            <td>
                <i class="far fa-trash-alt" data-id="${access._id}" onclick="event.stopPropagation();app.deleteAccess(event);"></i>
            </td>
        </tr>
    `).join('');
}

module.exports = async (req) => {
    let access = await fetch('v1/system_accessibility');
    access = access.docs;
    return `
        <style>
            .access-list-table th , td {
                padding: 0.3em;
                
            }
            .access-list-table th  {
                text-align: left;
            }
            
            .access-list-table thead {
                border-bottom: 1px solid #000000;
            }
            
            .access-list-table tr {
                border-bottom: 1px solid #cccccc;
            }
            
            .access-list-table {
                width: 100%;
                
            }
            .access-list-table tr.selected{
                background: #eeeeee;
            }
        </style>
        <table class="access-list-table" cellspacing="0">
            <thead>
                <tr style="height: 2.2em;">
                    <th>Access Name</th>
                    <th>Access Path</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${printAccessTable(access)}
            </tbody>
        </table>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                
                function onTrClicked(event) {
                    document.querySelectorAll('.access-list-table tr').forEach(function(tr){
                        tr.classList.remove('selected');
                    }); 
                    event.currentTarget.classList.add('selected');
                    app.loadAccessForm(event.currentTarget.getAttribute('data-id'));
                }
                
                function populateListeners(){
                    document.querySelectorAll('.access-list-table tr').forEach(function(tr){
                        tr.addEventListener('click',onTrClicked);
                    });    
                }
                
                function deleteAccess(event){
                    var id = event.target.getAttribute('data-id');
                    app.showConfirmation('Are you sure you want to delete ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes' ){
                            fetch('/v1/system_accessibility/'+id,{
                                method : 'DELETE',
                                credentials : 'same-origin',
                                header : {
                                    'content-type' : 'application-json'
                                }
                            }).then(function(result){
                                return result.json();
                            }).then(function(){
                                app.showNotification('Access deleted.');
                                refreshAccessListTable();
                                app.clearAccessForm();
                            });        
                        }    
                    });
                    
                    
                }
                
                function refreshAccessListTable(){
                    fetch('/v1/system_accessibility').then(function(results){
                        return results.json();
                    }).then(function(result){
                        var accessibilities = result.docs;
                        document.querySelector('.access-list-table tbody').innerHTML = accessibilities.map(function(access){
                            return '<tr data-id="'+access._id+'">' +
                             '<td>'+access.name+'</td>' +
                             '<td>'+access.path+'</td>' +
                             '<td><i class="far fa-trash-alt" data-id="'+access._id+'" onclick="event.stopPropagation();app.deleteAccess(event);"></i></td>' +
                              '</tr>';
                        }).join('');
                        populateListeners();
                    });
                }
                populateListeners();
                exports.app.refreshAccessListTable = refreshAccessListTable;
                exports.app.deleteAccess = deleteAccess;
            })(window)
            
        </script>
    `
}