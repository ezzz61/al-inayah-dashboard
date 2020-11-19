<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->
      <div class="row mt-5">
        <div class="col-8">
          <b-row class="justify-content-center">
            <b-col cols="12" md="12" class="my-1">
              <card>
                <div>
                  <h1 class="text-center">Update Blog</h1>
                  <b-alert :show="showError" variant="danger">{{
                    messageError
                  }}</b-alert>
                  <b-form @submit="onSubmit">
                    <b-form-group
                      id="input-group-1"
                      label=" Blog Name:"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Blog"
                        v-model="form.title"
                        type="text"
                        required
                        placeholder="Blog name ex: big sale"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="content:"
                      label-for="input-1"
                    >
                      <b-form-textarea
                        id="textarea"
                        v-model="form.content"
                        placeholder="Enter content"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-form-group>

                    <b-form-group
                      id="input-group-1"
                      label="image:"
                      label-for="input-1"
                    >
                      <div class="row justify-content-center">
                        <div class="col-4">
                          <vue-upload-multiple-image
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            :data-images="images"
                            browseText="choose image"
                            required
                            idUpload="a"
                            name="a"
                            :multiple="false"
                            dragText="drag here"
                            primaryText="default"
                            markIsPrimaryText="set as default"
                          ></vue-upload-multiple-image>
                        </div>
                      </div>
                    </b-form-group>
                    <b-row class="justify-content-center">
                      <b-col class="text-center">
                        <b-col class="text-center">
                          <div v-if="!isLoading">
                            <b-button
                              class="mr-1"
                              type="reset"
                              variant="danger"
                              @click="$router.go(-1)"
                              >cancel</b-button
                            >
                            <b-button type="submit" variant="primary"
                              >Submit</b-button
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
        </div>
        <div class="col-4">
          <card class="card-user">
            <img slot="image" :src="urlimage" alt="..." />
            <h5 class="text-center">{{ form.title }}</h5>
            <p class="description text-center">
              <br />
              {{ form.content }} <br />
            </p>
            <div
              slot="footer"
              class="text-center d-flex justify-content-center"
            >
              <p>
                {{
                  this.day_week[new Date(form.created_at).getDay()] +
                  ", " +
                  new Date(form.created_at).getDate().toString() +
                  " " +
                  this.month_name[new Date(form.created_at).getMonth()] +
                  " " +
                  new Date(form.created_at).getFullYear().toString().substr(-2)
                }}
              </p>
            </div>
          </card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Blog from "@/api/BlogApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      day_week: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
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
      urlimage: "",
      images: [],
      allImage: [],
      category: "",
      floor: "",
      form: {
        title: "",
        content: "",
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
    };
  },
  methods: {
    async uploadImageSuccess(formData, index, fileList) {
      let imgdata = new FormData();

      if (fileList.length < 5) {
        for (var pair of formData.entries()) {
          imgdata.append(pair[0], pair[1]);
          this.allImage.push(pair[1]);
        }
      }
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

      if (this.allImage.length === 0) {
        let data = this.form;

        let res = await Blog.Update(this.$route.params.id, data);
        if (res.data.success) {
          this.isLoading = true;
          this.$notify({
            message: "success",
            icon: "fa  fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push({
            path: "/admin/Blog",
          });
          this.isLoading = false;
        } else {
          this.$notify({
            message: "failed",
            icon: "fa  fa-check-circle",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "danger",
          });

          this.isLoading = false;
        }
      } else {
        this.isLoading = true;
        let data = this.form;
        try {
          let res = await Blog.Update(this.$route.params.id, data);
          if (res.data.success) {
            const setdata = new FormData();
            for (var x = 0; x < this.allImage.length; x++) {
              setdata.append("file", this.allImage[x]);
            }
            let res_upload = await Blog.Upload(this.$route.params.id, setdata);
            console.log(res_upload.data);
            if (res_upload.data.success) {
              this.success = true;
              this.$notify({
                message: "success",
                icon: "fa fa-check-circle",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "success",
              });
              this.$router.push({
                path: "/admin/Blog",
              });

              this.isLoading = false;
            } else {
              this.success = true;
              this.$notify({
                message: "Failed upload image",
                icon: "fa fa-times-circle",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "danger",
              });
              // this.$router.push({
              //   path: "/admin/Blog",
              // });

              this.isLoading = false;
            }
          } else {
            this.isLoading = false;
            this.showError = true;
            this.messageError = res.data.message;
            this.$notify({
              message: res.data.message,
              icon: "fa fa-times-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "danger",
            });
          }
        } catch (err) {
          this.isLoading = false;
          console.log(err);
        }
      }
    },
  },
  async created() {
    try {
      let getdetail = await Blog.Detail(this.$route.params.id);
      this.form = getdetail.data.data[0];

      if (getdetail.data.data[0].image == 0) {
        this.urlimage = "http://localhost:8081/tenant_img/notavaible.jpeg";
      } else {
        this.urlimage =
          "http://localhost:8081/" + getdetail.data.data[0].image[0].path;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style  scoped>
img {
  width: 100%;
  height: 100%;
}
</style>