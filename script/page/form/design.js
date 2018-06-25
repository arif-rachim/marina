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
                width: 100%;
                border: 1px dotted cadetblue;
                background-color: #f7f7f7;
                min-height: 2em;
                transition: all 100ms ease-out;
            }
            
            .selected {
                background-color: #e9ecef;
            }
            
            .hide {
                opacity: 0;
                width: 0;
                height: 0;
                min-height: 0;
            }
            
            .container-panel {
                width: 100%;
                display: flex;
                padding: 0.5em;
                border:1px solid wheat;
            }
            
            .container-panel .container-panel-item{
                width: 100%;
                border: 1px dotted red;
                min-height: 1em;
                padding: 0.5em;
            }
            
            .container-panel-item.vertical{
                display: flex;
                flex-direction: column;
            }
            
            .container-panel-item.horizontal{
                display: flex;
            }
            
        </style>
        
        <div style="display: flex;height: 100vh">
            <div style="width: 300px;border-right: 1px solid #d3d9df;display: flex;flex-direction: column;padding: 1em">
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Tools</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true">Text Box</div>
                        <div class="input-item" draggable="true">Drop Down</div>
                        <div class="input-item" draggable="true">Check Box</div>
                        <div class="input-item" draggable="true">Option</div>
                        <div class="input-item" draggable="true">Numeric</div>
                        <div class="input-item" draggable="true">Date</div>
                        <div class="input-item" draggable="true">Time</div>
                        <div class="input-item" draggable="true">Date Time</div>
                        <div class="input-item" draggable="true">Mask</div>
                        <div class="input-item" draggable="true">Text Area</div>
                        <div class="input-item" draggable="true">Button</div>
                        <div class="input-item" draggable="true">Header</div>
                        <div class="input-item" draggable="true">Lookup</div>
                        <div class="input-item" draggable="true">Paragraph</div>
                    </div>
                </div>
                <div style="height: 100%">
                    <h3 style="font-weight: 100">Container</h3>
                    <div style="width: 100%">
                        <div class="input-item" draggable="true" data-type="vertical">Vertical</div>
                        <div class="input-item" draggable="true" data-type="horizontal">Horizontal</div>
                        <div class="input-item" draggable="true">Collapsed</div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;background-color: #F5F5F5;padding: 3em;display: flex;justify-content: center">
                <div style="width: 100%;background-color: white;border: 1px solid #d3d9df;min-height: 5em;max-width: 900px;padding: 1em" id="form-panel">
                    <div class="dropdown-target-marker hide"></div>        
                </div>
            </div>
            <div style="width: 300px;border-left: 1px solid #d3d9df;padding:1em">
                <h3 style="font-weight: 100">Properties</h3>
            </div>
        </div>
        <script path="${__filename}">
            const formPanel = document.querySelector('#form-panel');
            
            document.querySelectorAll('.input-item').forEach(node => {
                node.addEventListener('dragstart',event => {
                    event.dataTransfer.setData('text',event.target.getAttribute('data-type'));
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
                div.addEventListener('click', event => {
                    
                });
                
                target.parentNode.insertBefore(marker,target);
                target.parentNode.insertBefore(div,target);
            };
            
            formPanel.addEventListener('drop',event => {
                event.preventDefault();
                const target = event.target;
                if(target.classList.contains('dropdown-target-marker')){
                    const type = event.dataTransfer.getData('text'); 
                    if(['vertical','horizontal'].indexOf(type) >= 0){
                           
                        createContainer(target,type);
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
                } else if (event.target.classList.contains('container-panel')){
                    
                } else if (event.target.classList.contains('container-panel-item')){
                    
                } else {
                   document.querySelectorAll('.dropdown-target-marker').forEach(node => node.classList.add('hide'));
                   
                }
            });
        </script>
    `)
};
