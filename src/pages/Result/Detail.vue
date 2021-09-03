<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <notifications> </notifications>
    <div class="row justify-content-center">
      <h3>Selected Candidate for {{ event_data.name }}</h3>
    </div>
    <b-row class="mt-3">
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
              class="btn btn-icon btn-success btn-fill"
              @click="handleExport()"
            >
              <i class="nc-icon nc-cloud-upload-94"> Export to excel</i>
            </button>
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

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="status">Status</b-form-checkbox>
            <b-form-checkbox value="rw">rw</b-form-checkbox>
            <b-form-checkbox value="rt">rt</b-form-checkbox>
            <b-form-checkbox value="kelurahan">kelurahan</b-form-checkbox>
          </b-form-checkbox-group>
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
            v-if="!isLoading"
            show-empty
            class="ml-2"
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >
            <!-- <template v-slot:cell(category)="row">
              {{ row.item.category_id[0].name }}
            </template> -->
            <!-- <template v-slot:cell(floor)="row">
              {{ row.item.floor_id[0].name }}
            </template> -->
            <template #cell(actions)="row">
              <b-button
                @click="
                  $router.push({
                    name: 'detail_event_confirm',
                    params: {
                      id_candidate: row.item._id,
                      id_event: $route.params.id,
                    },
                  })
                "
                class="btn btn-icon btn-info mx-1"
              >
                <i class="fa fa-edit"></i>show detail</b-button
              >
              <!-- <b-collapse :id="'collapse-' + row.item._id">
                <b-card>{{ row.item._id }}</b-card>
              </b-collapse> -->
              <!-- <button
                class="btn btn-icon btn-info mx-1"
                @click="
                  $router.push({
                    name: 'confirm_event',
                    params: { id: row.item._id },
                  })
                "
              >
                <i class="fa fa-edit"></i>detail
              </button> -->
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
      :title="'Delete ' + infoModal.name"
      @hide="resetInfoModal"
    >
      <pre>
are you sure want to delete <strong>{{ infoModal.title }} </strong>from Event list ?</pre>
    </b-modal>
  </b-container>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import LoadingTable from "src/components/LoadingTable.vue";
import User from "@/api/UserApi";

import Event from "@/api/EventApi";

export default {
  components: {
    Card,
    LoadingTable,
  },
  data() {
    return {
      success: false,
      items: [],
      event_data: null,
      month_name: [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
      ],
      isLoading: false,
      failed: false,
      type: ["success", "danger"],
      notifications: {
        topCenter: false,
      },

      fields: [
        {
          key: "name",
          label: "name",
          sortable: true,
        },
        {
          key: "status",
          label: "status",
          sortable: true,
        },
        {
          key: "phone",
          label: "phone",
          sortable: true,
        },
        {
          key: "score",
          label: "total score",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "rt",
          label: "rt",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "rw",
          label: "rw",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "kelurahan",
          label: "kelurahan",
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
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
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
        let res = await Event.Delete(id);
        console.log(res);
        if (res.data.success) {
          this.success = true;
          this.notifyVue();
          this.loadStart();
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
      this.infoModal.title = `${item.name}`;
      this.infoModal.content = item._id;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async handleExport() {
      let export_data = await Event.Export(this.$route.params.id);
      if (export_data.data.success) {
        window.location.href = "http://" + export_data.data.data.url;
        window.open("http://" + export_data.data.data.url, "_blank");
      } else {
        this.$notify({
          message: "error when generate report",
          icon: "fa fa-times",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger",
        });
      }
    },
    async loadStart() {
      try {
        let getdetail = await Event.Detail(this.$route.params.id);
        this.event_data = getdetail.data.data;
        this.isLoading = true;
        let res = await User.Cadidate(this.$route.params.id);
        this.items = res.data.data.sort(function (a, b) {
          return b.score - a.score;
        });

        this.totalRows = this.items.length;
        this.isLoading = false;
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
    this.loadStart();
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
