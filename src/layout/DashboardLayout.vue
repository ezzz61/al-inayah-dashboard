<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>

      <sidebar-link v-if="role === 'ADMIN'" to="/admin/pepeling">
        <i class="nc-icon nc-caps-small"></i>
        <p>Pepeling Kahirupan</p>
      </sidebar-link>

      <sidebar-link v-if="role === 'ADMIN'" to="/admin/pengumuman">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Pengumuman</p>
      </sidebar-link>

      <sidebar-link v-if="role === 'ADMIN'" to="/admin/lembaga-pendidikan">
        <i class="nc-icon nc-istanbul"></i>
        <p>Lembaga pendidikan</p>
      </sidebar-link>

      <sidebar-link to="/admin/calon-siswa">
        <i class="nc-icon nc-single-02"></i>
        <p>Calon Siswa</p>
      </sidebar-link>

      <sidebar-link v-if="role === 'ADMIN'" to="/admin/user">
        <i class="nc-icon nc-single-02"></i>
        <p>User</p>
      </sidebar-link>

      <sidebar-link v-if="role === 'ADMIN'" to="/admin/setup">
        <i class="nc-icon nc-settings-gear-64"></i>
        <p>Setup</p>
      </sidebar-link>
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
      data: null,
    };
  },
  created() {
    let data = this.$cookie.get("data_user");
    this.data = JSON.parse(data);
    // if (localStorage.getItem("data_user") && localStorage.getItem("token")) {
    //   if (token !== null && data.role == "admin") {
    //     this.role = "admin";
    //   } else if (token !== null && data.role == "super admin") {
    //     this.role = "super admin";
    //   }
    // } else {
    //   this.$router.push({ path: "/login" });
    // }

    // if (data.username === null) {
    //   this.$notify({
    //     message: "please login again",
    //     icon: "fa fa-sign-in-alt",
    //     horizontalAlign: "right",
    //     verticalAlign: "top",
    //     type: "warning"
    //   });

    //   this.$router.push({ path: "/login" });
    // }
    this.name = this.data.email;
    this.role = this.data.role;
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
