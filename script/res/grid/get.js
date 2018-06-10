const {fetch} = require('../../../config');
const html = require('../html');
module.exports = async (req,res) => {
    const resource = req.params.resource;
    let cols = req.query.cols || '';
    cols = cols.split(',').filter(col => col !== null && col.length>0).map(col => col.trim());

    let resources = await fetch(`/res/${resource}?$l=1000000`);
    resources = resources.docs;
    let schema = await fetch(`/res/${resource}?intent=schema`);
    schema = schema.filter(schema => {
        if(cols.length > 0){
            return cols.indexOf(schema.name) >= 0;
        }
        return true;
    });
    res.end(html({title : resource,body : `
    <div style="padding: 1em">
        <table class="table table-hover">
            <thead>
                <tr>
                    ${schema.map(schema => `<th >${schema.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${resources.map(res => {
                    return `
                    <tr>
                        ${schema.map(schema => `<td >${res[schema.name]}</td>`).join('')}
                    </tr>
                    `    
                }).join('')}
            </tbody>
        </table>
    </div>
    `}));
};