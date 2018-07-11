
module.exports = (req) => {
    return `
        <style>
            .slider-panel {
                display: flex;
                position: relative;
                justify-content: center;
                overflow: hidden;
            }
            .slider-panel .slider{
                position: absolute;
                display: inline-block;
                top : 0px;
                transition: top 300ms;
                
                border: 1px solid #eeeeee;
                border-top: none;
                border-top-right-radius: 0px;
                border-top-left-radius: 0px;
            }
            .slider-panel .slider.hide{
                top: -200px;
            }
            .slider-panel .button-holders button{
                margin: 0.3em;
            }
            
        </style>
        <div style="position: relative;width: 100%;">
            <div style="position: absolute;width: 100%;">
                <div class="slider-panel" style="z-index:1">
                    <div class="card slider shadow p-2 mb-5 hide">
                        
                    </div>
                </div>
            </div>
        </div>
        
        <script path="${__filename}">
            const {subscribe} = require('../../common/pubsub');
            const slider = document.querySelector('.slider-panel .slider');
            slider.isOpen = false;
            
            const hideSlider = () => {
                slider.classList.add('hide');
                setTimeout(function(){
                    slider.style.position = 'absolute';
                    slider.isOpen = false;
                    slider.innerHTML = '';
                },200);
            };
            
            slider.showSlider = () => {
                slider.isOpen = true;    
                slider.style.position = 'relative';
                if(slider.classList.contains('hide')){
                    slider.classList.remove('hide');
                }
            };
            
            subscribe('app.slider',function(htmlPromise){
                if(slider.isOpen){
                    publish('app.notification','Its not allowed to open more than one slider, please redesign your app !');
                    return false;
                }
                return htmlPromise.then(html => {
                    return new Promise(resolve => {
                        slider.innerHTML = html;
                        slider.closeSlider = (data) => resolve(data);
                    }); 
                }).then(result => {
                    hideSlider();
                    return result;
                });                
            });
            
        </script>
        
`;
};