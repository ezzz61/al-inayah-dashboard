<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="8" md="8" class="my-1">
          <card>
            <div>
              <h1 class="text-center">Add new Babes</h1>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Name:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Babes"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="name ex: Jody "
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Description:"
                  label-for="input-1"
                >
                  <b-form-textarea
                    id="Babes body"
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
                  label="location:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Babes"
                    v-model="form.location"
                    type="text"
                    required
                    placeholder="ex: tangerang "
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="username :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Babes"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="enter cool username"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="star (default star) :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Babes"
                    v-model="form.star"
                    type="text"
                    required
                    placeholder="ex: 4"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="age:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Babes"
                    v-model="form.age"
                    type="text"
                    required
                    placeholder="ex : 24"
                  ></b-form-input>
                </b-form-group>

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
                  label="image collection"
                  label-for="input-1"
                >
                  <div class="row justify-content-center">
                    <div
                      class="col-4 justify-content-center align-items-center"
                      style="display: grid !important;"
                    >
                      <vue-upload-multiple-image
                        @upload-success="uploadImageSuccess"
                        @before-remove="beforeRemove"
                        @edit-image="editImage"
                        @mark-is-primary="defaultImage"
                        :data-images="images"
                        browseText="choose image"
                        idUpload="a"
                        name="a"
                        dragText="drag here"
                        multiple
                        primaryText="default"
                        markIsPrimaryText="set as default"
                      ></vue-upload-multiple-image>
                    </div>
                  </div>
                </b-form-group>
                <!-- <hr />
                <div :key="i" v-for="(file, i) in count_img">
                  <b-form-group
                    id="input-group-1"
                    label="image collection:"
                    label-for="input-1"
                  >
                    <b-form-file
                      @change="onCollectionChange(i)"
                      accept="image/*"
                      v-model="file_colection[i]"
                      placeholder="choose image"
                      drop-placeholder="image only"
                    ></b-form-file>
                  </b-form-group>
                  <div class="text-center" v-if="url[i]">
                    <img
                      :src="url[i]"
                      width="300"
                      height="300"
                      alt="preview image"
                    />
                  </div>
                </div>
                <div class="text-center">
                  <b-button @click="AddImage" class="btn-fill" variant="primary"
                    >Add Another Image</b-button
                  >
                </div>

                <hr /> -->
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
                              path: '/admin/Babes'
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
import Babes from "@/api/BabesApi";
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
        filebrowserUploadUrl: "https://api.niagaplay.com/UploadStatic",
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
      fileBanner: null,
      form: {
        username: "",
        name: "",
        content: null,
        start_date: null,
        end_time: null,
        is_active: false,
        type: "main",
        category_id: null,
        Babes_type_id: null,
        potition_type: "default"
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
      url_collection: [],
      file_colection: [],
      count_img: 0,
      allImage: [],
      images: [],
      imgdata: {},
      file: null,
      files: []
    };
  },
  methods: {
    defaultImage(index, done) {
      let flag = 0,
        arr = [];
      this.files.map((f, index) => {
        if (f.name == done[0].name) flag = index;
      });
      for (const [index, pair] of this.files.entries()) {
        if (index == 0) {
          arr.push(this.files[flag]);
          arr.push(pair);
        } else if (index == flag) {
          continue;
        } else {
          arr.push(pair);
        }
      }
      this.files = arr;
    },
    editImage(formData) {
      let imgdata = new FormData();
      for (var pair of formData.entries()) {
        imgdata.append(pair[0], pair[1]);
        this.files.push(pair[1]);
      }
      this.allImage = imgdata;
    },
    async uploadImageSuccess(formData, index, fileList) {
      let imgdata = new FormData();
      if (fileList.length < 5) {
        for (var pair of formData.entries()) {
          imgdata.append(pair[0], pair[1]);
          this.files.push(pair[1]);
        }
        this.allImage = imgdata;
      } else {
        alert("max 5 image");
      }
    },
    beforeRemove(index, done, fileList) {
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
    AddImage() {
      this.count_img++;
    },
    onCollectionChange(i) {
      const file = e.target.files[0];
      this.url_collection[i] = URL.createObjectURL(file);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    onFileChangeBanner(e) {
      const file = e.target.files[0];
      this.urlBanner = URL.createObjectURL(file);
    },
    // async uploadImageSuccess(formData, index, fileList) {
    //   let imgdata = new FormData();

    //   if (fileList.length < 5) {
    //     for (var pair of formData.entries()) {
    //       imgdata.append(pair[0], pair[1]);
    //       this.allImage.push(pair[1]);
    //     }
    //   }
    // },
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
        let res = await Babes.Add(data);

        if (res.data.success) {
          const setdata = new FormData();
          for (var x = 0; x < this.files.length; x++) {
            setdata.append("file", this.files[x]);
          }
          await Babes.UploadCollection(res.data.data._id, setdata);

          if (this.file) {
            let form_file = new FormData();
            form_file.append("file", this.file);
            let save_image = await Babes.Upload(res.data.data._id, form_file);
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
            path: "/admin/Babes"
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
    // console.log(get_tag);
    // console.log(get_category.data.data);
    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  }
};
</script>
