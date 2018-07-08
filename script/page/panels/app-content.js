
const printBreadCrumb = (crumb, index, arrays) =>{
    return `<li class="breadcrumb-item ${index === arrays.length - 1 ? 'active' : ''}">${crumb.path ? '<a href="'+crumb.path+'">' : ''} ${crumb.label}${crumb.path? '</a>' : ''}</li>`
};

module.exports = async (req,{title,breadcrumb = [],content}) => {
    return `
<div class="app-content content">
  <div class="content-wrapper">
    <div class="content-header row">
      <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
        <h3 class="content-header-title mb-0 d-inline-block">${title}</h3>
        <div class="row breadcrumbs-top d-inline-block">
          <div class="breadcrumb-wrapper col-12">
            <ol class="breadcrumb">
              ${breadcrumb.map(printBreadCrumb).join('')}
            </ol>
          </div>
        </div>
      </div>
      <div class="content-header-right col-md-6 col-12">
        <div class="dropdown float-md-right">
          <button class="btn btn-danger dropdown-toggle round btn-glow px-2" id="dropdownBreadcrumbButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
          <div class="dropdown-menu" aria-labelledby="dropdownBreadcrumbButton"><a class="dropdown-item" href="#"><i class="la la-calendar-check-o"></i> Calender</a><a class="dropdown-item" href="#"><i class="la la-cart-plus"></i> Cart</a><a class="dropdown-item" href="#"><i class="la la-life-ring"></i> Support</a>
            <div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="la la-cog"></i> Settings</a>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
    ${content}
    </div>
  </div>
</div>
    `;
};