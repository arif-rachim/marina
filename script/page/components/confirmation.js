
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
                top : 0px;
                transition: top 300ms;
                
                border: 1px solid #eeeeee;
                border-top: none;
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
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
                    <div class="card slider shadow p-1 mb-5 hide" >
                        <div style="display: flex;align-items: center;">
                            <div><i class="far fa-question-circle" style="font-size: 2em;color: #333"></i></div>
                            <h5 class="text-message ml-1 mb-1" >Are you sure you want to ?</h5>
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
            const {subscribe} = require('../../common/pubsub');
            
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
                
                buttonHolders.innerHTML = buttonsConfiguration.map(function(btn,index){
                    if(index === 0){
                        return '<button data-name="'+btn+'" class="btn btn-primary" >'+btn+'</button>'    
                    }
                    return '<button data-name="'+btn+'" class="btn " >'+btn+'</button>'
                }).join('');
                
                buttonHolders.querySelectorAll('button').forEach(button => {
                    button.addEventListener('click',onButtonHoldersClick,{once:true});
                });
                
                if(slider.classList.contains('hide')){
                    slider.classList.remove('hide');
                }
            } 
            
            subscribe('app.confirmation',function(param){
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