
window.app = window.app || {};

const componentIsRegistered = {};
const nodesToRegister = {};
const modules = {};

window.app.onScriptReady = ({module,path}) => {
    const component = path;
    modules[component] = module;
    if(nodesToRegister[component] && nodesToRegister[component].length > 0){
        nodesToRegister[component].forEach(node => {
            new module(node);
        });
    }
    delete nodesToRegister[component];

};

const registerComponent = (component,node) => {

    if(component in modules){
        const module = modules[component];
        new module(node);
    }else{
        nodesToRegister[component] = nodesToRegister[component] || [];
        nodesToRegister[component].push(node);
        if(!(component in componentIsRegistered)){
            const script = document.createElement('script');
            script.src = `/svc/system.module?path=${component}&name=app&callback=window.app.onScriptReady`;
            document.body.appendChild(script);
            componentIsRegistered[component] = true;
        }
    }

}

// here we are introducing mutation observer for firing load when an event is added to panel
const mutationObserver = new MutationObserver(mutationList => {
    mutationList.forEach(mutation => {
        if(mutation.type == 'childList'){
            mutation.addedNodes.forEach(node => {
                if('getAttribute' in node){
                    const component = node.getAttribute('is');
                    if(component){
                        registerComponent(component,node);
                    }
                }
            });
        }
    });
});

window.addEventListener('load',function(){
    mutationObserver.observe(document.body,{childList:true,subtree:true});
    document.querySelectorAll('[is]').forEach(function (node) {
        const component = node.getAttribute('is');
        if(component){
            registerComponent(component,node);
        }
    })
});
