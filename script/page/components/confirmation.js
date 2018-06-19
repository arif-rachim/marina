const theme = require('../theme');
module.exports = (req) => {
    return `
        <style>
            .confirmation-panel {
                display: flex;
                position: relative;
                justify-content: center;
                overflow: hidden;
            }
            .confirmation-panel .slider{
                position: absolute;
                display: inline-block;
                padding:1em;
                top : 0px;
                transition: top 300ms;
                
                border: 1px solid #eeeeee;
                border-top: none;
                
                background: rgba(252,252,252,1);
                background: -moz-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(240,240,240,1) 100%);
                background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,252,252,1)), color-stop(100%, rgba(240,240,240,1)));
                background: -webkit-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(240,240,240,1) 100%);
                background: -o-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(240,240,240,1) 100%);
                background: -ms-linear-gradient(top, rgba(252,252,252,1) 0%, rgba(240,240,240,1) 100%);
                background: linear-gradient(to bottom, rgba(252,252,252,1) 0%, rgba(240,240,240,1) 100%);
            }
            .confirmation-panel .slider.hide{
                top: -200px;
            }
            .confirmation-panel .button-holders button{
                margin: 0.3em;
            }
        </style>
        <div style="position: relative;width: 100%;">
            <div style="position: absolute;width: 100%;">
                <div class="confirmation-panel" style="z-index:1">
                    <div class="slider shadow p-3 mb-5 hide" >
                        <div style="display: flex;align-items: center;">
                            <div><i class="far fa-question-circle" style="font-size: 2em;color: #333"></i></div>
                            <div class="text-message" style="margin-left: 1em ">Are you sure you want to ?</div>
                        </div>
                        <div class="button-holders" style="display: flex;justify-content: flex-end">
                            <button class="btn">Yes</button>
                            <button class="btn">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script path="${__filename}">
            
            window.app = window.app || {};
            var buttonHolders = document.querySelector('.confirmation-panel .button-holders');
            var textMessage = document.querySelector('.confirmation-panel .text-message');
            
            function showSlider(text, buttonsConfiguration, onSelected) {
                var slider = document.querySelector('.confirmation-panel .slider');
                slider.style.position = 'relative';
                textMessage.innerHTML = text;
                function onButtonHoldersClick(event) {
                    slider.classList.add('hide');
                    onSelected.call(null,event.target);
                    setTimeout(function(){
                        slider.style.position = 'absolute';
                    },200)
                }
                buttonHolders.addEventListener('click',onButtonHoldersClick,{once:true});
                buttonHolders.innerHTML = buttonsConfiguration.map(function(btn,index){
                    if(index === 0){
                        return '<button data-name="'+btn+'" class="btn btn-primary" >'+btn+'</button>'    
                    }
                    return '<button data-name="'+btn+'" class="btn " >'+btn+'</button>'
                }).join('');
                
                if(slider.classList.contains('hide')){
                    slider.classList.remove('hide');
                }
            } 
            
            App.pubsub.subscribe('app.confirmation',function(param){
                var text = param.text;
                var buttons = param.buttons;
                return new Promise(function(resolve){
                    showSlider(text,buttons,function(event){
                        resolve(event);
                    })
                });
            });
            window.app.showConfirmation = showSlider;
            
        </script>
        
`;
};