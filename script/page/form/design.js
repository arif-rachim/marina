const html = require('../../res/html');
module.exports = (req) => {
    return html(req,`
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
            
            .full-width {
                width : 100%;
            }
            
            .margin-bt {
                margin-bottom : 1em;
            }
            
            .form-group.full-width.margin-bt-small {
                margin-bottom : 0.1em;
            }
            
            .form-group.full-width {
                margin-bottom: 0.5em;
                margin-left : 0.5em;
                margin-right : 0.5em;
            }
            
            
        </style>
        
        <div style="display: flex;height: 100vh">
            <div style="width: 300px;border-right: 1px solid #d3d9df;display: flex;flex-direction: column;padding: 1em">
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Tools</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="page.form.single-line-text">Single Line Text</div>
                        
                    </div>
                </div>
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Container</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="vertical">Vertical</div>
                        <div class="input-item" draggable="true" data-type="horizontal">Horizontal</div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;background-color: #F5F5F5;padding: 3em;display: flex;justify-content: center">
                <div style="width: 100%;background-color: white;border: 1px solid #d3d9df;min-height: 5em;max-width: 900px;padding: 1em;overflow:auto;display: flex;flex-direction: column" id="form-panel">
                    <div class="dropdown-target-marker hide"></div>
                            
                </div>
            </div>
            <div style="width: 300px;border-left: 1px solid #d3d9df;padding:1em" is="page.form.properties-panel">
                <h3 style="font-weight: 100">Properties</h3>
                <div class="property-details" style="width: 100%">
                    
                </div>
            </div>
        </div>
        <script path="${__filename}">
            const {guid} = require('../../common/utils');
            const SingleLineText = require('./single-line-text');
            
            const formPanel = document.querySelector('#form-panel');
            
            document.querySelectorAll('.input-item').forEach(node => {
                node.addEventListener('dragstart',event => {
                    const data = {
                        action : 'new',
                        type : event.target.getAttribute('data-type')
                    };
                    event.dataTransfer.setData('text',JSON.stringify(data));
                })
            });
            
            const createContainer = (target,type) => {
                const marker = document.createElement('div');
                marker.classList.add('dropdown-target-marker');
                marker.classList.add('hide');
                
                const div = document.createElement('div');
                div.innerHTML = '<div class="container-panel-item '+type+'">' +
                    '<div class="dropdown-target-marker hide"></div>'+
                    '</div>';
                div.classList.add('container-panel');
                div.classList.add(type);
                div.setAttribute('draggable',true);
                target.parentNode.insertBefore(marker,target);
                target.parentNode.insertBefore(div,target);
            };
            
            const createElement = (target,type) => {
                const marker = document.createElement('div');
                marker.classList.add('dropdown-target-marker');
                marker.classList.add('hide');
                const div = document.createElement('div');
                div.innerHTML = SingleLineText.render({label:'label',placeholder:'placeholder',description:'description',name:'name'});
                target.parentNode.insertBefore(marker,target);
                target.parentNode.insertBefore(div.firstChild,target);
            };
            
            formPanel.addEventListener('drop',event => {
                event.preventDefault();
                const target = event.target;
                if(target.classList.contains('dropdown-target-marker')){
                    const data = JSON.parse(event.dataTransfer.getData('text'));
                    if(data.action == 'new'){
                        if(['vertical','horizontal'].indexOf(data.type) >= 0){
                            createContainer(target,data.type);
                        }else{
                            createElement(target,data.type);
                        }
                    }
                    if(data.action == 'move'){
                        const element = document.getElementById(data.id);
                        const marker = element.previousSibling;
                        if(marker != target){
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
                if(event.target == formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.remove('hide'));
                } else if (event.target.classList.contains('dropdown-target-marker')){
                   event.target.classList.add('selected');
                } else if (event.target == formPanel){
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide')); 
                }
            });
        </script>
    `)
};
