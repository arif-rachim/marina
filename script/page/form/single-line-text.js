const {guid,merge} = require('../../common/utils');
const {publish,subscribe} = require('../../common/pubsub');

class SingleLineText {

    constructor(node){
        this.node = node;
        this.node.toJSON = this.toJSON.bind(this);
        this.initialize();
    }

    initialize(){
        const input = this.node.querySelector('input');
        const validator = this.node.querySelector('code');
        this.model = {
            label:{
                value : this.node.querySelector('label').innerHTML,
                name : 'Label',
                type : 'text',
                description : 'The label of the property'
            },
            name : {
                value : input.getAttribute('name'),
                name : 'Name',
                type : 'text',
                description : 'This is the name of the property that is stored in the database, this is simliar to column name of a table.',
                mask : "event.target.value = event.target.value.toLowerCase().split(' ').join('_')"
            },
            placeholder : {
                value : input.getAttribute('placeholder'),
                name : 'Placeholder',
                type : 'text',
                description : 'Placeholder in the input to guide users when entering the data'
            },
            description : {
                value : this.node.querySelector('small').innerHTML,
                name : 'Description',
                type : 'paragraph',
                description : 'Description of the input to give details about the input'
            },
            required : {
                value :this.node.hasAttribute('required'),
                name : 'Required',
                type : 'boolean',
                description : 'If selected, user must entered the input value'
            },
            unique : {
                value : this.node.hasAttribute('unique'),
                name : 'No Duplicate',
                type : 'boolean',
                description : 'If selected, this input will be checked before the form submitted'
            },
            encrypted : {
                value : this.node.hasAttribute('encrypted'),
                name : 'Encrypted',
                type : 'boolean',
                description : 'If selected, this input will encrypted in database.Please be advice encrypted value cannot be queried'
            },
            adminOnly : {
                value : this.node.hasAttribute('adminOnly'),
                name : 'Admin Only',
                type : 'boolean',
                description : 'If selected, this input will only visible for admin only.'
            },
            minChars : {
                value : input.hasAttribute('min-chars') ? input.getAttribute('min-chars') : 0,
                name : 'Minimum Characters',
                type : 'number',
                description : 'If selected, minimum characters validation will be triggered before the form submitted'
            },
            maxChars : {
                value : input.hasAttribute('max-chars') ?  input.getAttribute('max-chars') : 255,
                name : 'Maximum Characters',
                type : 'number',
                description : 'If selected, maximum characters validation will be triggered before the form submitted'
            },
            pattern : {
                value : input.hasAttribute('pattern') ? input.getAttribute('pattern') : '',
                name : 'Pattern',
                type : 'text',
                description : 'If set, Regex pattern validation will be triggered before the form submitted'
            },
            validator : {
                value : validator.innerText,
                name : 'Validator : (data,form) => return ',
                type : 'paragraph',
                description : 'A Javascript function to perform advance validation, promise return is accepted, please return following format {success:false,errorMessage:"validation message to display"}'
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

        this.node.addEventListener('click',() => {
            publish('property-details',this.model);
        });

        subscribe('property-details-update',data => {
            if(data.id.value === this.model.id.value){
                this.model = merge(this.model,data);
                this.refreshModel();
            }
        });

    }

    toJSON(){
        return {
            type : this.node.getAttribute('is'),
            attribute : this.model
        };
    }

    static render ({label="Label",name="name",placeholder="Please set Placeholder",description="Please set the description",required=true,unique=false,encrypted=false,adminOnly=false}) {
        const inputId = guid();
        return `<div id="${guid()}" is="page.form.single-line-text" class="form-group" draggable="true" style="width: 100%">
            <label for="${inputId}" style="margin-bottom:0">${label}</label>
            <input type="text" id="${inputId}" class="form-control" placeholder="${placeholder}" name="${name}" ${required ? 'required' : ''} ${unique ? 'unique' : ''} ${encrypted ? 'encrypted' : ''} ${adminOnly ? 'admin-only':''} >
            <code style="display: none" data-validator="${inputId}"></code>
            <small>${description}</small>
        </div>`
    }

    refreshModel() {
        this.node.querySelector('label').innerHTML = this.model.label.value;
        const input = this.node.querySelector('input');
        input.setAttribute('placeholder',this.model.placeholder.value);
        input.setAttribute('name',this.model.name.value);

        if(this.model.required.value){
            input.setAttribute('required',"true");
        }else{
            input.removeAttribute('required');
        }

        if(this.model.unique.value){
            input.setAttribute('unique',"true");
        }else{
            input.removeAttribute('unique');
        }


        if(this.model.encrypted.value){
            input.setAttribute('encrypted',"true");
        }else{
            input.removeAttribute('encrypted');
        }

        if(this.model.adminOnly.value){
            input.setAttribute('admin-only',"true");
        }else{
            input.removeAttribute('admin-only');
        }

        if(this.model.minChars.value){
            input.setAttribute('min-chars',this.model.minChars.value);
        }else{
            input.removeAttribute('min-chars');
        }

        if(this.model.maxChars.value){
            input.setAttribute('max-chars',this.model.maxChars.value);
        }else{
            input.removeAttribute('max-chars');
        }

        if(this.model.pattern.value){
            input.setAttribute('pattern',this.model.pattern.value);
        }else{
            input.removeAttribute('pattern');
        }


        this.node.querySelector('code').innerText = this.model.validator.value;
        this.node.querySelector('small').innerHTML = this.model.description.value;
    }
}

module.exports = SingleLineText;