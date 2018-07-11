const {merge} = require('../../../common/utils');
const {publish,subscribe} = require('../../../common/pubsub');
const {render} = require('./association-render');
const {fetch} = require('../../../common/net');
const itemRenderer = require('./association-item-render');
const AssociationSelector = require('./association-selector-render');

class Association {

    constructor(node){
        this.node = node;
        this.node.toJSON = this.toJSON.bind(this);
        this.node.isValid = this.isValid.bind(this);
        this.node.getName = this.getName.bind(this);
        this.node.getValue = this.getValue.bind(this);
        this.node.getModel = this.getModel.bind(this);
        this.input = this.node.querySelector('input');
        this.itemContainer = this.node.querySelector('.item-container');
        this.initialize();
    }

    initialize(){
        this.model = this.buildModel();
        if(this.input.value){
            fetch(`/res/${this.model.resourcePath.value}?$ids=${this.input.value}`).then(results => {
                if(results && results.length > 0){
                    this.items = results;
                    this.renderItems();
                }
            });
        }

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

        this.itemContainer.addEventListener('click',() => {
            const resourcePath = this.model.resourcePath.value;
            const dataRenderer = this.model.dataRenderer.value;
            const selectedResource = (this.input.value || '');
            if(resourcePath){
                publish('app.slider',AssociationSelector.render({
                    resourcePath : resourcePath,
                    selectedResource : selectedResource,
                    dataRenderer : dataRenderer,
                    title : this.model.label.value
                })).then(results => {
                    if(results){
                        this.items = this.items || [];
                        this.items =  this.items.concat(results);
                        this.renderItems();
                    }
                });
            }
        });

        subscribe('property-details-update',data => {
            if(data.id.value === this.model.id.value){
                this.model = merge(this.model,data);
                this.refreshModel();
            }
        });

    }

    renderItems(){
        const items = this.items;
        const renderer = Function(`return ${this.model.dataRenderer.value}`)();
        this.itemContainer.innerHTML = itemRenderer(items,renderer);
        this.input.value = items.map(data => data._id).join(',');
        this.itemContainer.querySelectorAll('.btn-item').forEach(btn => {
            btn.addEventListener('click',this.onDeleteItem.bind(this));
        })
    }

    onDeleteItem(event){
        event.preventDefault();
        event.stopPropagation();

        const itemId = event.target.getAttribute('data-id');
        this.items = this.items.filter(item => item._id !== itemId);
        this.renderItems();
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
        const validator = this.node.querySelector('code[data-validator]');
        const dataRenderer = this.node.querySelector('code[data-renderer]');
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
            resourcePath : {
                value : this.input.getAttribute('resource-path'),
                name : 'Resource Path',
                type : 'text',
                description : 'This will be the associated resource path'
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
            validator : {
                value : validator.innerText,
                name : 'Validator : (data,node) => return ',
                type : 'javascript',
                description : 'A Javascript function to perform advance validation, promise return is accepted, please return following format {success:false,errorMessage:"validation message to display"}'
            },
            dataRenderer : {
                value : dataRenderer.innerText,
                name : 'Renderer : (data) => return ',
                type : 'javascript',
                description : 'A Javascript function to render the data'
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

        this.node.querySelector('code').innerText = this.model.validator.value;
        this.node.querySelector('small').innerHTML = this.model.description.value;
    }
}

module.exports = Association;