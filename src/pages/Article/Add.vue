<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="8" md="8" class="my-1">
          <card>
            <div>
              <h1 class="text-center">Add new Article</h1>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Title:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Article"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="title ex: PEnghilang ketiak hitam "
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Description:"
                  label-for="input-1"
                >
                  <b-form-textarea
                    id="article body"
                    v-model="form.description"
                    placeholder="are you interesting to whitening your kelek ? "
                    rows="3"
                    max-rows="6"
                    required
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" body:"
                  label-for="input-1"
                >
                  <ckeditor
                    tag-name="textarea"
                    v-model="form.body"
                    :config="editorConfig"
                  ></ckeditor>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" category:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.category_id"
                    :options="option_category"
                  ></b-form-select>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" tag:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.article_type_id"
                    :options="option_tag"
                  ></b-form-select>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="created by :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Article"
                    v-model="form.created_by"
                    type="text"
                    required
                    placeholder="enter cool writer name"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="type:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.potition_type"
                    :options="['headline', 'highlight', 'default']"
                  ></b-form-select>
                </b-form-group>

                <div v-if="form.potition_type == 'headline'">
                  <b-form-group
                    id="input-group-1"
                    label="image banner:"
                    label-for="input-1"
                  >
                    <b-form-file
                      @change="onFileChangeBanner"
                      accept="image/*"
                      v-model="fileBanner"
                      placeholder="choose image for banner"
                      drop-placeholder="image only"
                    ></b-form-file>
                  </b-form-group>

                  <div class="text-center" v-if="urlBanner">
                    <img
                      :src="urlBanner"
                      width="300"
                      height="300"
                      alt="preview image"
                    />
                  </div>
                </div>
                <b-form-group
                  id="input-group-1"
                  label="image thumbnail:"
                  label-for="input-1"
                >
                  <b-form-file
                    @change="onFileChange"
                    accept="image/*"
                    v-model="file"
                    placeholder="choose image"
                    drop-placeholder="image only"
                  ></b-form-file>
                </b-form-group>

                <div class="text-center" v-if="url">
                  <img
                    :src="url"
                    width="300"
                    height="300"
                    alt="preview image"
                  />
                </div>

                <b-form-group
                  id="input-group-1"
                  label="Status:"
                  label-for="input-1"
                >
                  <b-form-checkbox v-model="form.is_active" switch size="lg">{{
                    form.is_active ? "Active" : "Unactive"
                  }}</b-form-checkbox>
                </b-form-group>

                <b-row class="justify-content-center">
                  <b-col class="text-center">
                    <b-col class="text-center">
                      <div v-if="!isLoading">
                        <b-button
                          class="mr-1"
                          type="reset"
                          variant="danger"
                          @click="
                            $router.push({
                              path: '/admin/Article'
                            })
                          "
                          >{{
                            this.form.status != "new" ? "back" : "cancel"
                          }}</b-button
                        >
                        <b-button
                          class="btn-fill"
                          type="submit"
                          variant="primary"
                          >save</b-button
                        >
                      </div>
                      <div v-if="isLoading">
                        <b-button disabled variant="primary"
                          >loading...</b-button
                        >
                      </div>
                    </b-col>
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Article from "@/api/ArticleApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Category from "@/api/CategoryApi";

export default {
  components: {
    VueUploadMultipleImage
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
        filebrowserUploadUrl: "http://localhost:8822/UploadStatic",
        colorButton_colors:
          "707070,121212,1D4B98,e06040,419f5a,79aacb,ffd44f,f5ede0",
        colorButton_enableMore: true
      },
      option_category: [
        { value: null, text: "Please select category", disabled: true }
      ],
      option_tag: [{ value: null, text: "Please select tag", disabled: true }],
      selected: null,

      images: [],
      allImage: [],
      url: null,
      urlBanner: null,
      angka: 2,
      file: null,
      fileBanner: null,
      form: {
        name: "",
        content: null,
        start_date: null,
        end_time: null,
        is_active: false,
        type: "main",
        category_id: null,
        article_type_id: null,
        potition_type: "default"
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    onFileChangeBanner(e) {
      const file = e.target.files[0];
      this.urlBanner = URL.createObjectURL(file);
    },
    async uploadImageSuccess(formData, index, fileList) {
      let imgdata = new FormData();

      if (fileList.length < 5) {
        for (var pair of formData.entries()) {
          imgdata.append(pair[0], pair[1]);
          this.allImage.push(pair[1]);
        }
      }
    },
    RemoveCriteria(index) {
      this.arr_criteria.splice(index, 1);
    },
    AddCriteria() {
      this.arr_criteria.push({
        name: "input criteria name ex: Gaji",
        point: 0,
        type: null
      });
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);

      var r = confirm("remove image");
      if (r == true) {
        done();
      } else {
        console.log("x");
      }
      if (fileList.length === 0) {
        this.allImage = null;
      }
    },
    editImage(formData, index, fileList) {
      for (var pair of formData.entries()) {
        imgdata.append(pair[0], pair[1]);
        this.allImage.push(pair[1]);
      }
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (this.form.potition_type == "headline" && !this.fileBanner) {
        this.$notify({
          message: "missing banner file",
          icon: "fa fa-check-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
        return;
      }
      this.isLoading = true;
      let data = this.form;
      try {
        let res = await Article.Add(data);

        if (res.data.success) {
          if (this.fileBanner && this.form.potition_type == "headline") {
            let form_file = new FormData();
            form_file.append("file", this.file);
            let save_image = await Article.UploadBanner(
              res.data.data._id,
              form_file
            );
            if (!save_image.data.success) {
              this.false = true;
              this.$notify({
                message: "failed upload",
                icon: "fa fa-times-circle",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "danger"
              });

              this.isLoading = false;
              return;
            }
          }
          if (this.file) {
            let form_file = new FormData();
            form_file.append("file", this.file);
            let save_image = await Article.Upload(res.data.data._id, form_file);
            if (!save_image.data.success) {
              this.false = true;
              this.$notify({
                message: "failed upload",
                icon: "fa fa-times-circle",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "danger"
              });

              this.isLoading = false;
              return;
            }
          }
          this.success = true;
          this.$notify({
            message: "success",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success"
          });
          this.$router.push({
            path: "/admin/Article"
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.showError = true;
          this.messageError = res.data.message;
          this.$notify({
            message: res.data.message,
            icon: "fa fa-times-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger"
          });
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    }
  },
  async created() {
    try {
      let get_category = await Category.GetActive();
      let get_tag = await Category.GetActiveTag();
      if (!get_category.data.success || !get_tag.data.success) {
        this.$notify({
          message: "something went wrong",
          icon: "fa fa-times-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
      if (get_category.data.success) {
        get_category.data.data.map(el => {
          this.option_category.push({ text: el.name, value: el._id });
        });
      }
      if (get_tag.data.success) {
        get_tag.data.data.map(el => {
          this.option_tag.push({ text: el.name, value: el._id });
        });
      }
    } catch (error) {
      this.$notify({
        message: "something went wrong",
        icon: "fa fa-times-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger"
      });
    }

    console.log(this.option_category);
    console.log(this.option_tag);

    // console.log(get_tag);
    // console.log(get_category.data.data);
    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  }
};
</script>
