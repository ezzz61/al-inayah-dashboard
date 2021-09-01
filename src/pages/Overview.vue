<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bullet-list-67 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Running Event total</p>
              <h4 class="card-title">{{ data.total_event_ongoing }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-circle-09 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Candidate total</p>
              <h4 class="card-title">{{ data.total_candidate }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-check-2 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Finish event</p>
              <h4 class="card-title">{{ data.total_event_finish }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>Until now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-single-02 text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">User total</p>
              <h4 class="card-title">{{ data.total_user }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">New Event</h4>
              <p class="card-category">5 newest event</p>

              <!-- <p class="card-category">24 Hours performance</p> -->
            </template>
            <l-table
              :data="data.new_event"
              :columns="['created date', 'event name']"
            >
              <template slot-scope="{ row }">
                <td class="text-muted">
                  {{
                    new Date(row.created_at).getDate().toString() +
                    " " +
                    month_name[new Date(row.created_at).getMonth()] +
                    " " +
                    new Date(row.created_at).getFullYear().toString().substr(-2)
                  }}
                </td>
                <td>
                  {{ row.name }}
                </td>
              </template>
            </l-table>
          </card>
        </div>

        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Candidate Lastest added</h4>
            </template>
            <l-table :data="data.candidate_last" :columns="['name']">
              <template slot="columns"></template>
              <template slot-scope="{ row }">
                <td>
                  {{ row.name }}
                </td>
              </template>
            </l-table>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <card>
            <template slot="header">
              <h4 class="card-title">List Kelurahan</h4>
            </template>
            <l-table :data="data.kelurahan" :columns="tableData.columns">
              <!-- <template slot="columns"></template> -->
              <template slot-scope="{ row }">
                <td>
                  {{ row }}
                </td>
              </template>
            </l-table>
          </card>
        </div>

        <div class="col-md-6">
          <card>
            <template slot="header">
              <h4 class="card-title">Sumary Event running</h4>
            </template>
            <l-table
              :data="data.sumary_event"
              :columns="['event name', 'total candidates']"
            >
              <!-- <template slot="columns"></template> -->

              <template slot-scope="{ row }">
                <td class="text-muted">
                  {{ row.event.name }}
                </td>
                <td>
                  {{ row.count_candidate }}
                </td>
              </template>
            </l-table>
          </card>
        </div>
      </div>
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
    StatsCard,
  },
  data() {
    return {
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
        "des",
      ],
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      data: {
        total_event_finish: 0,
        total_event_ongoing: 0,
        total_candidate: 0,
        total_user: 0,
      },

      isLoading: false,
      tableData: {
        data: [
          {
            title:
              'Sign contract for "What are conference organizers afraid of?"',
            checked: false,
          },
          {
            title:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            checked: true,
          },
          {
            title:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            checked: true,
          },
          {
            title: "Create 4 Invisible User Experiences you Never Knew About",
            checked: false,
          },
          { title: 'Read "Following makes Medium better"', checked: false },
          { title: "Unfollow 5 enemies from twitter", checked: false },
        ],
      },
    };
  },
  async created() {
    try {
      this.isLoading = true;
      let res = await Dashboard.Get();
      this.data = res.data.data;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.$notify({
        message: "somehting went wrong",
        icon: "fa  fa-exclamation-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger",
      });
    }
  },
};
</script>
<style>
</style>
