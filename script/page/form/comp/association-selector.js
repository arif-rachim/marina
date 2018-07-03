const {fetch} = require('../../../common/net');
const {guid} = require('../../../common/utils');
class AssociationSelector {

    constructor(node){
        this.node = node;
        this.slider = this.node.parentNode;
        this.initialize();
    }

    initialize(){
        this.resourcePath = this.node.getAttribute('resource-path');
        this.selectedResource = this.node.getAttribute('selected-resource').split(',');
        const rendererCode = this.node.querySelector('code').innerText;
        this.dataRenderer = eval(rendererCode);
        this.selectButton = this.node.querySelector('.btn.select');
        this.cancelButton = this.node.querySelector('.btn.cancel');
        const contentNode = this.node.querySelector('.content');
        fetch(`/res/${this.resourcePath}`).then(response => {
            this.docs = response.docs;
            contentNode.innerHTML = this.renderContent();
            this.slider.showSlider();
        });
        this.cancelButton.addEventListener('click',this.onCancel.bind(this));
        this.selectButton.addEventListener('click',this.onSelect.bind(this));
    }

    onCancel(){
        this.slider.closeSlider(false);
    }

    onSelect(){
        const selectedItems = [];
        this.node.querySelectorAll('input[type="checkbox"]').forEach(node => {
            if(node.checked){
                selectedItems.push(this.docs.filter(data => data._id === node.value)[0])
            }
        });
        this.slider.closeSlider(selectedItems);
    }
    renderData(data){
        const uid = guid();
        return `<div class="form-check" style="margin-right: 0.5em">
            <label for="${uid}" class="form-check-label"><input type="checkbox" value="${data._id}" class="form-check-input" id="${uid}" style="margin-left: -1.25em">${this.dataRenderer(data)}</label>
        </div>`
    }
    renderContent(){
        return `
        ${this.docs.filter(doc => this.selectedResource.indexOf(doc._id) < 0 ).map(this.renderData.bind(this)).join('')}
        `
    }

}

module.exports = AssociationSelector;