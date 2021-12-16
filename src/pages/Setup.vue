<template>
  <div class="content">
    <b-tabs content-class="mt-3">
      <b-tab title="Setting Youtube URL" active>
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

          <b-button class="text-center mt-2" @click="Addmore"
            >add more</b-button
          >
          <br />
        </div>
      </b-tab>
      <b-tab title="term of condition">
        <p>Terms and Condition</p>

        <ckeditor
          tag-name="textarea"
          v-model="toc"
          :config="editorConfig"
        ></ckeditor>
      </b-tab>
      <b-tab title="privacy and policy">
        <p>privacy and policy</p>

        <ckeditor
          tag-name="textarea"
          v-model="pap"
          :config="editorConfig"
        ></ckeditor>
      </b-tab>
    </b-tabs>
    <br />
    <hr />
    <b-row class="justify-content-center">
      <b-col cols="2">
        <b-button @click="handleSave" class="outline-primary mt-2 text-center"
          >save
        </b-button>
      </b-col>
    </b-row>
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
        colorButton_enableMore: true
      },
      url: [""],
      toc: "",
      pap: "",
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
      let save = await Dashboard.SaveUrl({
        url: url_data,
        toc: this.toc,
        pap: this.pap
      });
      console.log(save);
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
