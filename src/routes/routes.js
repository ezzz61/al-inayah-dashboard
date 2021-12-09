import DashboardLayout from "../layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";
import Login from "src/pages/Login.vue";

// Admin pages
import Overview from "src/pages/Overview.vue";

import TableList from "src/pages/TableList.vue";
import Typography from "src/pages/Typography.vue";
import Icons from "src/pages/Icons.vue";
import Maps from "src/pages/Maps.vue";
import Notifications from "src/pages/Notifications.vue";
import Upgrade from "src/pages/Upgrade.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/admin/overview"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },

      // {
      //   path: 'tenant',
      //   name: 'result',
      //   component: () => import('src/pages/Tenant/Tenant.vue'),

      // },
      // {
      //   path: 'tenant/add',
      //   name: 'add_tenant',
      //   component: () => import('src/pages/Tenant/Add.vue'),

      // },
      // {
      //   path: 'tenant/update/:id',
      //   name: 'update_tenant',
      //   component: () => import('src/pages/Tenant/Update.vue'),

      // },

      {
        path: "Category",
        name: "Category",
        component: () => import("src/pages/Category/Category.vue")
      },
      {
        path: "Category/add",
        name: "add_Category",
        component: () => import("src/pages/Category/Add.vue")
      },
      {
        path: "Category/update/:id",
        name: "update_Category",
        component: () => import("src/pages/Category/Update.vue")
      },
      {
        path: "Ads",
        name: "Ads",
        component: () => import("src/pages/Ads/Ads.vue")
      },
      {
        path: "Ads/add",
        name: "add_Ads",
        component: () => import("src/pages/Ads/Add.vue")
      },
      {
        path: "Ads/update/:id",
        name: "update_ads",
        component: () => import("src/pages/Ads/Update.vue")
      },
      {
        path: "Article",
        name: "Article",
        component: () => import("src/pages/Article/Article.vue")
      },
      {
        path: "Article/add",
        name: "add_Article",
        component: () => import("src/pages/Article/Add.vue")
      },
      {
        path: "Article/update/:id",
        name: "update_Article",
        component: () => import("src/pages/Article/Update.vue")
      },
      {
        path: "Babes",
        name: "NiagaBabes",
        component: () => import("src/pages/NiagaBabes/NiagaBabes.vue")
      },
      {
        path: "Babes/add",
        name: "add_NiagaBabes",
        component: () => import("src/pages/NiagaBabes/Add.vue")
      },
      {
        path: "Babes/update/:id",
        name: "update_NiagaBabes",
        component: () => import("src/pages/NiagaBabes/Update.vue")
      },
      {
        path: "articletag",
        name: "articletag",
        component: () => import("src/pages/ArticleTags/Tag.vue")
      },
      {
        path: "articletag/add",
        name: "add_articletag",
        component: () => import("src/pages/ArticleTags/Add.vue")
      },
      {
        path: "articletag/update/:id",
        name: "update_articletag",
        component: () => import("src/pages/ArticleTags/Update.vue")
      },

      {
        path: "user",
        name: "User",
        component: () => import("src/pages/User/User.vue")
      },
      {
        path: "user/u/:id",
        name: "User_update",
        component: () => import("src/pages/User/Update.vue")
      },
      {
        path: "user/add",
        name: "User_add",
        component: () => import("src/pages/User/Add.vue")
      },
      {
        path: "table-list",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
