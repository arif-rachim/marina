const {fetch} = require('../../../common/net');

class AssociationSelector {

    constructor(node){
        this.node = node;
        this.slider = this.node.parentNode;
        this.initialize();
    }

    initialize(){
        this.resourcePath = this.node.getAttribute('resource-path');
        this.selectedResource = this.node.getAttribute('selected-resource');
        this.dataRenderer = eval(this.node.querySelector('code').innerText);
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
        this.slider.hideSlider();
    }
    onSelect(){
        this.slider.hideSlider();
    }
    renderData(data){
        return `<tr>
            <td><input type="checkbox" value="${data._id}"></td>
            <td>${this.dataRenderer(data)}</td>
        </tr>`
    }
    renderContent(){
        return `
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${this.docs.map(this.renderData.bind(this)).join('')}
                </tbody>
            </table>
        </div>
        `
    }

}

module.exports = AssociationSelector;