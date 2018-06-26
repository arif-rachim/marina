const {guid} = require('../../common/utils');
const {publish,subscribe} = require('../../common/pubsub');

class SingleLineText {

    constructor(node){
        this.node = node;
        this.initialize();
    }

    initialize(){

        this.model = {
            label:this.node.querySelector('label').innerHTML,
            placeholder : this.node.querySelector('input').getAttribute('placeholder'),
            description : this.node.querySelector('small').innerHTML,
            name : this.node.querySelector('input').getAttribute('name'),
            id : this.node.id
        };

        this.node.addEventListener('dragstart',event => {
            const data = {
                action : 'move',
                id : event.target.getAttribute('id')
            };
            event.dataTransfer.setData('text',JSON.stringify(data));
        });

        this.node.addEventListener('click',event => {
            publish('property-details',this.model);
        });

        subscribe('property-details-update',data => {
            if(data.id == this.model.id){
                this.model = data;
                this.refreshModel();
            }
        });

    }

    static render ({label,name,placeholder,description}) {
        const inputId = guid();
        return `<div id="${guid()}" is="page.form.single-line-text" class="form-group" draggable="true" style="width: 100%">
            <label for="${inputId}" style="margin-bottom:0">${label}</label>
            <input type="text" id="${inputId}" class="form-control" placeholder="${placeholder}" name="${name}">
            <small>${description}</small>
        </div>`
    }

    refreshModel() {
        this.node.querySelector('label').innerHTML = this.model.label;
        const input = this.node.querySelector('input');
        input.setAttribute('placeholder',this.model.placeholder);
        input.setAttribute('name',this.model.name);
        this.node.querySelector('small').innerHTML = this.model.description;
    }
}

module.exports = SingleLineText;