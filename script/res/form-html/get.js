const Vertical = require('../../page/form/comp/vertical-render');
const Horizontal = require('../../page/form/comp/horizontal-render');
const Button = require('../../page/form/comp/button-render');
const SingleLineText = require('../../page/form/comp/single-line-text-render');
const Association = require('../../page/form/comp/association-render');
const {fetch} = require('../../../config');
const html = require('../html');


const componentMap = {
    'page.form.comp.button' : Button,
    'page.form.comp.vertical' : Vertical,
    'page.form.comp.horizontal' : Horizontal,
    'page.form.comp.single-line-text' : SingleLineText,
    'page.form.comp.association' : Association,
    'form' : {render: (attribute,data) => {
            return printComponent(attribute,data);
        }}
};


const printComponents = (models,data=null) => {
    return Promise.all(models.map(model => {
        return printComponent(model,data);
    })).then(results => results.join(''));

};
const printComponent = (model,data=null) => {
    try {
        const component = componentMap[model.type];
        if (model.children) {
            return printComponents(model.children, data).then(componentsString => {
                return component.render({slot: componentsString, hasDropDown: false}, data);
            });
        }
        if (model.attribute) {
            return component.render(model.attribute, data);
        }
    }catch(err){
        console.log(err);
    }
    return Promise.resolve('');

};

module.exports = async (req) => {

    const resource = req.params.resource;
    const id = req.params.id;
    let data = {
        _resource: {name: resource, id: ''}
    };
    let formVersion = NaN;
    if (id) {
        data = await fetch(`/res/${resource}/${id}`);
        formVersion = data._form_version;
        data._resource = {name: resource, id};
    }
    let model = null;
    if(!isNaN(formVersion)){
        const result = await fetch(`/res/system_forms?name=|${resource}|&version=|${formVersion}|&$and=1`);
        model = result.docs[0];
    }else{
        const result = await fetch(`/res/system_forms?name=|${resource}|&$s.version=-1`);
        model = result.docs[0];
        formVersion = model.version;
    }
    return html(req, `
    <style>
        .container-panel {
            width: 100%;
            display: flex;
        }
        
        .container-panel .container-panel-item{
            width: 100%;
            min-height: 1em;
        }
        
        .container-panel-item.vertical{
            display: flex;
            flex-direction: column;
        }
        
        .container-panel-item.horizontal{
            display: flex;
        }

        .container-panel-item.horizontal > div{
            margin-right: 0.5em;
            margin-left: 0.5em;
        }
        
        .container-panel-item.horizontal > div:last-child{
            margin-right: 0em !important;
        }
        .container-panel-item.horizontal > div:first-child{
            margin-left: 0em !important;
        }
                    
    </style>
    
    <div style="padding: 1em" >
        <form onsubmit="return false;" 
        is="res.form-html.component.form" 
        data-resource-name="${data._resource.name}"
        data-resource-id="${data._resource.id ? data._resource.id : ''}"
        data-form-version="${formVersion}"
        >
            ${req.print(printComponent(model, data))}
        </form>
    </div>
    
`);
};