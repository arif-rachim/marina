const createTableHeader = (displayRaw,attributes) => {
    if(displayRaw){
        return `<th class="mdl-data-table__cell--non-numeric">Raw Data</th>`
    }
    return attributes.map(attribute => {
        return `
            <th class="mdl-data-table__cell--non-numeric">${attribute.label}</th>
        `;
    }).join('');
}

const createTableRowFromData = (displayRaw,data,attributes) => {
    let row = [];
    row.push(`<td>
    <button class="mdl-button mdl-js-button mdl-button--icon">
      <i class="material-icons">more_vert</i>
    </button>
    </td>`);
    if(displayRaw){
        row.push(`<td>${JSON.stringify(data)}</td>`);
    }else{
        row = attributes.reduce((tags,attr,index,array) => {
            tags.push(`<td>${data[attr.name] ? data[attr.name] : ''}</td>`);
            return tags;
        },row);
    }
    row.push(`<td>
    <button class="mdl-button mdl-js-button mdl-button--icon" data-id="${data._id}" onclick='deleteItem(this.getAttribute("data-id"))'>
      <i class="material-icons">cancel</i>
    </button>
    </td>`);
    return row.join('');
}

const createTableBody = (displayRaw,attributes,datas) => {
    return datas.map((data,index) => {
        return `
        <tr>
            ${createTableRowFromData(displayRaw,data,attributes)}
        </tr>
        `
    }).join('');
}

const composePagination = (pageInfo) => {
    const totalPage = pageInfo.totalPage;
    const currentPage = pageInfo.currentPage;
    const result = [];
    result.push('<ul style="list-style: none;display:flex;padding:0;justify-content:center">');
    for(let page = 1;page <= totalPage; page++){
        result.push(`<li style="list-style: none">
        <!-- Icon button -->
        <button class="mdl-button mdl-js-button mdl-button--icon ${currentPage === page ? 'mdl-button--colored' : 'mdl-button--colored-grey'}">
            ${page}
        </button>
        </li>`);
    }
    result.push('</ul>');
    return result.join('');
}

module.exports = (resource,resourceDesign,datas,displayRaw,pageInfo) => {
    return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Read ${resource}</title>
    
    <link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css" >
    <script src="/node_modules/material-design-lite/material.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
</head>
<body>
    <style>
    .mdl-button--colored-grey{
        color : #CCC;
    }
    </style>
    <div style="margin-top: 1em;text-align: center">
        <div style="display: inline-block;margin: auto;text-align: left;">
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
                <thead>
                    <tr>
                        <th></th>
                        ${createTableHeader(displayRaw,resourceDesign.attributes)}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${createTableBody(displayRaw,resourceDesign.attributes,datas)}
                </tbody>
            </table>
            ${composePagination(pageInfo)}
        </div>
        <script>
            function deleteItem(id){
                var path = '${resource}/'+id;
                fetch(path, {
                  method: 'delete',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({id:id})
                }).then(function(res){return res.json()}).then(function(res){
                    location.reload();
                });
            }
        </script>
    </div>
</body>
</html>
    `
}