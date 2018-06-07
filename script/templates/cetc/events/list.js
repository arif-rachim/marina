const {fetch} = require('../../../../config');

const formatDateTime = (date) => {
    if(date === undefined || date.toString() === 'Invalid Date'){
        return '';
    }
    const monthNames = [
        "JAN", "FEB", "MAR",
        "APR", "MAY", "JUN", "JUL",
        "AUG", "SEP", "OCT",
        "NOV", "DEC"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const applyLeadingZero = (num) => num < 10 ? `0${num}` : num;
    return `${applyLeadingZero(day)}-${monthNames[monthIndex]}-${year} ${applyLeadingZero(hours)}:${applyLeadingZero(minutes)}`;
};

function printEventsTable(events) {
    return events.map(event => `
        <tr data-id="${event._id}">
            <td>${formatDateTime(new Date(event.from)) || ''}</td>
            <td>${event.name || ''}</td>
            <td>
                <i class="far fa-trash-alt" data-id="${event._id}" onclick="event.stopPropagation();app.deleteEvent(event);"></i>
            </td>
        </tr>
    `).join('');
}

module.exports = async (req) => {
    let events = await fetch('v1/cetc_events');
    events = events.docs;
    return `
        <style>
            .event-list-table th , td {
                padding: 0.3em;
                
            }
            .event-list-table th  {
                text-align: left;
            }
            
            .event-list-table thead {
                border-bottom: 1px solid #000000;
            }
            
            .event-list-table tr {
                border-bottom: 1px solid #cccccc;
            }
            
            .event-list-table {
                width: 100%;
                
            }
            .event-list-table tr.selected{
                background: #eeeeee;
            }
        </style>
        <table class="event-list-table" cellspacing="0">
            <col width="150">
            <col width="auto">
            <col width="40">
            <thead>
                <tr style="height: 2.2em;">
                    <th>Schedule</th>
                    <th>Event Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${printEventsTable(events)}
            </tbody>
        </table>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                
                function onTrClicked(event) {
                    document.querySelectorAll('.event-list-table tr').forEach(function(tr){
                        tr.classList.remove('selected');
                    }); 
                    event.currentTarget.classList.add('selected');
                    app.loadEventForm(event.currentTarget.getAttribute('data-id'));
                }
                
                function populateListeners(){
                    document.querySelectorAll('.event-list-table tr').forEach(function(tr){
                        tr.addEventListener('click',onTrClicked);
                    });    
                }
                
                function deleteEvent(event){
                    var id = event.target.getAttribute('data-id');
                    app.showConfirmation('Are you sure you want to delete ?',['Yes','No'],function(button){
                        if(button.innerText === 'Yes' ){
                            fetch('/v1/cetc_events/'+id,{
                                method : 'DELETE',
                                credentials : 'same-origin',
                                header : {
                                    'content-type' : 'application-json'
                                }
                            }).then(function(result){
                                return result.json();
                            }).then(function(){
                                app.showNotification('Event deleted.');
                                refreshEventListTable();
                                app.clearEventForm();
                            });        
                        }    
                    });
                }
                
                function formatDate(date){
                    if(date == null || date === undefined){
                        return '';
                    }
                    date = new Date(date);
                    
                    function formatZero(num){
                        return num < 10 ? '0'+num : ''+num;
                    }    
                
                    var monthNames = [
                        "JAN", "FEB", "MAR",
                        "APR", "MAY", "JUN", "JUL",
                        "AUG", "SEP", "OCT",
                        "NOV", "DEC"
                    ];
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    return formatZero(day)+'-'+monthNames[month]+'-'+year+' '+formatZero(hours)+':'+formatZero(minutes);
                };
                
                function refreshEventListTable(){
                    app.fetch('/v1/cetc_events').then(function(result){
                        var events = result.docs;
                        document.querySelector('.event-list-table tbody').innerHTML = events.map(function(event){
                            return '<tr data-id="'+event._id+'">' +
                             '<td>'+formatDate(event.from) +'</td>' +
                             '<td>'+event.name+'</td>' +
                             '<td><i class="far fa-trash-alt" data-id="'+event._id+'" onclick="event.stopPropagation();app.deleteEvent(event);"></i></td>' +
                              '</tr>';
                        }).join('');
                        populateListeners();
                    });
                }
                populateListeners();
                exports.app.refreshEventListTable = refreshEventListTable;
                exports.app.deleteEvent = deleteEvent;
            })(window)
            
        </script>
    `
}