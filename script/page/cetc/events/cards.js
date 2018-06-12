const theme = require('../../theme');
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


function printEventsCard(events) {
    return events.map(event => `
        <div style="width: 350px">
        <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="margin: 1em">
            <div  class="card-body">
                
                <h5 class="card-title">${event.name || ''}</h5>
                <h6 class="card-subtitle" style="font-size: 0.8em">${formatDateTime(new Date(event.from))} ${formatDateTime(new Date(event.until))}</h6>
                <p class="card-text">
                    <div>${event.description}</div>
                    <div>${event.address}</div>
                </p>
                <!--
                <div style="position: relative">
                    <div style="right: 0px;top: -3em;position: absolute">
                        <a href="/svc/exports.vcard?id=${event._id}">
                            <i class="far fa-id-card" style="font-size:2em;"></i>
                        </a>
                    </div>
                </div>
                -->
            </div>
        </div>
        </div>
    `).join('');
}

module.exports = async (req) => {
    let events = await fetch('/res/cetc_events');
    events = events.docs;
    return theme(req,`
        <style>
            .events-list-table th , td {
                padding: 0.3em;
                
            }
            .events-list-table th  {
                text-align: left;
            }
            
            .events-list-table thead {
                border-bottom: 1px solid #000000;
            }
            
            .events-list-table tr {
                border-bottom: 1px solid #cccccc;
            }
            
            .events-list-table {
                width: 100%;
                
            }
            .events-list-table tr.selected{
                background: #eeeeee;
            }
        </style>
        <div style="display: flex">
            <div>
            <input type="text" name="search-events" class="form-control" style="margin-top: 1em;width: 200px;" placeholder="Search">
            </div>
            <span style="width: 100%"></span>
            <h1 style="font-size: 1.2em;font-style: italic;text-align:right;padding-top:1em;width: 300px">Events Card</h1>
        </div>
        <div class="events-list-card-container" style="display: flex;flex-wrap: wrap;margin-left:-1em; width: calc(100% + 2em);">
            ${printEventsCard(events)}
        </div>
        <script>
            (function(exports){
                exports.app = exports.app || {};
                var app = exports.app;
                 
                document.querySelector('[name="search-events"]').addEventListener('keyup',App.utils.debounce(searchEvents,500));
                var cardsContainer = document.querySelector('.events-list-card-container');
                
                
                function printEventsCard(events){
                    return events.map(function(event){
                        return '<div style="width: 320px">'+
                                '<div class="card shadow-sm p-3 mb-5 bg-white rounded" style="margin: 1em">'+
                                '    <div  class="card-body">'+
                                '        <h5 class="card-title">'+(event.name || "")+'</h5>'+
                                '        <h6 class="card-subtitle">'+event.from +' '+event.until+'</h6>'+
                                '        <p class="card-text">'+
                                '            '+event.address+
                                '        </p>'+
                                '    </div>'+
                                '</div>'+
                                '</div>'
                    }).join('');
                }
                
                function searchEvents(event) {
                    var query = event.target.value;
                    if(query.length > 0){
                        App.net.fetch('/res/cetc_events?name='+query+'&address='+query+'&from='+query+'&until='+query,{},'GET',true)
                        .then(function(result){
                            cardsContainer.innerHTML = printEventsCard(result.docs);
                        });
                    }else{
                        App.net.fetch('/res/cetc_events',null,'GET',true)
                        .then(function(result){
                            cardsContainer.innerHTML = printEventsCard(result.docs);
                        });
                    }
                    
                }
                
            })(window)
            
        </script>
    `)
}