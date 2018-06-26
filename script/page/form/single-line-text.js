const {guid} = require('../../common/utils');
const {publish,subscribe} = require('../../common/pubsub');

class SingleLineText {

    constructor(node){
        this.node = node;
        this.initialize();
    }

    initialize(){
        const input = this.node.querySelector('input');
        this.model = {
            label:{
                value : this.node.querySelector('label').innerHTML,
                name : 'Label',
                type : 'text'
            },
            name : {
                value : input.getAttribute('name'),
                name : 'Name',
                type : 'text'
            },
            placeholder : {
                value : input.getAttribute('placeholder'),
                name : 'Placeholder',
                type : 'text'
            },
            description : {
                value : this.node.querySelector('small').innerHTML,
                name : 'Description',
                type : 'text'
            },
            required : {
                value :this.node.hasAttribute('required'),
                name : 'Required',
                type : 'boolean'
            },
            unique : {
                value : this.node.hasAttribute('unique'),
                name : 'Unique',
                type : 'boolean'
            },
            encrypted : {
                value : this.node.hasAttribute('encrpted'),
                name : 'Encrypted',
                type : 'boolean',
            },
            adminOnly : {
                value : this.node.hasAttribute('adminOnly'),
                name : 'Admin Only',
                type : 'boolean'
            },
            id : {
                value : this.node.id,
                name : 'Id',
                type : 'hidden'
            }
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

    static render ({label,name,placeholder,description,required=true,unique=false,encrypted=false,adminOnly=false}) {
        const inputId = guid();
        return `<div id="${guid()}" is="page.form.single-line-text" class="form-group" draggable="true" style="width: 100%">
            <label for="${inputId}" style="margin-bottom:0">${label}</label>
            <input type="text" id="${inputId}" class="form-control" placeholder="${placeholder}" name="${name}" ${required ? 'required' : ''} ${unique ? 'unique' : ''} ${encrypted ? 'encrypted' : ''} ${adminOnly ? 'admin-only':''} >
            <small>${description}</small>
        </div>`
    }

    refreshModel() {
        this.node.querySelector('label').innerHTML = this.model.label.value;
        const input = this.node.querySelector('input');
        input.setAttribute('placeholder',this.model.placeholder.value);
        input.setAttribute('name',this.model.name.value);

        if(this.model.required.value){
            input.setAttribute('required',true);
        }else{
            input.removeAttribute('required');
        }

        if(this.model.unique.value){
            input.setAttribute('unique',true);
        }else{
            input.removeAttribute('unique');
        }

        if(this.model.encrypted.value){
            input.setAttribute('encrypted',true);
        }else{
            input.removeAttribute('encrypted');
        }

        if(this.model.adminOnly.value){
            input.setAttribute('admin-only',true);
        }else{
            input.removeAttribute('admin-only');
        }

        this.node.querySelector('small').innerHTML = this.model.description.value;
    }
}

module.exports = SingleLineText;