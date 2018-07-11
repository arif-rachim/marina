const {merge} = require('../../../common/utils');
const {publish,subscribe} = require('../../../common/pubsub');
const {render} = require('./single-line-text-render');
const {fetch} = require('../../../common/net');

class SingleLineText {

    constructor(node){
        this.node = node;
        this.node.toJSON = this.toJSON.bind(this);
        this.node.isValid = this.isValid.bind(this);
        this.node.getName = this.getName.bind(this);
        this.node.getValue = this.getValue.bind(this);
        this.node.getModel = this.getModel.bind(this);
        this.input = this.node.querySelector('input');
        this.initialize();
    }

    initialize(){
        this.model = this.buildModel();
        this.node.addEventListener('dragstart',event => {
            const data = {
                action : 'move',
                id : event.target.getAttribute('id')
            };
            event.dataTransfer.setData('text',JSON.stringify(data));
        });

        this.node.addEventListener('click',() => {
            this.selectThisNode();
        });

        this.input.addEventListener('input',() => {
           this.isValid();
        });

        subscribe('property-details-update',data => {
            if(data.id.value === this.model.id.value){
                this.model = merge(this.model,data);
                this.refreshModel();
            }
        });


        subscribe('property-details-delete',data => {
            if(data.id.value === this.model.id.value){
                this.node.parentNode.removeChild(this.node);
            }
        });
    }

    selectThisNode(){
        const formPanel = document.getElementById('form-panel');
        if(formPanel){
            formPanel.querySelectorAll('[is]').forEach(node => node.classList.remove('selected'));
            this.node.classList.add('selected');
            publish('property-details',this.model);
        }
    }

    buildModel(){
        const validator = this.node.querySelector('code');
        return {
            label:{
                value : this.node.querySelector('label').innerHTML,
                    name : 'Label',
                    type : 'text',
                    description : 'The label of the property'
            },
            name : {
                value : this.input.getAttribute('name'),
                    name : 'Name',
                    type : 'text',
                    description : 'This is the name of the property that is stored in the database, this is simliar to column name of a table.',
                    mask : "event.target.value = event.target.value.toLowerCase().split(' ').join('_')"
            },
            placeholder : {
                value : this.input.getAttribute('placeholder'),
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
                value : this.input.hasAttribute('required'),
                    name : 'Required',
                    type : 'boolean',
                    description : 'If selected, user must entered the input value'
            },
            unique : {
                value : this.input.hasAttribute('unique'),
                    name : 'No Duplicate',
                    type : 'boolean',
                    description : 'If selected, this input will be checked before the form submitted'
            },
            encrypted : {
                value : this.input.hasAttribute('encrypted'),
                    name : 'Encrypted',
                    type : 'boolean',
                    description : 'If selected, this input will encrypted in database.Please be advice encrypted value cannot be queried'
            },
            adminOnly : {
                value : this.input.hasAttribute('admin-only'),
                    name : 'Admin Only',
                    type : 'boolean',
                    description : 'If selected, this input will only visible for admin only.'
            },
            minChars : {
                value : this.input.hasAttribute('min-chars') ? this.input.getAttribute('min-chars') : 0,
                    name : 'Minimum Characters',
                    type : 'number',
                    description : 'If selected, minimum characters validation will be triggered before the form submitted'
            },
            maxChars : {
                value : this.input.hasAttribute('max-chars') ?  this.input.getAttribute('max-chars') : 255,
                    name : 'Maximum Characters',
                    type : 'number',
                    description : 'If selected, maximum characters validation will be triggered before the form submitted'
            },
            pattern : {
                value : this.input.hasAttribute('pattern') ? this.input.getAttribute('pattern') : '',
                    name : 'Pattern',
                    type : 'text',
                    description : 'If set, Regex pattern validation will be triggered before the form submitted'
            },
            validator : {
                value : validator.innerText,
                    name : 'Validator : (data,form) => return ',
                    type : 'javascript',
                    description : 'A Javascript function to perform advance validation, promise return is accepted, please return following format {success:false,errorMessage:"validation message to display"}'
            },
            id : {
                value : this.node.id,
                    name : 'Id',
                    type : 'hidden'
            }
        }
    }

    toJSON(){
        return {
            type : this.node.getAttribute('is'),
            attribute : this.model
        };
    }

    getName(){
        return this.model.name.value;
    }

    getValue(){
        return this.input.value;
    }

    getModel(){
        this.buildModel();
        return this.model;
    }

    isValid(){
        this.input.setCustomValidity('');
        return new Promise(resolve => {
            this.model = this.buildModel();
            const input = this.input;
            let value = input.value;
            let resourceName = this.node.getAttribute('data-resource-name');
            let resourceId = this.node.getAttribute('data-resource-id');

            if(this.model.required.value ){
                if(!input.checkValidity()){
                    resolve({success : false,message:input.validationMessage});
                    return;
                }
            }
            if(this.model.minChars.value > 0){
                if(value.length < this.model.minChars.value){
                    input.setCustomValidity(`Minimum character ${this.model.label.value} is ${this.model.minChars.value}`);
                    resolve({success : false,message:input.validationMessage});
                    return;
                }
            }
            if(this.model.maxChars.value > 0){
                if(value.length > this.model.maxChars.value){
                    input.setCustomValidity(`Maximum character ${this.model.label.value} is ${this.model.maxChars.value}`);
                    resolve({success : false,message:input.validationMessage});
                    return;
                }
            }

            const asyncResult = [];

            if(this.model.unique.value && resourceName){
                const asyncPromise = fetch(`/res/${resourceName}?${this.model.name.value}=|${value}|`,{},'GET',false).then(result => {
                    if(result.docs.length == 0 || result.docs[0]._id === resourceId){
                        return {success:true};
                    }
                    input.setCustomValidity(`${this.model.label.value} value is duplicate`);
                    return {success : false,message:input.validationMessage};
                });
                asyncResult.push(asyncPromise);
            }
            if(asyncResult.length > 0){
                Promise.all(asyncResult).then(results => {
                    for(let i =0;i<results.length;i++){
                        const result = results[i];
                        if(!result.success){
                            resolve(result);
                            return;
                        }
                    }
                    resolve({success:true});
                });
            }else{
                resolve({success:true});
            }
        });
    }

    static render(model,data) {
        return render(model,data);
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