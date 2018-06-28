const {publish,subscribe} = require('../../../common/pubsub');
const {render} = require('./button-render');
class Button {

    constructor(node){
        this.node = node;
        this.node.toJSON = this.toJSON.bind(this);
        this.initialize();
    }

    toJSON(){
        const result = {
            type : this.node.getAttribute('is'),
            attribute : this.model
        };
        return result;
    }

    initialize(){
        const input = this.node.querySelector('input');
        this.model = {
            label:{
                value : input.getAttribute('value'),
                name : 'Label',
                type : 'text',
                description : 'The label of the property'
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
            if(data.id.value === this.model.id.value){
                for(let key in data){
                    let val = data[key];
                    for (let valKey in val){
                        this.model[key][valKey] = val[valKey];
                    }
                }
                this.refreshModel();
            }
        });
    }

    static render (model,data) {
        return render(model,data);
    }

    refreshModel() {
        const input = this.node.querySelector('input');
        input.setAttribute('value',this.model.label.value);
    }
}

module.exports = Button;