const database = require('./database.js');

const component = (req,res) =>{
    const resource = req.params.resource;
    database[resource].find('type' in req.query ? {type:req.query.type} : {},(err,docs) => {
        res.end(components(docs));
    });

    function components(docs) {
        function component(data) {
            return Object.getOwnPropertyNames(data).reduce((result,propertyName) => {
                result.push(`<div class="${propertyName}">${data[propertyName]}</div>`);
                return result;
            },[]).join('\n');
        }
        return `
            <div >
                ${docs.map(component)}
            </div>
        `;
    }
};

module.exports = component;