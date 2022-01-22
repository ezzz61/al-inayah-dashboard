<template>
  <div class="content">
    <b-tabs content-class="mt-3">
      <b-tab title="Pengaturan Pembukaan Calon Siswa" active>
        <form @submit.prevent="changeActiveStatus">
          <div class="row justify-items-center">
            <div class="col-md-4">
              <p>Status Pembukaan Calon Siswa Baru :</p>
            </div>
            <div class="col-md-4">
              <b-form-group>
                <b-form-checkbox v-model="form.is_active" switch size="lg">{{
                  form.is_active ? "Active" : "Unactive"
                }}</b-form-checkbox>
              </b-form-group>
            </div>
          </div>
          <b-row class="pl-3">
            <button class="btn outline-primary mt-2 text-center">Simpan</button>
          </b-row>
        </form>
      </b-tab>
      <b-tab title="Bagian Pengasuh">
        <form @submit.prevent="saveBagianPengasuh">
          <p>Bagian Pengasuh</p>
          <ckeditor
            tag-name="textarea"
            v-model="bagianPengasuh.body"
            :config="editorConfig"
          ></ckeditor>
          <b-row class="justify-content-center">
            <button class="btn outline-primary mt-2 text-center">Simpan</button>
          </b-row>
        </form>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import bagianPengasuhApi from "@/api/BagianPengasuhApi.js";
import SettingsApi from "@/api/SettingsApi.js";

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard,
  },
  data() {
    return {
      editorConfig: {
        contentsCss:
          "https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400;1,500&family=Kiwi+Maru:wght@300;400;500&display=swap",
        font_names:
          "Arial/Arial, Helvetica, sans-serif;" +
          "Comic Sans MS/Comic Sans MS, cursive;" +
          "Courier New/Courier New, Courier, monospace;" +
          "Georgia/Georgia, serif;" +
          "Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;" +
          "Tahoma/Tahoma, Geneva, sans-serif;" +
          "Times New Roman/Times New Roman, Times, serif;" +
          "Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;" +
          "Verdana/Verdana, Geneva, sans-serif;" +
          "Kiwi_maru/Kiwi maru;" +
          "Karla/Karla",
        extraPlugins: "uploadimage,colorbutton, font,uicolor,colordialog ",
        filebrowserUploadUrl: "https://api.niagaplay.com/UploadStatic",
        colorButton_colors:
          "707070,121212,1D4B98,e06040,419f5a,79aacb,ffd44f,f5ede0",
        colorButton_enableMore: true,
      },
      url: [""],
      toc: "",
      form: {
        is_active: false,
      },
      bagianPengasuh: {
        body: "",
      },
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
    this.getDetailBagianPengasuh();
    this.getCurrentStatus();
  },
  methods: {
    async saveBagianPengasuh() {
      try {
        const res = await bagianPengasuhApi.Update("61d3026d3a69469a3d2c6cc6", {
          body: this.bagianPengasuh.body,
        });

        if (res.data.status === 200) {
          this.$notify({
            message: "Bagian Pengasuh Tersimpan",
            icon: "fa  fa-exclamation-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
        }
      } catch (error) {
        this.$notify({
          message: "somehting went wrong",
          icon: "fa  fa-exclamation-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger",
        });
      }
    },
    async getCurrentStatus() {
      try {
        const activeCalonSiswa = await SettingsApi.Get();

        if (activeCalonSiswa.data.data.status === 200) {
          this.form.is_active = activeCalonSiswa.data.data.data.isActive;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailBagianPengasuh() {
      try {
        const res = await bagianPengasuhApi.Detail("61d3026d3a69469a3d2c6cc6");
        if (res.data.status === 200) {
          this.bagianPengasuh.body = res.data.data.body;
        }
      } catch (error) {
        this.$notify({
          message: "somehting went wrong",
          icon: "fa  fa-exclamation-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger",
        });
      }
    },
    async changeActiveStatus() {
      try {
        const activeCalonSiswa = await SettingsApi.Add({
          isActive: this.form.is_active,
        });
        if (activeCalonSiswa.data.status === 200) {
          this.$notify({
            message: "Status Pembukaan sudah terupdate",
            icon: "fa  fa-exclamation-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.getCurrentStatus();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
