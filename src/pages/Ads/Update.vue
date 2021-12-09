<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h1 class="text-center">Update Ads</h1>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Ads Title:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Ads"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Ads title ex: Ads sidebar kanan"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Ads body:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Ads"
                    v-model="form.body"
                    type="text"
                    required
                    placeholder="body for description"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Ads link:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Ads"
                    v-model="form.link"
                    type="text"
                    required
                    placeholder="url ads"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="potition*:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.type"
                    :options="['sidebar', 'main']"
                    size="l"
                    class="mt-2"
                  ></b-form-select>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="image:"
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
                              path: '/admin/ads'
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
import Ads from "@/api/AdsApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
  components: {
    VueUploadMultipleImage
  },
  data() {
    return {
      role: null,
      options_floor: [{ value: null, text: "Please select an floor" }],
      options_Ads: [{ value: null, text: "Please select an floor" }],
      selected: null,
      file: null,
      arr_criteria: [
        {
          name: "input criteria name ex: Gaji",
          point: 100,
          type: null
        }
      ],
      options_data: [
        { value: null, text: "Please select type", disabled: true },
        { value: "up", text: "Upper is Better" },
        { value: "down", text: "Lower is Better" }
      ],
      images: [],
      allImage: [],
      angka: 2,
      url: null,

      form: {
        name: "",
        content: null,
        start_date: null,
        end_time: null,
        is_active: null
      },
      isLoading: false,
      is_editable: true,
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

      this.isLoading = true;
      let data = this.form;
      try {
        let res = await Ads.Update(this.$route.params.id, data);
        if (res.data.success) {
          if (this.file) {
            let form_file = new FormData();
            form_file.append("file", this.file);
            let save_image = await Ads.Upload(
              this.$route.params.id,
              form_file,
              "update"
            );
            if (save_image.data.success) {
              this.success = true;

              this.$notify({
                message: "success",
                icon: "fa fa-check-circle",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "success"
              });

              this.isLoading = false;
              return this.$router.push({
                path: "/admin/ads"
              });
            } else {
              this.success = true;
              this.isLoading = false;
              return this.$notify({
                message: "upload failed",
                icon: "fa fa-check-circle",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: "danger"
              });
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
            path: "/admin/ads"
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
      let data = JSON.parse(this.$cookie.get("data_user"));
      if (data) {
        this.role = data.role_id.name;
      }
      let getdetail = await Ads.Detail(this.$route.params.id);
      if (getdetail.data.data.status != "new") {
        this.is_editable = false;
      }
      if (getdetail.data.data.image) {
        this.url = getdetail.data.data.image;
      }
      this.form = getdetail.data.data;
      this.arr_criteria = getdetail.data.data.criteria;
    } catch (error) {
      this.$notify({
        message: "failed get data from backend",
        icon: "fa fa-times-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger"
      });
    }

    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  }
};
</script>
