const {fetch} = require('../../../config');
const html = require('../html');
module.exports = (req,res) => {
    const resource = req.params.resource;
    return html(req,`
<div class="hello-world">Hello Worlds</div>
<script type="es6">

    const {fetch} = require('../../common/net');
    
    const getUsers = () => {
        return fetch('/res/${resource}');
    };
    
    getUsers().then(users => {
        document.querySelector('.hello-world').innerHTML = '<ul>'+users.docs.map(user => {
            return '<li>'+user.name+'</li>';
        }).join('')+'</ul>';
    });
</script>
`);
};