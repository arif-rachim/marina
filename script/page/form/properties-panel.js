const {subscribe,publish} = require('../../common/pubsub');

class PropertiesPanel{
    constructor(node){
        this.node = node;
        this.propertyDetailsHolder = node.querySelector('.property-details');
        subscribe('property-details',form => {
            const template = [];
            for(let key in form){
                template.push(`
                    <div class="form-group" style="margin: 0px;margin-bottom: 0.5em;">
                        <label style="margin: 0px">${key}</label>
                        <input type="text" value="${form[key]}" class="form-control">
                    </div>
                 `);
            }
            this.propertyDetailsHolder.innerHTML = template.join('');
            this.propertyDetailsHolder.querySelectorAll('input').forEach(input => {
                input.addEventListener('keyup',this.updateModel.bind(this));
            });
        });
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