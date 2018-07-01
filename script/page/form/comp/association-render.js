const {guid} = require('../../../common/utils');

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
            value : '',
        },
        dataRenderer : {
            value : `(data) => {
                return data.name
            }`,
        },
        id : {
            value : guid()
        }
    };
    let value = '', resourceName = '', resourceId = '';
    if(data){
        resourceName = data._resource.name;
        resourceId = data._resource.id;
        value = data[model.name.value] || '';
    }

    const inputId = guid();
    return `<div id="${model.id.value}" is="page.form.comp.association" 
                class="form-group"
                ${resourceName ? '' : 'draggable="true"'} 
                style="width: 100%" 
                data-resource-name="${resourceName}" 
                data-resource-id="${resourceId}">
            <label for="${inputId}" style="margin-bottom:0">${model.label.value}</label>
            <input type="text" id="${inputId}" class="form-control" 
                placeholder="${model.placeholder.value}" 
                name="${model.name.value}" 
                ${model.required.value ? 'required="true"' : ''} 
                ${model.unique.value ? 'unique="true"' : ''} 
                ${model.encrypted.value ? 'encrypted="true"' : ''} 
                ${model.adminOnly.value ? 'admin-only="true"':''}
                resource-path="${model.resourcePath.value}"
                value="${value}" style="background-color: #FFE8A8">
            <code style="display: none" data-validator="${inputId}">${model.validator.value}</code>
            <code style="display: none" data-renderer="${inputId}">${model.dataRenderer.value}</code>
            <small>${model.description.value}</small>
        </div>`
};

module.exports = {render};