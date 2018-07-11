const {guid} = require('../../../common/utils');
const validatorScript = `(data,form) => {
    return Promise.resolve({success:true});
};`;
const render = (model,data) => {

    model = model || {
        label:{
            value : 'Number Label'
        },
        name : {
            value : 'name'
        },
        placeholder : {
            value : 'Enter number selection'
        },
        description : {
            value : 'Number description'
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
        minValue : {
            value : 0
        },
        maxValue : {
            value : 1000000000000
        },
        step : {
            value : 0.01
        },
        pattern : {
            value : ''
        },
        validator : {
            value : validatorScript,
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
    return Promise.resolve(`<div id="${model.id.value}" is="page.form.comp.number" 
                class="form-group"
                ${resourceName ? '' : 'draggable="true"'} 
                style="width: 100%" 
                data-resource-name="${resourceName}" 
                data-resource-id="${resourceId}">
            <label for="${inputId}" style="margin-bottom:0">${model.label.value}</label>
            <input type="number" id="${inputId}" class="form-control" 
                placeholder="${model.placeholder.value}" 
                name="${model.name.value}" 
                ${model.required.value ? 'required="true"' : ''} 
                ${model.unique.value ? 'unique="true"' : ''} 
                ${model.encrypted.value ? 'encrypted="true"' : ''} 
                ${model.adminOnly.value ? 'admin-only="true"':''} 
                ${model.minValue.value ? 'min="'+model.minValue.value+'"' : ''}
                ${model.maxValue.value ? 'max="'+model.maxValue.value+'"' : ''}
                ${model.pattern.value ? 'pattern="'+model.pattern.value+'"' : ''}
                step="${model.step.value}"
                value="${value}" >
            <code style="display: none" data-validator="${inputId}">${model.validator.value}</code>
            <small>${model.description.value}</small>
        </div>`)
};

module.exports = {render};