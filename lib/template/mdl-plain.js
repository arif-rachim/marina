module.exports = ({title,content}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css" >
    <script src="/node_modules/material-design-lite/material.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <style>
    
        .demo-ribbon {
          width: 100%;
          height: 40vh;
          background-color: #3F51B5;
          flex-shrink: 0;
        }
        
        .demo-main {
          margin-top: -35vh;
          flex-shrink: 0;
        }
        
        .demo-header .mdl-layout__header-row {
          padding-left: 40px;
        }
        
        .demo-container {
          max-width: 1600px;
          width: calc(100% - 16px);
          margin: 0 auto;
        }
        
        .demo-content {
          border-radius: 2px;
          padding: 80px 56px;
          margin-bottom: 80px;
        }
        
        .demo-layout.is-small-screen .demo-content {
          padding: 40px 28px;
        }
        
        .demo-content h3 {
          margin-top: 48px;
        }
        
        .demo-footer {
          padding-left: 40px;
        }
        
        .demo-footer .mdl-mini-footer--link-list a {
          font-size: 13px;
        }
        
    </style>
     <div class="demo-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
      <header class="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">Resource Design</span>
          <div class="mdl-layout-spacer"></div>
        </div>
      </header>
      <div class="demo-ribbon"></div>
      <main class="demo-main mdl-layout__content">
        <div class="demo-container mdl-grid">
          <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
          <div class="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
            ${content}
          </div>
        </div>
        <footer class="demo-footer mdl-mini-footer">
          <div class="mdl-mini-footer--left-section">
            <ul class="mdl-mini-footer--link-list">
              <li><a href="#">Help</a></li>
              <li><a href="#">Privacy and Terms</a></li>
              <li><a href="#">User Agreement</a></li>
            </ul>
          </div>
        </footer>
      </main>
    </div>  
</body>
</html>`;