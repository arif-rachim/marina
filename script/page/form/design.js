const html = require('../../res/html');
const Vertical = require('./comp/vertical-render');
const Horizontal = require('./comp/horizontal-render');
const Button = require('./comp/button-render');
const SingleLineText = require('./comp/single-line-text-render');
const {fetch} = require('../../../config');

const componentMap = {
    'page.form.comp.button' : Button,
    'page.form.comp.vertical' : Vertical,
    'page.form.comp.horizontal' : Horizontal,
    'page.form.comp.single-line-text' : SingleLineText,
    'form' : {render: attribute => {
        return printComponent(attribute);
    }}
};

const dropdownTargetMarker = '<div class="dropdown-target-marker hide"></div>';

const printComponents = (models) => {
    return models.map(model => {
        return printComponent(model);
    }).join(dropdownTargetMarker)+dropdownTargetMarker;

};
const printComponent = (model) => {
    const component = componentMap[model.type];
    if(model.children){
        return component.render({slot:printComponents(model.children)});
    }
    if(model.attribute){
        return component.render(model.attribute);
    }
};
module.exports = async (req) => {
    let model = false;
    if(req.query.id){
        model = await fetch(`/res/system_forms/${req.query.id}`);
    }
    try {
        return html(req, `
        <style>
            .input-item{
                border-radius: 0.5em;
                background-color: #e9ecef;
                border: 1px solid #d3d9df;
                text-align: center;
                padding: 0.2em 0.8em 0.4em 0.8em;
                display: inline-block;
                margin: 0.4em;
            }
            
            .dropdown-target-marker{
                border: 1px dotted cadetblue;
                background-color: #f7f7f7;
                min-height: 1em;
                transition: all 100ms ease-out;
            }
            
            .horizontal > .dropdown-target-marker {
                width : 2em;
                min-height : 1em;
            }
            
            .vertical > .dropdown-target-marker {
                width : 100%;
                height : 1em
            }
            
            .selected {
                background-color: blue;
            }
            
            .hide {
                opacity: 0;
                width: 0 !important;
                height: 0 !important;
                min-height: 0;
            }
            
            .container-panel {
                width: 100%;
                display: flex;
            }
            
            .container-panel .container-panel-item{
                width: 100%;
                min-height: 1em;
            }
            
            .container-panel-item.vertical{
                display: flex;
                flex-direction: column;
            }
            
            .container-panel-item.horizontal{
                display: flex;
            }
            
            .container-panel-item.horizontal > div[is]{
                margin-right: 0.5em;
                margin-left: 0.5em;
            }
            
            .container-panel-item.horizontal {
                margin-left : -0.5em;
                margin-right : -0.5em;
                width: calc(100% + 1em);
            }
            
        </style>
        
        <div style="display: flex;height: 100vh">
            <div style="width: 300px;border-right: 1px solid #d3d9df;display: flex;flex-direction: column;padding: 1em">
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Tools</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="page.form.comp.single-line-text">Single Line Text</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.number">Number</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.paragraph-text">Paragraph Text</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.checkboxes">Checkboxes</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.multiple-choice">Multiple Choice</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.drop-down">Dropdown</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.multiple-items">Multiple Items</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.section-break">Section Break</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.page-break">Page Break</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.button">Submit Button</div>
                    </div>
                </div>
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Container</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="page.form.comp.vertical">Vertical</div>
                        <div class="input-item" draggable="true" data-type="page.form.comp.horizontal">Horizontal</div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;background-color: #F5F5F5;padding: 3em;display: flex;justify-content: center;flex-direction: column">
                <div style="margin-bottom: 0.5em;">
                    <input type="hidden" value="${model._id || ''}" id="formDatabaseId">
                    <input id="formDatabaseLabel" type="text" placeholder="Form Name" class="form-control" onkeyup="document.getElementById('formDatabaseName').innerText =  event.target.value.toLowerCase().split(' ').join('_')" required value="${model.label || ''}">
                    <small>"<span id="formDatabaseName" style="font-style: italic">${model.name || ''}</span>" will be the table name in database</small>
                </div>
                <div style="width: 100%;height:100%;background-color: white;border: 1px solid #d3d9df;min-height: 5em;max-width: 900px;padding: 1em;overflow:auto;display: flex;flex-direction: column" id="form-panel">
                    ${model ? printComponent(model) : Vertical.render()}                            
                </div>
                <div style="margin-top: 0.5em;text-align: right">
                    <button class="btn btn-primary" id="saveFormButton">Save</button>
                </div>
            </div>
            <div style="width: 700px;border-left: 1px solid #d3d9df;padding:1em;overflow: auto" is="page.form.comp.properties-panel">
                <h3 style="font-weight: 100">Properties</h3>
                <div class="property-details" style="width: 100%">
                    
                </div>
            </div>
        </div>
        <script path="${__filename}">
            const {merge} = require('../../common/utils');
            const {publish} = require('../../common/pubsub');
            
            const formPanel = document.querySelector('#form-panel');
            const {fetch} = require('../../common/net');
            
            const Vertical = require('./comp/vertical');
            const Horizontal = require('./comp/horizontal');
            const SingleLineText = require('./comp/single-line-text');
            const Button = require('./comp/button');
            const componentMap = {
                'page.form.comp.button' : Button,
                'page.form.comp.vertical' : Vertical,
                'page.form.comp.horizontal' : Horizontal,
                'page.form.comp.single-line-text' : SingleLineText
            };
            document.querySelector('#saveFormButton').addEventListener('click',event => {
                publish('app.confirmation',{
                    text : 'Are you sure you want to Save the form ?',
                    buttons : ['Yes','No']
                }).then(function(button){
                    if(button.innerText === 'Yes' ){
                        let model = {};
                        formPanel.childNodes.forEach(node => {
                            if('hasAttribute' in node && node.hasAttribute('is')){
                                const json = node.toJSON();
                                model = merge(model,json);
                            }
                        });
                        const formDatabaseLabel = document.getElementById('formDatabaseLabel');
                        
                        if(formDatabaseLabel.checkValidity()){
                            let form = {
                                type : 'form',
                                label : formDatabaseLabel.value,
                                name : document.getElementById('formDatabaseName').innerText,
                                attribute : model
                            };
                            const id = document.getElementById('formDatabaseId').value;
                            if(id){
                                form._id = id;
                                fetch('/res/system_forms/'+id,form,'PUT').then((result) => {
                                    publish('app.notification','Form successfully updated');
                                });
                            }else{
                                fetch('/res/system_forms',form,'POST').then((result) => {
                                    publish('app.notification','Form successfully saved');
                                });
                            }
                        }
                    }
                });  
            });
            
            document.querySelectorAll('.input-item').forEach(node => {
                node.addEventListener('dragstart',event => {
                    const data = {
                        action : 'new',
                        type : event.target.getAttribute('data-type')
                    };
                    event.dataTransfer.setData('text',JSON.stringify(data));
                })
            });
            
            
            const createElement = (target,type) => {
                if(!(type in componentMap)){
                    publish('app.notification','Unable to find type of '+type);
                    return;
                }
                const marker = document.createElement('div');
                marker.classList.add('dropdown-target-marker');
                marker.classList.add('hide');
                const div = document.createElement('div');
                div.innerHTML = componentMap[type].render();    
                target.parentNode.insertBefore(marker,target);
                target.parentNode.insertBefore(div.firstChild,target);
            };
            
            formPanel.addEventListener('drop',event => {
                event.preventDefault();
                const target = event.target;
                if(target.classList.contains('dropdown-target-marker')){
                    const data = JSON.parse(event.dataTransfer.getData('text'));
                    if(data.action === 'new'){
                        createElement(target,data.type);
                    }
                    if(data.action == 'move'){
                        const element = document.getElementById(data.id);
                        const marker = element.previousSibling;
                        if(marker !== target){
                            target.parentNode.insertBefore(marker,target);
                            target.parentNode.insertBefore(element,target);
                        }
                    }
                    
                }
                document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide'));
            });
            
            formPanel.parentNode.addEventListener('dragover',event => {
                event.preventDefault();
                document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.remove('selected'));
                if(event.target === formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.remove('hide'));
                } else if (event.target.classList.contains('dropdown-target-marker')){
                   event.target.classList.add('selected');
                } else if (event.target === formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide')); 
                }
            });
        </script>
    `)
    }catch(err){
        console.error(err);
    }
};
