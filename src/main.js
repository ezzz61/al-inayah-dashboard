/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import VueNotify from "vue-notifyjs";
import "vue-notifyjs/themes/default.css";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import VueJwtDecode from "vue-jwt-decode";
import VueCookie from "vue-cookie";
import CKEditor from "ckeditor4-vue";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";

// router setup
import routes from "./routes/routes";

import "./registerServiceWorker";
// plugin setup
Vue.use(VueCookie);
Vue.use(VueNotify);
Vue.use(CKEditor);
Vue.use(BootstrapVue);
Vue.use(VueJwtDecode);

Vue.use(VueRouter);
Vue.use(LightBootstrap);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  mode: "history",
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (Vue.cookie.get('data_user') === null) {
//       next({
//         path: '/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let user = JSON.parse(Vue.cookie.get('data_user'))
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.role == 'admin') {
//           next()
//         }
//         else {
//           next({
//             path: '/login'
//           })
//         }
//       } else if (to.matched.some(record => record.meta.is_user)) {
//         if (user.role == 'user') {
//           next()
//         }
//         else {
//           next({
//             path: '/login'
//           })
//         }
//       }
//       else if (to.matched.some(record => record.meta.is_doctor)) {
//         if (user.role == 'dokter') {
//           next()
//         }
//         else {
//           next({
//             path: '/login'
//           })
//         }
//       }
//       else {
//         next()
//       }
//     }
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
