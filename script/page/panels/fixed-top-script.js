const {fetch} = require('../../common/net');

class FixedTop{
    constructor(node){
        this.node = node;
        this.registerListener();
    }
    registerListener(){
        this.node.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click',this.onItemClicked.bind(this));
        })
    }
    onItemClicked(event){
        if(event.target.innerText === 'Logout'){
            this.logout();
        }
        if(event.target.innerText === 'Edit Profile'){

        }
    }
    logout(){
        fetch(`/svc/security.logout`).then(response => {
            if(response.success){
                window.location.reload();
            }
        });
    }
}
module.exports = FixedTop;