<template>
  <div class="content">
    <div class="container-fluid">
      <p>url youtube:</p>
      <b-form-input
        v-model="url"
        placeholder="Enter url youtube"
      ></b-form-input>
      <b-button @click="handleSave" variant="outline-primary mt-2"
        >save url</b-button
      >
    </div>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import Dashboard from "@/api/DashboardApi";

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard
  },
  data() {
    return {
      url: null,
      month_name: [
        "jan",
        "feb",
        "mar",
        "apr",
        "mei",
        "jun",
        "jul",
        "aug",
        "sept",
        "okt",
        "nov",
        "des"
      ],
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      data: {
        total_event_finish: 0,
        total_event_ongoing: 0,
        total_candidate: 0,
        total_user: 0
      },

      isLoading: false,
      tableData: {
        data: [
          {
            title:
              'Sign contract for "What are conference organizers afraid of?"',
            checked: false
          },
          {
            title:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            checked: true
          },
          {
            title:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            checked: true
          },
          {
            title: "Create 4 Invisible User Experiences you Never Knew About",
            checked: false
          },
          { title: 'Read "Following makes Medium better"', checked: false },
          { title: "Unfollow 5 enemies from twitter", checked: false }
        ]
      }
    };
  },
  async created() {
    try {
      this.isLoading = true;
      let res = await Dashboard.GetUrl();
      this.data = res.data.data;
      this.url = res.data.data.url_home;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.$notify({
        message: "somehting went wrong",
        icon: "fa  fa-exclamation-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger"
      });
    }
  },
  methods: {
    async handleSave() {
      let save = await Dashboard.SaveUrl({ url: this.url });
      if (save.data.success) {
        this.$notify({
          message: "sucesss",
          icon: "fa  fa-exclamation-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
      }
    }
  }
};
</script>
<style></style>
