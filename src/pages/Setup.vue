<template>
  <div class="content">
    <div class="container-fluid">
      <p>url youtube:</p>
      <div v-for="(data, i) in url" :key="i">
        <b-form-input
          v-if="i == 0"
          v-model="url[i]"
          placeholder="Enter url youtube"
        ></b-form-input>
        <b-input-group v-else class="mt-3">
          <template #append>
            <b-input-group-text style="cursor:pointer" @click="Remove(i)"
              ><strong class="text-danger">X</strong></b-input-group-text
            >
          </template>
          <b-form-input
            placeholder="Enter url youtube"
            v-model="url[i]"
          ></b-form-input>
        </b-input-group>
      </div>

      <b-button class="text-center mt-2" @click="Addmore">add more</b-button>
      <br />
      <b-button @click="handleSave" class="outline-primary mt-2"
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
      url: [""],
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

      this.url = res.data.data.video_url ? res.data.data.video_url : [""];
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
    Addmore() {
      this.url.push(null);
    },
    Remove(index) {
      this.url.splice(index, 1);
    },
    async handleSave() {
      let url_data = this.url.filter(el => el != null);
      let save = await Dashboard.SaveUrl({ url: url_data });
      console.log(url_data);
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
