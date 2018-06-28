const {publish} = require('../../../common/pubsub');
const {fetch} = require('../../../common/net');

class Form {
    constructor(node){
        this.node = node;
        this.resourceName = this.node.getAttribute('data-resource-name');
        this.resourceId = this.node.getAttribute('data-resource-id');
        node.addEventListener('submit',this.onSubmit.bind(this));
    }

    onSubmit(event) {
        const validityPromises = [];
        const data = {};
        this.node.querySelectorAll('[is^="page.form.comp"]').forEach(node => {
            if('isValid' in node){
                validityPromises.push(node.isValid());
                data[node.getName()] = node.getValue();
            }
        });
        this.data = data;
        Promise.all(validityPromises).then(results => {
            let allValid = true;
            results.forEach(result => {
                if(!result.success){
                    allValid = false;
                    publish('app.notification',result.message);
                }
            });
            if(allValid){
                publish('app.confirmation',{
                    text : 'Are you sure you want to save the information ?',
                    buttons : ['Yes','No']
                }).then((button) => {
                    if(button.innerText === 'Yes' ){
                        this.saveToServer();
                    }
                });
            }
        });
        return false;
    }

    saveToServer() {
        const isUpdate = this.resourceId && this.resourceId.length > 0;
        const path = `/res/${this.resourceName}`+(isUpdate ? `/${this.resourceId}` : '');
        fetch(path,this.data,isUpdate ? 'PUT':'POST').then(result => {
            if(result.success){
                publish('app.notification','Data saved successfully');
            }
        });
    }
}
module.exports = Form;