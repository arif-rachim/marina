const {subscribe,publish} = require('../../common/pubsub');
const {guid} = require('../../common/utils');
class PropertiesPanel{
    constructor(node){
        this.node = node;
        this.propertyDetailsHolder = node.querySelector('.property-details');
        subscribe('property-details',model => {
            const template = [];
            for(let key in model){
                template.push(PropertiesPanel.prepareTemplate(model[key],key));
            }
            this.propertyDetailsHolder.innerHTML = template.join('');
            this.propertyDetailsHolder.querySelectorAll('input[type="text"] , input[type="number"] , textarea').forEach(input => {
                input.addEventListener('keyup',this.updateModel.bind(this));
            });
            this.propertyDetailsHolder.querySelectorAll('input[type="checkbox"]').forEach(input => {
                input.addEventListener('change',this.updateModel.bind(this));
            });
        });
    }

    static prepareTemplate(model,key){
        const uid = guid();
        if(model.type === 'text'){
            return `<div class="form-group" style="margin: 0;margin-bottom: 0.5em;">
                    <label style="margin: 0;" for="${uid}">${model.name}</label>
                    <input id="${uid}" type="text" value="${model.value}" class="form-control" name="${key}" model-type="${model.type}" onkeyup="${model.mask ? model.mask : ''}">
                    <small>${model.description}</small> 
                </div>`;
        }

        if(model.type === 'paragraph'){
            return `<div class="form-group" style="margin: 0;margin-bottom: 0.5em;">
                    <label style="margin: 0;" for="${uid}">${model.name}</label>
                    <textarea id="${uid}"  rows="5" class="form-control" name="${key}" model-type="${model.type}">${model.value}</textarea>
                    <small>${model.description}</small>
                </div>`;
        }

        if(model.type === 'number'){
            return `<div class="form-group" style="margin: 0;margin-bottom: 0.5em;">
                    <label style="margin: 0;" for="${uid}">${model.name}</label>
                    <input id="${uid}" type="number" value="${model.value}" class="form-control" name="${key}" model-type="${model.type}">
                    <small>${model.description}</small> 
                </div>`
        }
        if(model.type === 'boolean'){
            return `<div class="form-check" style="margin: 0;margin-bottom: 0.5em;">
                    <label style="margin: 0;width: 100%" for="${uid}">
                        <input id="${uid}" type="checkbox" value="${model.value}" class="form-check-input" ${model.value ? 'checked' : ''} name="${key}" model-type="${model.type}">
                        ${model.name}
                    </label> 
                    <small>${model.description}</small>
                </div>`
        }

        if(model.type === 'hidden'){
            return `<div class="form-group" style="margin: 0;margin-bottom: 0.5em;display: none">
                    <label  style="margin: 0;" for="${uid}">${model.name}</label>
                    <input id="${uid}" type="hidden" value="${model.value}" class="form-control" name="${key}"  model-type="${model.type}" >
                    <small>${model.description}</small> 
                </div>`;
        }
    }


    updateModel(event) {
        const labelNodes = this.propertyDetailsHolder.querySelectorAll('label');

        const model = {};
        labelNodes.forEach((labelNode) => {
            const node = document.getElementById(labelNode.getAttribute('for'));
            const key = node.getAttribute('name');
            const type = node.getAttribute('model-type');
            let value = '';

            switch (type) {
                case 'boolean' :
                    value = node.checked;
                    break;
                case 'paragraph' :
                    value = node.value;
                    break;
                case 'number' :
                    value = node.value;
                    break;
                default :
                    value = node.value;
                    break;
            }

            model[key] = {
                value,
                name : labelNode.innerText,
                type
            }
        });
        publish('property-details-update',model);

    }
}

module.exports = PropertiesPanel;