const {fetch} = require("../../common/net");
class Login {
    constructor(node){
        this.userName = document.getElementById('user-name');
        this.password = document.getElementById('user-password');
        this.form = node.querySelector('form');
        this.registerListener();
    }
    registerListener(){
        this.form.addEventListener('submit',this.onSubmit.bind(this));
    }
    onSubmit(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        fetch('/svc/security.login',{
            userName:this.userName.value,
            password:this.password.value
        },'POST',true)
        .then(result => {
            if(result.success){
                window.location.reload();
            }
        });
    }
}
module.exports = Login;