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
                        <div class="input-item" draggable="true">Vertical</div>
                        <div class="input-item" draggable="true">Horizontal</div>
                        <div class="input-item" draggable="true">Collapsed</div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;background-color: #F5F5F5;padding: 3em;display: flex;justify-content: center">
                <div style="width: 100%;background-color: white;border: 1px solid #d3d9df;min-height: 5em;max-width: 900px" id="form-panel">
                
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
                    event.dataTransfer.setData('text',event.target.innerHTML);
                })
            });
            formPanel.addEventListener('drop',event => {
                event.preventDefault();
                const data =event.dataTransfer.getData('text');
                console.log(data);
            });
            formPanel.addEventListener('dragover',event => {
               event.preventDefault(); 
            });
        </script>
    `)
};
