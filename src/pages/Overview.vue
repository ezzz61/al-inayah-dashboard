<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-cart-simple text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Tenant List</p>
              <h4 class="card-title">{{ data.tenant.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-air-baloon text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Event & promotions</p>
              <h4 class="card-title">{{ data.event.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-ruler-pencil text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Blog</p>
              <h4 class="card-title">{{ data.blog.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>Until now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-tag-content text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Tenant categories</p>
              <h4 class="card-title">{{ data.category.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">New Event & promotion</h4>
              <p class="card-category">5 newest event & promotions</p>

              <!-- <p class="card-category">24 Hours performance</p> -->
            </template>
            <l-table :data="data.event.data" :columns="tableData.columns">
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
                  {{ row.title }}
                </td>
              </template>
            </l-table>
          </card>
        </div>

        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">List Tenant Category</h4>
            </template>
            <l-table :data="data.category.data" :columns="tableData.columns">
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
              <h4 class="card-title">Tenant List</h4>
              <p class="card-category">5 tenant last added</p>
            </template>
            <l-table :data="data.tenant.data" :columns="tableData.columns">
              <!-- <template slot="columns"></template> -->
              <template slot-scope="{ row }">
                <td>
                  {{ row.name }}
                </td>
                <td>
                  <b-badge pill variant="primary">{{
                    row.category_id.name
                  }}</b-badge>
                </td>
              </template>
            </l-table>
          </card>
        </div>

        <div class="col-md-6">
          <card>
            <template slot="header">
              <h4 class="card-title">Lastest blog post</h4>
              <p class="card-category">5 Lastest blog post</p>
            </template>
            <l-table :data="data.blog.data" :columns="tableData.columns">
              <!-- <template slot="columns"></template> -->

              <template slot-scope="{ row }">
                <td class="text-muted">
                  {{
                    new Date(row.created_at).getDate().toString() +
                    " " +
                    month_name[new Date(row.created_at).getDate()] +
                    " " +
                    new Date(row.created_at).getFullYear().toString().substr(-2)
                  }}
                </td>
                <td>
                  {{ row.title }}
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
        event: {
          total: 0,
        },
        blog: {
          total: 0,
        },
        tenant: {
          total: 0,
        },
        category: {
          total: 0,
        },
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
      if (res.data.success) {
        this.data = res.data.data;
        this.isLoading = false;
      } else {
        alert("error when get the api data");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style>
</style>
