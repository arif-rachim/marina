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
                background: #F0F0F0;
                padding:1em;
                border-bottom: 1px solid #cccccc;
                border-left: 1px solid #cccccc;
                border-right: 1px solid #cccccc;
                top : 0px;
                transition: top 300ms;
            }
            .confirmation-panel .slider.hide{
                top: -200px;
            }
            .confirmation-panel .button-holders button{
                margin: 0.3em;
            }
        </style>
        
        <div class="confirmation-panel">
            <div class="slider hide" >
                <div style="display: flex;align-items: center;">
                    <div><i class="far fa-question-circle" style="font-size: 2em;color: #333"></i></div>
                    <div class="text-message" style="margin-left: 1em ">Are you sure you want to ?</div>
                </div>
                <div class="button-holders" style="display: flex;justify-content: flex-end">
                    <button>Yes</button>
                    <button>No</button>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <button id="displayButton">Display Panel</button>
        -->
        <script>
            (function(exports){
                exports.app = exports.app || {};
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
                    
                    buttonHolders.innerHTML = buttonsConfiguration.map(function(btn){
                        return '<button data-name="'+btn+'">'+btn+'</button>'
                    }).join('');
                    
                    if(slider.classList.contains('hide')){
                        slider.classList.remove('hide');
                    }
                } 
                
                // function onClick(event) {
                //     showSlider('are you sure you want to do that ?',['Yes','No'], function(button){
                //     });
                //    
                // }
                // document.querySelector('#displayButton').addEventListener('click',onClick);
                exports.app.showConfirmation = showSlider;
            })(window);
        </script>
`;
};