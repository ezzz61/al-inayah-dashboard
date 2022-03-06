<template>
  <b-container fluid>
    <notifications> </notifications>
    <b-row class="mt-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              v-model="sortBy"
              id="sortBySelect"
              :options="sortOptions"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
        <div class="row justify-content-center">
          <div class="col-6">
            <button
              class="btn btn-icon btn-primary btn-fill"
              @click="$router.push({ path: '/admin/calon-siswa/add' })"
            >
              Tambah Calon Siswa
            </button>
          </div>
          <div class="col-6">
            <div class="mb-2">
              <input
                v-model="namaFile"
                maxlength="30"
                type="text"
                placeholder="Masukkan nama file..."
              />
            </div>
            <download-excel
              :stringifyLongNum="true"
              class="btn btn-success btn-disabled"
              :data="selected"
              :fields="json_fields"
              worksheet="My Worksheet"
              :name="`${namaFile.length ? namaFile : 'filename.xls'}`"
            >
              Export To Excel
            </download-excel>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button class="btn btn-secondary" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter by year"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="yearFilter"
              @keypress="onlyNumber"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                class="btn btn-primary"
                @click="getCalonSiswa(yearFilter)"
                >Search</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div class="row justify-content-center">
      <div class="col-12">
        <card
          class="strpied-tabled-with-hover"
          body-classes="table-full-width table-responsive"
        >
          <LoadingTable v-if="isLoading" />
          <b-table
            :busy="isBusy"
            v-if="!isLoading"
            show-empty
            class="ml-2"
            stacked="md"
            :items="calonSiswaData"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            ref="selectableTable"
            :select-mode="selectMode"
            selectable
            @row-selected="onRowSelected"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <!-- Example scoped slot for select state illustrative purposes -->
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
            <template #cell(actions)="row">
              <button
                class="btn btn-icon btn-info mx-1"
                @click="
                  $router.push({
                    name: 'calon-siswa_update',
                    params: { id: row.item._id },
                  })
                "
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-icon btn-danger mx-1"
                @click="info(row.item, row.index, $event.target)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </template>
          </b-table>
        </card>
      </div>
    </div>
    <div class="row justify-content-between">
      <b-col sm="5" md="3" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </div>
    <!-- Info modal -->
    <b-modal
      @ok="handleOk(infoModal.content)"
      :id="infoModal.id"
      :title="'Delete ' + infoModal.title"
      @hide="resetInfoModal"
    >
      <pre>
  are you sure want to delete <strong>{{ infoModal.title }} </strong>from Calon Siswa list ?</pre>
    </b-modal>
  </b-container>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import LoadingTable from "src/components/LoadingTable.vue";
import calonSiswaApi from "@/api/CalonSiswaApi";
import moment from "moment";

export default {
  components: {
    Card,
    LoadingTable,
  },
  data() {
    return {
      yearFilter: "",
      isBusy: true,
      moment: moment,
      selectMode: "multi",
      selected: [],
      success: false,
      calonSiswaData: [],
      namaFile: "",
      json_fields: {
        "Mendaftar Pada": "createdAt",
        NISN: {
          field: "no_nisn",
          callback: (value) => {
            return `${value} `;
          },
        },
        "Nama Lengkap": "nama",
        "Tanggal Lahir": "tanggal_lahir",
        "Jenis Kelamin": "jenis_kelamin",
        "No Hp": {
          field: "no_telpon",
          callback: (value) => {
            return `+62${value.slice(1)}`;
          },
        },
        "E-Mail": "email",
        Alamat: "alamat",
        "Lembaga Tujuan": "lembaga_tujuan",
        "Sekolah Asal": "nama_sekolah_asal",
        "Tahun Kelulusan": "tahun_kelulusan",
        "Nilai Rata-Rata": "nilai_rata_rata",
        "Nama Ayah": "nama_ayah",
        "Pekerjaan Ayah": "pekerjaan_ayah",
        "Nama Ibu": "nama_ibu",
        "Pekerjaan Ibu": "pekerjaan_ibu",
        "Nama Wali": "nama_wali",
        "Pekerjaan Wali": "pekerjaan_wali",
      },
      isLoading: false,
      failed: false,
      type: ["success", "danger"],
      notifications: {
        topCenter: false,
      },
      fields: [
        "selected",
        {
          key: "createdAt",
          label: "Mendaftar pada",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "no_nisn",
          label: "NISN",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nama",
          label: "Nama Lengkap",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "jenis_kelamin",
          label: "Jenis Kelamin",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nama_sekolah_asal",
          label: "Nama Sekolah Asal",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "lembaga_tujuan",
          label: "Lembaga Tujuan",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nilai_rata_rata",
          label: "Nilai Rata Rata",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.totalRows = this.items.length;
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    onlyNumber($event) {
      const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const keyPressed = $event.key;
      if (!keysAllowed.includes(keyPressed)) {
        $event.preventDefault();
      }
    },
    notifyVue() {
      const notification = {
        template: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`,
      };
      this.$notify({
        message: "success",
        icon: "fa fa-check-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "success",
      });
    },
    async handleOk(id) {
      this.success = false;
      this.failed = false;

      try {
        let res = await calonSiswaApi.Delete(id);
        if (res.data.status === 200) {
          this.success = true;
          this.notifyVue();
          this.getCalonSiswa();
        } else {
          this.failed = true;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    handleEdit(row) {
      alert(`You want to edit row with id: ${row.item._id}`);
    },
    handleDelete(row) {
      alert(`You want to delete row with id: ${row.item._id}`);
    },
    info(item, index, button) {
      this.infoModal.title = `${item.nama}`;
      this.infoModal.content = item._id;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getCalonSiswa() {
      try {
        this.isLoading = true;
        let res;
        if (this.yearFilter) {
          res = await calonSiswaApi.Get(this.yearFilter);

          console.log(res);
        } else {
          res = await calonSiswaApi.Get();
        }

        const calonSiswa = res.data.data.data;
        let filtredCalonSiswa = [];

        // change date type
        calonSiswa.map((siswa) => {
          filtredCalonSiswa.push({
            ...siswa,
            no_nisn: siswa.no_nisn.toString(),
            createdAt: this.moment(siswa.createdAt).format("DD-MM-YYYY"),
            tanggal_lahir: this.moment(siswa.tanggal_lahir).format(
              "DD-MM-YYYY"
            ),
            lembaga_tujuan: siswa.lembaga_tujuan
              ? siswa.lembaga_tujuan.name
              : "-",
          });
        });

        this.calonSiswaData = filtredCalonSiswa;
        this.totalRows = this.calonSiswaData.length;
        this.isLoading = false;
        this.isBusy = false;
      } catch (error) {
        this.$notify({
          message: "failed get data from server",
          icon: "fa fa-times",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger",
        });
        console.log(error);
      }
    },
  },
  created() {
    this.getCalonSiswa();
  },
};
</script>
<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 100;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
