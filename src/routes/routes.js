import DashboardLayout from "../layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";
import Login from "src/pages/Login.vue";

// Admin pages
import Overview from "src/pages/Overview.vue";
import Icons from "src/pages/Icons.vue";
import Notifications from "src/pages/Notifications.vue";

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
      {
        path: "setup",
        name: "setup",
        component: () => import("src/pages/Setup.vue")
      },
      {
        path: "pengumuman",
        name: "pengumuman",
        component: () => import("src/pages/Pengumuman/Pengumuman.vue")
      },
      {
        path: "pengumuman/add",
        name: "add_pengumuman",
        component: () => import("src/pages/Pengumuman/Add.vue")
      },
      {
        path: "pengumuman/update/:id",
        name: "update_pengumuman",
        component: () => import("src/pages/Pengumuman/Update.vue")
      },
      {
        path: "pepeling",
        name: "pepeling",
        component: () => import("src/pages/Pepeling/Pepeling.vue")
      },
      {
        path: "pepeling/add",
        name: "add_pepeling",
        component: () => import("src/pages/Pepeling/Add.vue")
      },
      {
        path: "pepeling/update/:id",
        name: "update_pepeling",
        component: () => import("src/pages/Pepeling/Update.vue")
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
        path: "calon-siswa",
        name: "calon-siswa",
        component: () => import("src/pages/CalonSiswa/CalonSiswa.vue")
      },
      {
        path: "calon-siswa/u/:id",
        name: "calon-siswa_update",
        component: () => import("src/pages/CalonSiswa/Update.vue")
      },
      {
        path: "calon-siswa/add",
        name: "calon-siswa_add",
        component: () => import("src/pages/CalonSiswa/Add.vue")
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
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
