module.exports = (req) => {

    return `
    <style>
        #notificationPanel{
            display: block;
            position: fixed;
            bottom: -100px;
            left:0px;
            padding: 0em;
            margin:0em;
            transition: bottom 300ms;
            width: 100%;
            text-align: center;
        }
        
        #notificationPanel.show{
            bottom: 0px;
        }
        .notification-panel-content {
            display: inline-block;
            background: #444444;
            color: white;
            padding: 0.5em 1em;
            position: relative;
            font-size: 1.2em;
        }
    </style>
    <div id="notificationPanel" >
        <span class="notification-panel-content">
        </span>
    </div>
    <script>
        (function(exports){
            exports.app = exports.app || {};
            function showNotification(message){
                var notificationPanel = document.getElementById('notificationPanel');
                document.querySelector('.notification-panel-content').innerHTML = message; 
                notificationPanel.classList.add('show');
                setTimeout(function(){
                    notificationPanel.classList.remove('show');    
                },3000);
            }
            exports.app.showNotification = showNotification;
        })(window);
        
    </script>
    `
}