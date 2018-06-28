const {render} = require('./horizontal-render');
class Horizontal{
    constructor(node){
        this.node = node;
        this.node.toJSON = this.toJSON.bind(this);
    }

    toJSON(){
        const result = {
            type : this.node.getAttribute('is'),
            children : []
        };
        const container = this.node.querySelector('.container-panel-item');
        container.childNodes.forEach(node => {
            if('hasAttribute' in node && node.hasAttribute('is')){
                result.children.push(node.toJSON());
            }
        });
        return result;
    }

    static render (model,data) {
        return render(model,data);
    }
}

module.exports = Horizontal;