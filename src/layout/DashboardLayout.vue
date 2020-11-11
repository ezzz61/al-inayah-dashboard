<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/floor">
        <i class="nc-icon nc-square-pin"></i>
        <p>Floor</p>
      </sidebar-link>
      <sidebar-link to="/admin/category">
        <i class="nc-icon nc-tag-content"></i>
        <p>Category</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-cart-simple"></i>
        <p>Tenant</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-air-baloon"></i>
        <p>Event & Promotion</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-ruler-pencil"></i>
        <p>Blog</p>
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
<style lang="scss">
</style>
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
    };
  },
  created() {
    let token = this.$cookie.get("token");
    let data = JSON.parse(this.$cookie.get("data_user"));
    this.name = data.username;
    if (token !== null && data.role == "admin") {
      this.role = "admin";
    } else if (token !== null && data.role == "super admin") {
      this.role = "super admin";
    } else {
      this.$router.push({ path: "/login" });
    }
  },
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
