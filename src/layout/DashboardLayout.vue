<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/category">
        <i class="nc-icon nc-square-pin"></i>
        <p>Category</p>
      </sidebar-link>
      <sidebar-link to="/admin/articletag">
        <i
          class="nc-icon nc-tag-content

"
        ></i>
        <p>Article Tag</p>
      </sidebar-link>
      <sidebar-link to="/admin/article">
        <i
          class="nc-icon       nc-bullet-list-67

"
        ></i>
        <p>Article</p>
      </sidebar-link>

      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-single-02"></i>
        <p>User</p>
      </sidebar-link>
      <sidebar-link to="/admin/ads">
        <i class="nc-icon nc-tag-content"></i>
        <p>Ads</p>
      </sidebar-link>
      <sidebar-link to="/admin/babes">
        <i class="nc-icon nc-satisfied"></i>
        <p>Babes</p>
      </sidebar-link>
      <sidebar-link to="/admin/setup">
        <i class="nc-icon nc-settings-tool-66"></i>
        <p>Setup</p>
      </sidebar-link>

      <!-- <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar :name="name"></top-navbar>

      <dashboard-content @click="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  data() {
    return {
      name: "",
      role: "",
      data: null
    };
  },
  created() {
    let token = this.$cookie.get("token");
    let data = JSON.parse(this.$cookie.get("data_user"));
    this.data = data;
    if (this.$cookie.get("data_user") && this.$cookie.get("token")) {
      if (token !== null && data.role == "admin") {
        this.role = "admin";
      } else if (token !== null && data.role == "super admin") {
        this.role = "super admin";
      }
    } else {
      this.$router.push({ path: "/login" });
    }

    if (data.username === null) {
      this.$notify({
        message: "please login again",
        icon: "fa fa-sign-in-alt",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "warning"
      });

      this.$router.push({ path: "/login" });
    }
    this.name = data.email;
  },

  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
