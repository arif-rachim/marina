const {fetch} = require('../../../config');
const card = require('../../page/panels/card');
const html = require('../html');
const columnNameMap = {
    _form_version : 'Version',
    _createdOn : 'Created',
    _id : 'Id',
    _lastUpdatedOn : 'Updated',
};
const ignoredColumn = ['_form_version','_createdOn','_id','_lastUpdatedOn'];

const itemToLabel = (schema,value) => {
    return value || '';
};

const printPagination = (pageInfo,resource) => {
    const pages = [];
    const currentPage = pageInfo.currentPage;
    const startPage = currentPage - 3 < 1 ? 1 : currentPage - 3;
    const endPage = ((startPage + 7) > pageInfo.totalPage) ? pageInfo.totalPage : startPage  + 7;
    for(let i = startPage;i <= endPage;i++){
        const index = (i - 1) * pageInfo.limit;
        pages.push(`<li class="page-item ${i === pageInfo.currentPage ? 'active' : ''}"><a class="page-link " href="/res/${resource}?intent=grid-html&$i=${index}&$l=${pageInfo.limit}">${i}</a></li>`)
    }
    return pages.join('');
};

const content = async (req) => {
    const resource = req.params.resource;
    let cols = req.query.cols || '';
    cols = cols.split(',').filter(col => col !== null && col.length>0).map(col => col.trim());

    const skip = parseInt(req.query.$i) || 0;
    const limit = parseInt(req.query.$l) || 25;
    const response = await fetch(`/res/${resource}?$i=${skip}&$l=${limit}`);
    const resources = response.docs || {};
    const pagingInfo = response.pageInfo || {currentPage:1,totalPage:1,limit:25};


    // lets check if we have model for this
    let schema = [];
    if(resource === 'system_forms'){
        schema = await fetch(`/res/${resource}?intent=schema`);
    }else{
        schema = await fetch(`/res/${resource}?intent=model`);
    }
    schema = schema.filter(schema => {
        if(cols.length > 0){
            return cols.indexOf(schema.name) >= 0;
        }
        return true;
    }).filter(schema => {
        return ignoredColumn.indexOf(schema.name) < 0
    });
    return `
    <div >
        <div style="margin-bottom: 1em">
            <input type="text" class="form-control form-control search" placeholder="Search" style="max-width: 200px">
        </div>
        <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead >
                <tr>
                    ${schema.map(schema => `<th >${schema.name in columnNameMap ? columnNameMap[schema.name] : (schema.label || schema.name)}</th>`).join('')}
                    <th style="width: 50px"></th>
                    <th style="width: 50px"></th>
                </tr>
            </thead>
            <tbody>
                ${resources.map(res => {
                    return `
                    <tr>
                        ${schema.map(schema => `<td >${itemToLabel(schema.name,res[schema.name])}</td>`).join('')}
                        <td style="width: 50px">
                            <a href="/res/${resource}/${res._id}?intent=form-html">Detail</a>
                        </td>
                        <td style="width: 50px">
                            <div style="width: 1em" class="delete" data-id="${res._id}" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"/></svg>
                            </div>
                        </td>
                    </tr>
                    `    
                }).join('')}
            </tbody>
        </table>
        <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center pagination-separate pagination-round">
          <li class="page-item">
            <a class="page-link" href="/res/${resource}?intent=grid-html&$i=0" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          ${printPagination(pagingInfo,resource)}
          <li class="page-item">
            <a class="page-link" href="/res/${resource}?intent=grid-html&$i=${(pagingInfo.totalPage - 1) * pagingInfo.limit}" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
        
        </div>
    </div>
    <script path="${__filename}">
    
        const {publish} = require('../../common/pubsub');
        const {fetch} = require('../../common/net');
        const {debounce} = require('../../common/utils');
        document.querySelector('.search').addEventListener('input',debounce(onKeyup,500));
        
        function populateListeners(){
            document.querySelectorAll('.delete').forEach(function(node){
                node.addEventListener('click',onDelete);
            });    
        }
        
        populateListeners();
        
        function onDelete(event){
            var id = event.currentTarget.getAttribute('data-id');
            publish('app.confirmation',{
                text : 'Are you sure you want to delete ?',
                buttons : ['Yes','No']
            }).then(function(button){
                if(button.innerText === 'Yes' ){
                    fetch('/res/${resource}/'+id,{},'DELETE').then(function(result){
                        publish('app.notification','Resource deleted');
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
            
            fetch('/res/${resource}?intent=${resource === 'system_forms' ? 'schema' : 'model'}').then(function(schema){
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
                    fetch('/res/${resource}?'+queryString).then(function(resources){
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
                        return '<td >'+(res[schema.name] || '')+'</td>';
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
    </script>
    `
};

module.exports = async (req) => {
    const contentHtml = await content(req);
    const resource = req.params.resource;

    const model = await fetch(`/svc/system.resource_model?res=${resource}`);
    const actions = [
        {
            path : `/page/form.design?id=${model._id}`,
            icon : 'la-calendar-check-o',
            title : 'Design'
        },
        {
            path : `/res/${resource}?intent=form-html`,
            icon : 'la-calendar-check-o',
            title : 'New Item'
        }
    ];

    return html(req,`
        ${req.print(card(req,{title:'Grid Form',content : contentHtml}))}
    `,actions);
};