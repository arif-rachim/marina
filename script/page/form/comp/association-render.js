const {guid} = require('../../../common/utils');
//const {fetch} = require('../../../../config');
const itemRenderer = require('./association-item-render');
const validatorScript = `(data,form) => {
    return Promise.resolve({success:true});
};`;
const rendererScript = `(data) => {
    return data.name;
};`;
const render = (model,data) => {
    model = model || {
        label:{
            value : 'Label'
        },
        name : {
            value : 'association'
        },
        placeholder : {
            value : 'Placeholder'
        },
        description : {
            value : 'Description'
        },
        required : {
            value : false
        },
        unique : {
            value : false
        },
        resourcePath : {
            value : '',
        },
        encrypted : {
            value : false
        },
        adminOnly : {
            value : false
        },
        validator : {
            value : validatorScript,
        },
        dataRenderer : {
            value : rendererScript,
        },
        id : {
            value : guid()
        }
    };
    let value = '', resourceName = '', resourceId = '', items = [];

    return new Promise(resolve => {
        if(data){
            resourceName = data._resource.name;
            resourceId = data._resource.id;
            value = data[model.name.value] || '';
            // if(value){
            //     fetch(`/res/${model.resourcePath.value}?$ids=${value}`).then(items => {
            //         resolve({value, resourceName, resourceId, items});
            //     });
            //     return;
            // }
        }
        resolve({value,resourceName,resourceId,items});
    }).then(({value,resourceName,resourceId,items}) => {
        const inputId = guid();
        const renderer = Function(`return ${model.dataRenderer.value}`)();
        return `<div id="${model.id.value}" is="page.form.comp.association" 
                class="form-group"
                ${resourceName ? '' : 'draggable="true"'} 
                style="width: 100%" 
                data-resource-name="${resourceName}" 
                data-resource-id="${resourceId}">
            <label for="${inputId}" style="margin-bottom:0">${model.label.value}</label>
            <div style="position: relative;min-height: 2.2em;background-color: #FFE8A8;" class="form-control">
                <input type="text" id="${inputId}" class="form-control" 
                    placeholder="${model.placeholder.value}" 
                    name="${model.name.value}" 
                    ${model.required.value ? 'required="true"' : ''} 
                    ${model.unique.value ? 'unique="true"' : ''} 
                    ${model.encrypted.value ? 'encrypted="true"' : ''} 
                    ${model.adminOnly.value ? 'admin-only="true"':''}
                    resource-path="${model.resourcePath.value}"
                    value="${value}" style="background-color: #FFE8A8;opacity: 0;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">
                <div class="item-container " style="position: relative;top: 0;bottom: 0;left: 0;right: 0;min-height: 1.5em">
                    ${itemRenderer(items,renderer)}
                </div>
            </div>
            <code style="display: none" data-validator="${inputId}">${model.validator.value}</code>
            <code style="display: none" data-renderer="${inputId}">${model.dataRenderer.value}</code>
            <small>${model.description.value}</small>
        </div>`
    });
};

module.exports = {render};