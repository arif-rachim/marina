
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


const menuItems = [
    {
        path : '/html/ltr/vertical-modern-menu-template/index.html',
        icon : 'la-home',
        title : 'Dashboard',
        badge : 5
    },
    {
        path : '#',
        icon : 'la-rocket',
        title : 'Starter kit',
        active : false,
        children : [
            {
                path : '#',
                title : '1 column',
                active : false
            },
            {
                path : '#',
                title : '2 column',
                active : false
            },
            {
                path : '#',
                title : 'Content Det. Sidebar',
                active : false,
                children : [
                    {
                        path : '#',
                        title : 'Detached left sidebar',
                        active : false
                    },
                    {
                        path : '#',
                        title : 'Detached sticky left sidebar',
                        active : false
                    },
                    {
                        path : '#',
                        title : 'Detached right sidebar',
                        active : false
                    },
                    {
                        path : '#',
                        title : 'Detached sticky right sidebar',
                        active : false
                    },
                ]
            },
            {
                path : '#',
                title : 'Fixed navbar',
                active : false
            },
            {
                path : '#',
                title : 'Fixed navigation',
                active : false
            },
            {
                path : '#',
                title : 'Fixed navbar & navigation',
                active : false
            },
            {
                path : '#',
                title : 'Fixed navbar & footer',
                active : false
            },
            {
                path : '#',
                title : 'Fixed layout',
                active : false
            },
            {
                path : '#',
                title : 'Boxed layout',
                active : false
            },
            {
                path : '#',
                title : 'Static layout',
                active : false
            },
            {
                path : '#',
                title : 'Light layout',
                active : true
            },
            {
                path : '#',
                title : 'Dark layout',
                active : false
            },
            {
                path : '#',
                title : 'Semi dark layout',
                active : false
            },

        ]
    },
    {type:'nav-header',title:'Support'},
    {
        icon:'la-support',
        path : 'https://pixinvent.ticksy.com/',
        title : 'Raise Support'
    },
    {
        icon:'la-folder',
        path : 'https://pixinvent.com/modern-admin-clean-bootstrap-4-dashboard-html-template/documentation',
        title : 'Documentation'
    }

];

module.exports = async (req) => {
    return `
<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
  <div class="main-menu-content">
    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
      ${menuItems.map(navigationItem).join('')}
    </ul>
  </div>
</div>
`;
}