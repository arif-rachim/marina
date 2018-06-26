const {subscribe,publish} = require('../../common/pubsub');

class PropertiesPanel{
    constructor(node){
        this.node = node;
        this.propertyDetailsHolder = node.querySelector('.property-details');
        subscribe('property-details',model => {
            const template = [];
            for(let key in model){
                template.push(`
                    <div class="${model[key].type == 'boolean' ? '' : 'form-group'}" style="margin: 0px;margin-bottom: 0.5em;${model[key].type == 'boolean' ? 'display:flex' : ''}">
                        <label style="margin: 0px;display: ${model[key].type == 'boolean' ? 'none' : ''}" >${model[key].name}</label>
                        ${this.printInput(model[key])}
                        <label style="margin: 0px;display: ${model[key].type == 'boolean' ? 'block' : 'none'}" >${model[key].name}</label>
                    </div>
                 `);
            }
            this.propertyDetailsHolder.innerHTML = template.join('');
            this.propertyDetailsHolder.querySelectorAll('input[type="text"] , input[type="number"]').forEach(input => {
                input.addEventListener('keyup',this.updateModel.bind(this));
            });
        });
    }

    printInput(modelElement) {
        if(modelElement.type == 'text'){
            return `<input type="text" value="${modelElement.value}" class="form-control">`;
        }
        if(modelElement.type == 'number'){
            return `<input type="number" value="${modelElement.value}" class="form-control">`;
        }
        if(modelElement.type == 'boolean'){
            return `<input type="checkbox" ${modelElement.value ? 'checked' : ''}>`;
        }
    }

    updateModel(event) {
        const labelNodes = this.propertyDetailsHolder.querySelectorAll('label');
        const inputNodes = this.propertyDetailsHolder.querySelectorAll('input');

        const model = {};
        labelNodes.forEach((label,index) => {
            model[label.innerText] = inputNodes[index].value;
        });

        publish('property-details-update',model);

    }
}

module.exports = PropertiesPanel;