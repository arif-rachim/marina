const Vertical = require('../../page/form/comp/vertical-render');
const Horizontal = require('../../page/form/comp/horizontal-render');
const Button = require('../../page/form/comp/button-render');
const SingleLineText = require('../../page/form/comp/single-line-text-render');
const {fetch} = require('../../../config');
const html = require('../html');


const componentMap = {
    'page.form.comp.button' : Button,
    'page.form.comp.vertical' : Vertical,
    'page.form.comp.horizontal' : Horizontal,
    'page.form.comp.single-line-text' : SingleLineText,
    'form' : {render: (attribute,data) => {
            return printComponent(attribute,data);
        }}
};


const printComponents = (models,data=null) => {
    return models.map(model => {
        return printComponent(model,data);
    }).join('');

};
const printComponent = (model,data=null) => {
    const component = componentMap[model.type];
    if(model.children){
        return component.render({slot:printComponents(model.children,data),hasDropDown:false},data);
    }
    if(model.attribute){
        return component.render(model.attribute,data);
    }
};

module.exports = async (req) => {
    const resource = req.params.resource;
    const id = req.params.id;
    let data = {
        _resource: {name: resource, id: ''}
    };

    if (id) {
        data = await fetch(`/res/${resource}/${id}`);
        data._resource = {name: resource, id};
    }

    const result = await fetch(`/res/system_forms?name=|${resource}|`);
    const model = result.docs[0];
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
        >
            ${printComponent(model, data)}
        </form>
    </div>
    
`);
};