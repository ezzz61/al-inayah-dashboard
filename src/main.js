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
import Vueditor from "vueditor";
import Vuex from "vuex";

import "vueditor/dist/style/vueditor.min.css";

// your config here
let config = {
  toolbar: [
    "removeFormat",
    "undo",
    "|",
    "elements",
    "fontName",
    "fontSize",
    "foreColor",
    "backColor",
    "divider",
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "links",
    "divider",
    "subscript",
    "superscript",
    "divider",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "justifyFull",
    "|",
    "indent",
    "outdent",
    "insertOrderedList",
    "insertUnorderedList",
    "|",
    "picture",
    "tables",
    "|",
    "switchView"
  ],
  fontName: [
    { val: "arial black" },
    { val: "times new roman" },
    { val: "Courier New" }
  ],
  fontSize: [
    "12px",
    "14px",
    "16px",
    "18px",
    "0.8rem",
    "1.0rem",
    "1.2rem",
    "1.5rem",
    "2.0rem"
  ],
  uploadUrl: ""
};

Vue.use(Vuex);
Vue.use(Vueditor, config);

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";

// router setup
import routes from "./routes/routes";

import "./registerServiceWorker";
// plugin setup
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

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

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
