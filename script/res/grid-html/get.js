const {fetch} = require('../../../config');
const html = require('../html');
module.exports = async (req) => {
    const resource = req.params.resource;
    let cols = req.query.cols || '';
    cols = cols.split(',').filter(col => col !== null && col.length>0).map(col => col.trim());

    let resources = await fetch(`/res/${resource}`);
    resources = resources.docs;
    let schema = await fetch(`/res/${resource}?intent=schema`);
    schema = schema.filter(schema => {
        if(cols.length > 0){
            return cols.indexOf(schema.name) >= 0;
        }
        return true;
    });

    return html(req,`
    <div style="padding: 1em">
        <div style="margin-bottom: 1em">
            <input type="text" class="form-control form-control search" placeholder="Search">
        </div>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    ${schema.map(schema => `<th >${schema.name}</th>`).join('')}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${resources.map(res => {
                    return `
                    <tr>
                        ${schema.map(schema => `<td >${res[schema.name]}</td>`).join('')}
                        <td>
                            <div style="width: 1em" class="delete" data-id="${res._id}" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"/></svg>
                            </div>
                        </td>
                    </tr>
                    `    
                }).join('')}
            </tbody>
        </table>
    </div>
    <script >
        (function(){
            document.querySelector('.search').addEventListener('keyup',App.utils.debounce(onKeyup,500));
            
            function populateListeners(){
                document.querySelectorAll('.delete').forEach(function(node){
                    node.addEventListener('click',onDelete);
                });    
            }
            
            populateListeners();
            
            var pubsub = App.pubsub;
            var net = App.net;
            
            function onDelete(event){
                var id = event.currentTarget.getAttribute('data-id');
                pubsub.publish('app.confirmation',{
                    text : 'Are you sure you want to delete ?',
                    buttons : ['Yes','No']
                }).then(function(button){
                    if(button.innerText === 'Yes' ){
                        net.fetch('/res/${resource}/'+id,{},'DELETE').then(function(result){
                            pubsub.publish('app.notification','Resource deleted');
                            refreshTable();
                        });
                    }
                });    
            }
            
            function onKeyup(event){
                refreshTable(event.target.value);
            }
            
            function refreshTable(search){
                var cols = '${cols.join(',')}'.split(',').filter(function(col){col = col.trim();return col.length > 0});
                
                net.fetch('/res/${resource}?intent=schema').then(function(schema){
                    schema = schema.filter(function(schema){
                        if(cols.length > 0){
                            return cols.indexOf(schema.name) >= 0;
                        }
                        return true;
                    });
                    return Promise.resolve(schema);
                }).then(function(schema){
                    return new Promise(function(resolve){
                        
                        var queryString = '';
                        if(search){
                            queryString = schema.map(function(s){
                                return s.name+'='+search
                            }).join('&');
                        }
                        net.fetch('/res/${resource}?'+queryString).then(function(resources){
                           resolve({
                                resources:resources.docs,
                                schema : schema
                           }); 
                        });
                    });
                }).then(function(results){
                    var resources = results.resources;
                    var schema = results.schema;
                    var template = resources.map(function(res){
                        return '<tr>'+
                        schema.map(function(schema){
                            return '<td >'+res[schema.name]+'</td>';
                        }).join('')+
                        
                        '<td>'+
                        '    <div style="width: 1em" class="delete" data-id="'+res._id+'" >'+
                        '        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"/></svg>'+
                        '    </div>'+
                        '</td>'+
                        
                        '</tr>'
                    }).join('');
                    return template;
                }).then(function(template){
                    document.querySelector('tbody').innerHTML = template;
                    populateListeners();
                });
            }
        })();
    </script>
    `);
};