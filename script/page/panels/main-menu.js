module.exports = async (req) => {
    return `
<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
  <div class="main-menu-content">
    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
      <li class=" nav-item"><a href="/html/ltr/vertical-modern-menu-template/index.html"><i class="la la-home"></i><span class="menu-title" data-i18n="">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2">5</span></a>
      </li>
      <li class=" nav-item"><a href="#"><i class="la la-rocket"></i><span class="menu-title" data-i18n="">Starter kit</span></a>
        <ul class="menu-content">
          <li><a class="menu-item" href="layout-1-column.html" data-i18n="nav.starter_kit.1_column">1 column</a>
          </li>
          <li><a class="menu-item" href="layout-2-columns.html" data-i18n="nav.starter_kit.2_columns">2 columns</a>
          </li>
          <li><a class="menu-item" href="#" data-i18n="nav.starter_kit.3_columns_detached.main">Content Det. Sidebar</a>
            <ul class="menu-content">
              <li><a class="menu-item" href="layout-content-detached-left-sidebar.html" data-i18n="nav.starter_kit.3_columns_detached.3_columns_detached_left_sidebar">Detached left sidebar</a>
              </li>
              <li><a class="menu-item" href="layout-content-detached-left-sticky-sidebar.html" data-i18n="nav.starter_kit.3_columns_detached.3_columns_detached_sticky_left_sidebar">Detached sticky left sidebar</a>
              </li>
              <li><a class="menu-item" href="layout-content-detached-right-sidebar.html" data-i18n="nav.starter_kit.3_columns_detached.3_columns_detached_right_sidebar">Detached right sidebar</a>
              </li>
              <li><a class="menu-item" href="layout-content-detached-right-sticky-sidebar.html" data-i18n="nav.starter_kit.3_columns_detached.3_columns_detached_sticky_right_sidebar">Detached sticky right sidebar</a>
              </li>
            </ul>
          </li>
          <li class="navigation-divider"></li>
          <li><a class="menu-item" href="layout-fixed-navbar.html" data-i18n="nav.starter_kit.fixed_navbar">Fixed navbar</a>
          </li>
          <li><a class="menu-item" href="layout-fixed-navigation.html" data-i18n="nav.starter_kit.fixed_navigation">Fixed navigation</a>
          </li>
          <li><a class="menu-item" href="layout-fixed-navbar-navigation.html" data-i18n="nav.starter_kit.fixed_navbar_navigation">Fixed navbar &amp; navigation</a>
          </li>
          <li><a class="menu-item" href="layout-fixed-navbar-footer.html" data-i18n="nav.starter_kit.fixed_navbar_footer">Fixed navbar &amp; footer</a>
          </li>
          <li class="navigation-divider"></li>
          <li><a class="menu-item" href="layout-fixed.html" data-i18n="nav.starter_kit.fixed_layout">Fixed layout</a>
          </li>
          <li><a class="menu-item" href="layout-boxed.html" data-i18n="nav.starter_kit.boxed_layout">Boxed layout</a>
          </li>
          <li><a class="menu-item" href="layout-static.html" data-i18n="nav.starter_kit.static_layout">Static layout</a>
          </li>
          <li class="navigation-divider"></li>
          <li class="active"><a class="menu-item" href="layout-light.html" data-i18n="nav.starter_kit.light_layout">Light layout</a>
          </li>
          <li><a class="menu-item" href="layout-dark.html" data-i18n="nav.starter_kit.dark_layout">Dark layout</a>
          </li>
          <li><a class="menu-item" href="layout-semi-dark.html" data-i18n="nav.starter_kit.semi_dark_layout">Semi dark layout</a>
          </li>
        </ul>
      </li>
      <li class=" nav-item"><a href="changelog.html"><i class="la la-file"></i><span class="menu-title" data-i18n="">Changelog</span><span class="badge badge badge-pill badge-danger float-right">1.0</span></a>
      </li>
      <li class=" navigation-header"><span>Support</span><i class="la la-ellipsis-h ft-minus" data-toggle="tooltip" data-placement="right" data-original-title="Support"></i>
      </li>
      <li class=" nav-item"><a href="https://pixinvent.ticksy.com/"><i class="la la-support"></i><span class="menu-title" data-i18n="">Raise Support</span></a>
      </li>
      <li class=" nav-item"><a href="https://pixinvent.com/modern-admin-clean-bootstrap-4-dashboard-html-template/documentation"><i class="la la-folder"></i><span class="menu-title" data-i18n="">Documentation</span></a>
      </li>
    </ul>
  </div>
</div>
`;
}