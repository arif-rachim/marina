const notification = require('./components/notification');

const loader = require('./components/loader');


const fixedTop = require('./panels/fixed-top');
const mainMenu = require('./panels/main-menu');
const appContent = require('./panels/app-content');
module.exports = async(req,{title,breadcrumb,content,actions}) => {
    return `
<!DOCTYPE html>
<html class="loading" lang="en" data-textdirection="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="Marina : Progressive Business App">
    <meta name="keywords" content="Marina : Progressive Business App">
    <meta name="author" content="a.arif.r@gmail.com">
    <title>Marina : Progressive Business App</title>
    <link rel="apple-touch-icon" href="/app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="/app-assets/images/ico/favicon.ico">
    <link href="/app-assets/fonts/line-awesome/css/line-awesome.min.css" rel="stylesheet">
    <!-- BEGIN VENDOR CSS-->
    <link rel="stylesheet" type="text/css" href="/app-assets/css/vendors.css">
    <!-- END VENDOR CSS-->
    <!-- BEGIN MODERN CSS-->
    <link rel="stylesheet" type="text/css" href="/app-assets/css/app.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <!-- END MODERN CSS-->
    <!-- BEGIN Page Level CSS-->
    <link rel="stylesheet" type="text/css" href="/app-assets/css/core/menu/menu-types/vertical-menu-modern.css">
    <!-- END Page Level CSS-->
    <!-- BEGIN Custom CSS-->
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <!-- END Custom CSS-->
    <script src="/svc/system.module?path=common.polyfill&name=polyfill"></script>
  </head>
  <body class="vertical-layout vertical-menu-modern 2-columns   menu-expanded fixed-navbar" data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
    
    <!-- fixed-top-->
    ${req.print(fixedTop(req))}
    
    <!-- ////////////////////////////////////////////////////////////////////////////-->
    <!-- main menu-->
    ${req.print(mainMenu(req))}
    ${req.print(appContent(req,{title,breadcrumb,content,actions}))}
    <!-- ////////////////////////////////////////////////////////////////////////////-->
    <footer class="footer footer-static footer-light navbar-border navbar-shadow">
      <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2"><span class="float-md-left d-block d-md-inline-block">Copyright  &copy; 2018 <a class="text-bold-800 grey darken-2" href="mail: a.arif.r@gmail.com" target="_blank">Arif Rachim</a>, All rights reserved. </span><span class="float-md-right d-block d-md-inline-blockd-none d-lg-block">Hand-crafted & Made with <i class="ft-heart pink"></i></span></p>
    </footer>
    ${req.print(notification(req))}
    ${req.print(loader(req))}
    <!-- BEGIN VENDOR JS-->
    <script src="/app-assets/js/core/libraries/jquery.min.js" type="text/javascript"></script>
    <script src="/app-assets/vendors/js/ui/popper.min.js" type="text/javascript"></script>
    <script src="/app-assets/js/core/libraries/bootstrap.min.js" type="text/javascript"></script>
    <script src="/app-assets/vendors/js/ui/perfect-scrollbar.jquery.min.js" type="text/javascript"></script>
    <script src="/app-assets/vendors/js/ui/unison.min.js" type="text/javascript"></script>
    <script src="/app-assets/vendors/js/ui/blockUI.min.js" type="text/javascript"></script>
    <script src="/app-assets/vendors/js/ui/jquery-sliding-menu.js" type="text/javascript"></script>
    <!-- BEGIN VENDOR JS-->
    <!-- BEGIN PAGE VENDOR JS-->
    <!-- END PAGE VENDOR JS-->
    <!-- BEGIN MODERN JS-->
    <script src="/app-assets/js/core/app-menu.js" type="text/javascript"></script>
    <script src="/app-assets/js/core/app.js" type="text/javascript"></script>
    <!-- END MODERN JS-->
    <!-- BEGIN PAGE LEVEL JS-->
    <!-- END PAGE LEVEL JS-->
  </body>
</html>`
}