const {guid} = require('../../../common/utils');

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

    static render () {
        const uid = guid();
        return `<div id="${uid}" class="container-panel horizontal" draggable="true" is="page.form.comp.horizontal" > 
            <div class="container-panel-item horizontal">
                <div class="dropdown-target-marker hide"></div>
            </div>
        </div>`
    }
}

module.exports = Horizontal;