<template>
  <div class="content">
    <div class="container-fluid">
      <!-- widget -->
      <div class="row">
        <!-- Pepeling -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bullet-list-67 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Pepeling Kahirupan</p>
              <h4 class="card-title">{{ data.pepeling.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <!-- Pengumuman -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bullet-list-67 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Pengumuman</p>
              <h4 class="card-title">{{ data.pengumuman.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <!-- calon Siswa -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-grid-45 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Calon Siswa</p>
              <h4 class="card-title">{{ data.calonSiswa.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>

        <!-- User -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-single-02 text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">User total</p>
              <h4 class="card-title">{{ data.user.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
      </div>

      <!-- calon siswa -->
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Calon Siswa Terbaru</h4>
            </template>
            <l-table
              :data="data.calonSiswa.data"
              :columns="[
                'NISN',
                'Nama',
                'Asal Sekolah',
                'Email',
                'Mendaftar Pada',
              ]"
            >
              <template slot-scope="{ row }">
                <td>
                  {{ row.no_nisn }}
                </td>
                <td>
                  {{ row.nama }}
                </td>
                <td>
                  {{ row.nama_sekolah_asal }}
                </td>
                <td>
                  {{ row.email }}
                </td>
                <td class="text-muted">
                  {{
                    new Date(row.createdAt).getDate().toString() +
                    " " +
                    month_name[new Date(row.createdAt).getMonth()] +
                    " " +
                    new Date(row.createdAt).getFullYear().toString().substr(-2)
                  }}
                </td>
              </template>
            </l-table>
          </card>
        </div>
      </div>

      <!-- pepeling pengumuman user -->
      <div class="row">
        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Pepeling Terbaru</h4>
            </template>
            <l-table :data="data.pepeling.data" :columns="['Judul', 'Tanggal']">
              <!-- <template slot="columns"></template> -->
              <template slot-scope="{ row }">
                <td>
                  {{ row.title }}
                </td>
                <td>
                  {{
                    new Date(row.createdAt).getDate().toString() +
                    " " +
                    month_name[new Date(row.createdAt).getMonth()] +
                    " " +
                    new Date(row.createdAt).getFullYear().toString().substr(-2)
                  }}
                </td>
              </template>
            </l-table>
          </card>
        </div>

        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Pengumuman Terbaru</h4>
            </template>
            <l-table
              :data="data.pengumuman.data"
              :columns="['Judul', 'Tanggal']"
            >
              <!-- <template slot="columns"></template> -->
              <template slot-scope="{ row }">
                <td>
                  {{ row.title }}
                </td>
                <td>
                  {{
                    new Date(row.createdAt).getDate().toString() +
                    " " +
                    month_name[new Date(row.createdAt).getMonth()] +
                    " " +
                    new Date(row.createdAt).getFullYear().toString().substr(-2)
                  }}
                </td>
              </template>
            </l-table>
          </card>
        </div>

        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">User Terbaru</h4>
            </template>
            <l-table :data="data.user.data" :columns="['Email']">
              <template slot="columns"></template>
              <template slot-scope="{ row }">
                <td>
                  {{ row.email }}
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
        user: { data: [], total: "" },
        pepeling: { data: [], total: "" },
        calonSiswa: { data: [], total: "" },
        pengumuman: { data: [], total: "" },
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

      if (res.data.data.status === 200) {
        const { user, pepeling, calonSiswa, pengumuman } = res.data.data.data;
        this.data.user = user;
        this.data.pepeling = pepeling;
        this.data.calonSiswa = calonSiswa;
        this.data.pengumuman = pengumuman;
        console.log(this.data);
      }
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
<style></style>
