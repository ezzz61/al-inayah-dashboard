import DashboardLayout from "../layout/DashboardLayout.vue";
import Vue from "vue";
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
    name: "login",
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/overview",
    beforeEnter(to, from, next) {
      // logic here
      // const { $cookie } = router.app.config.globalProperties;
      const data = Vue.cookie.get("data_user");
      const user = JSON.parse(data);
      if ((user && user.role === "ADMIN") || (user && user.role === "PPSB")) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },
      {
        path: "setup",
        name: "setup",
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        },
        component: () => import("src/pages/Setup.vue")
      },
      {
        path: "pengumuman",
        name: "pengumuman",
        component: () => import("src/pages/Pengumuman/Pengumuman.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "pengumuman/add",
        name: "add_pengumuman",
        component: () => import("src/pages/Pengumuman/Add.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "pengumuman/update/:id",
        name: "update_pengumuman",
        component: () => import("src/pages/Pengumuman/Update.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "pepeling",
        name: "pepeling",
        component: () => import("src/pages/Pepeling/Pepeling.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "pepeling/add",
        name: "add_pepeling",
        component: () => import("src/pages/Pepeling/Add.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "pepeling/update/:id",
        name: "update_pepeling",
        component: () => import("src/pages/Pepeling/Update.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "lembaga-pendidikan",
        name: "lembaga-pendidikan",
        component: () =>
          import("src/pages/LembagaPendidikan/LembagaPendidikan.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "lembaga-pendidikan/add",
        name: "add_lembaga-pendidikan",
        component: () => import("src/pages/LembagaPendidikan/Add.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "lembaga-pendidikan/update/:id",
        name: "update_lembaga-pendidikan",
        component: () => import("src/pages/LembagaPendidikan/Update.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },

      {
        path: "user",
        name: "User",
        component: () => import("src/pages/User/User.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "user/u/:id",
        name: "User_update",
        component: () => import("src/pages/User/Update.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
      },
      {
        path: "user/add",
        name: "User_add",
        component: () => import("src/pages/User/Add.vue"),
        beforeEnter(to, from, next) {
          // logic here
          // const { $cookie } = router.app.config.globalProperties;
          const data = Vue.cookie.get("data_user");
          const user = JSON.parse(data);
          if (user && user.role === "ADMIN") {
            next();
          } else {
            next({ name: "Overview" });
          }
        }
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
