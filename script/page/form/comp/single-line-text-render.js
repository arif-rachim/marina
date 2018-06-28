const {guid} = require('../../../common/utils');

const render = (model,data) => {

    model = model || {
        label:{
            value : 'Label'
        },
        name : {
            value : 'Name'
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
        encrypted : {
            value : false
        },
        adminOnly : {
            value : false
        },
        minChars : {
            value : 0
        },
        maxChars : {
            value : 255
        },
        pattern : {
            value : ''
        },
        validator : {
            value : '',
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
    return `<div id="${model.id.value}" is="page.form.comp.single-line-text" class="form-group" draggable="true" style="width: 100%" data-resource-name="${resourceName}" data-resource-id="${resourceId}">
            <label for="${inputId}" style="margin-bottom:0">${model.label.value}</label>
            <input type="text" id="${inputId}" class="form-control" 
                placeholder="${model.placeholder.value}" 
                name="${model.name.value}" 
                ${model.required.value ? 'required="true"' : ''} 
                ${model.unique.value ? 'unique="true"' : ''} 
                ${model.encrypted.value ? 'encrypted="true"' : ''} 
                ${model.adminOnly.value ? 'admin-only="true"':''} 
                ${model.minChars.value ? 'min-chars="'+model.minChars.value+'"' : ''}
                ${model.maxChars.value ? 'max-chars="'+model.maxChars.value+'"' : ''}
                ${model.pattern.value ? 'pattern="'+model.pattern.value+'"' : ''}
                value="${value}" >
            <code style="display: none" data-validator="${inputId}">${model.validator.value}</code>
            <small>${model.description.value}</small>
        </div>`
};

module.exports = {render};