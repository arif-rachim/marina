const theme = require('./theme');

const card = require('./panels/card');

const kickStart = async(req) => {
    return card(req,{title : 'Kick start your project development !',content : `
<p>Getting start with your project custom requirements using a ready template which is quite difficult and time taking process, Modern Admin provides useful features to kick start your project development with no efforts !</p>
<ul>
    <li>Modern Admin provides you getting start pages with different layouts, use the layout as per your custom requirements and just change the branding, menu & content.</li>
    <li>It use PUG as template engine to generate pages and whole template quickly using node js. You can generate entire template with your selected custom layout, branding & menu. Save your time for doing the common changes for
        each page (i.e menu, branding and footer) by generating template with pug.</li>
    <li>Every components in Modern Admin are decoupled, it means use use only components you actually need! Remove unnecessary and extra code easily just by excluding the path to specific SCSS, JS file.</li>
</ul>
`})
};

const whatIs = async(req) => {
    return card(req,{title:'What is Starter Kit',content: `
<p>Starter kit is a set of pages with different layouts, useful for your next project to start development process from scratch with no time. </p>
<ul>
    <li>Each layout includes basic components only.</li>
    <li>Select your choice of layout from starter kit, customize it with optional changes like colors and branding, add required dependency only.</li>
    <li>Using PUG as template engine to generate whole template quickly with your selected layout and other custom changes.</li>
</ul>
`})
};

const howTo = async(req) => {
    return card(req,{title:'How To use Starter Kit',content: `
<p><span class="text-bold-600 mt-2">HTML</span></p>
<p>If you know just HTML, select your choice of layout from starter kit folder, customize it with optional changes like colors and branding, add required dependency only.</p>
<p><span class="text-bold-600 mt-2">PUG</span></p>
<p>To use PUG it required node.js and basic knowledge of using it. Using PUG as template engine to generate whole template quickly with your selected layout and other custom changes. To getting start with PUG usage & template generating process please refer template documentation.</p>
<div class="alert alert-icon-left alert-arrow-left alert-info mb-2" role="alert">
    <span class="alert-icon"><i class="la la-info"></i></span>
    <h4>Tip!</h4>
    <p>Hideable navbar option is available for fixed navbar with static navigation only. Works in top and bottom positions, single and multiple navbars.</p>
</div>
`});
};

const withHeader = async (req) => {
    return card(req,{title:'With Header',headerBorder : true, content : `
<h4 class="card-title">Content title</h4>
<p class="card-text">Add a heading to card with <code>.card-header </code> class &amp; content title uses <code>.card-title</code> class. For border add <code>.border-top-COLOR</code> class</p>
<p class="card-text">You may also include any &lt;h1&gt;-&lt;h6&gt; with a <code>.card-header </code> &amp; <code>.card-title</code> class to add heading.</p>
<p class="card-text">Jelly beans sugar plum cheesecake cookie oat cake soufflé. Tart lollipop carrot cake sugar plum. Marshmallow wafer tiramisu jelly beans.</p>
`});
};

const withHeaderNoBorder = async (req) => {
    return card(req,{title:'With Header &amp; No Border',content:  `
<div class="card-body">
    <h4 class="card-title">Content title</h4>
    <p class="card-text">Add a heading to card with <code>.card-header </code> class &amp; content title uses <code>.card-title</code> class.</p>
    <p class="card-text">You may also include any &lt;h1&gt;-&lt;h6&gt; with a <code>.card-header </code> &amp; <code>.card-title</code> class to add heading.</p>
    <p class="card-text">Gingerbread brownie sweet roll cheesecake chocolate cake jelly beans marzipan gummies dessert. Jelly beans sugar plum cheesecake cookie oat cake soufflé.</p>
</div>
`})
};


const simpleCard = async(req) => {
    return card(req,{title : 'Simple Card',content : `
<h5>HTML Ipsum Presents</h5>
<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
    semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
    fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
<h6>Header Level 2</h6>

<ol>
    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
    <li>Aliquam tincidunt mauris eu risus.</li>
</ol>

<blockquote>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada
        tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p>
</blockquote>

<h3>Header Level 3</h3>

<ul>
    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
    <li>Aliquam tincidunt mauris eu risus.</li>
</ul>

<pre><code class="language-css">
    #header h1 a { 
        display: block; 
        width: 300px; 
        height: 80px; 
    }
</code></pre>
<dl>
    <dt>Definition list</dt>
    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
    <dt>Lorem ipsum dolor sit amet</dt>
    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
</dl>
`});
};

const printContent = (req) => {
    return `
<section class="row">
    <div class="col-sm-12">
        <!-- Kick start -->
        ${req.print(kickStart(req))}
        <!--/ Kick start -->

        <!-- What is-->
        ${req.print(whatIs(req))}
        <!--/ What is-->

        <!-- How to-->
        ${req.print(howTo(req))}
        <!--/ How to-->

        <!-- Simple Card-->
        ${req.print(simpleCard(req))}
        <!--/ How to-->
    </div>
</section>

<section class="row">
    <div class="col-md-6 col-sm-12">
        ${req.print(withHeader())}
    </div>
    <div class="col-md-6 col-sm-12">
        ${req.print(withHeaderNoBorder())}
    </div>
</section>
    `
};

module.exports = async(req,res) => {
    return theme(req,{
        title : 'Light Layout',
        breadcrumb : [
            {title: 'Home',path:'index.html'},
            {title: 'Starters Kit',path:'#'},
            {title: 'Light Layout',path:''}
        ],
        content : printContent(req)
    })
}