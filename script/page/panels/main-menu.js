
const {fetch} = require('../../../config');

const printMenuItem = item => {
    return `
<li class="${item.active ? 'active' : ''}">
    <a class="menu-item" href="${item.path}" data-i18n="">${item.title}</a>
    ${item.children ? printMenuContent(item.children) : ''}
</li>
`
};

const printMenuContent = (children) => {
    return`
<ul class="menu-content">
    ${children ? children.map(printMenuItem).join('') : ''}
</ul>
    `
};

const printNavigationHeader = (title) => {
    return `
<li class=" navigation-header">
    <span>${title}</span>
    <i class="la la-ellipsis-h ft-minus" data-toggle="tooltip" data-placement="right" data-original-title="${title}"></i>
</li>      
    `;
};

const navigationItem = ({path,icon,title,badge,children,type}) => {
    if(type && type === 'nav-header'){
        return printNavigationHeader(title)
    }
    return `
<li class="nav-item">
    <a href="${path}">
        <i class="la ${icon}"></i>
        <span class="menu-title" data-i18n="">${title}</span>
        ${badge ? '' : '<!--'}
        <span class="badge badge badge-info badge-pill float-right mr-2">${badge}</span>
        ${badge ? '' : '-->'}
    </a>
    ${children ? printMenuContent(children) : ''}
</li>
    `;
};


const menuItems = (menus) => {
    return [
        {
            path: '/page/dashboard',
            icon: 'la-home',
            title: 'Dashboard',
            badge: 5
        },
        {
            path: '#',
            icon: 'la-file-text-o',
            title: 'Forms',
            active: false,
            children: menus
        },
        {type: 'nav-header', title: 'Support'},
        {
            icon: 'la-support',
            path: 'https://pixinvent.ticksy.com/',
            title: 'Raise Support'
        },
        {
            icon: 'la-folder',
            path: 'https://pixinvent.com/modern-admin-clean-bootstrap-4-dashboard-html-template/documentation',
            title: 'Documentation'
        }

    ];
}

module.exports = async (req) => {


    const forms = await fetch('/res/system_forms');
    const items = forms.docs.reduce((result,next,index) => {
        if(result.keys.indexOf(next.name) < 0){
            result.keys.push(next.name);
            result.items.push(next);
        }
        return result;
    },{keys:[],items : []}).items.map(form => {
        const path = `/res/${form.name}?intent=grid-html`;
        return {
            title : form.label,
            path : path,
            active : req.originalUrl === path
        }
    });


    return `
<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
  <div class="main-menu-content">
    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
      ${menuItems(items).map(navigationItem).join('')}
    </ul>
  </div>
</div>
`;
}