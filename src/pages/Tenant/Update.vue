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
                  <h1 class="text-center">Update Tenant</h1>
                  <b-alert :show="showError" variant="danger">{{
                    messageError
                  }}</b-alert>
                  <b-form @submit="onSubmit">
                    <b-form-group
                      id="input-group-1"
                      label=" Tenant Name:"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Tenant"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Tenant name ex: samsung"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label=" Category:"
                      label-for="input-1"
                    >
                      <b-form-select
                        required
                        v-model="form.category_id"
                        :options="options_category"
                      ></b-form-select>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Floor:"
                      label-for="input-1"
                    >
                      <b-form-select
                        required
                        v-model="form.floor_id"
                        :options="options_floor"
                      ></b-form-select>
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"
                      label="Status:"
                      label-for="input-1"
                    >
                      <b-form-checkbox
                        :options="options"
                        v-model="form.is_active"
                        switch
                        size="lg"
                        >{{
                          form.is_active ? "Active" : "not active"
                        }}</b-form-checkbox
                      >
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
            <h5 class="text-center">{{ form.name }}</h5>
            <p class="description text-center">
              <br />
              {{ category }} <br />
              {{ floor }}
            </p>
            <div
              slot="footer"
              class="text-center d-flex justify-content-center"
            >
              <button href="#" class="btn btn-simple">
                <i class="fa fa-facebook-square"></i>
              </button>
              <button href="#" class="btn btn-simple">
                <i class="fa fa-twitter"></i>
              </button>
              <button href="#" class="btn btn-simple">
                <i class="fa fa-google-plus-square"></i>
              </button>
            </div>
          </card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Tenant from "@/api/TenantApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Floor from "@/api/FloorApi";
import Category from "@/api/CategoryApi";

export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      options_floor: [{ value: null, text: "Please select an floor" }],
      options_category: [{ value: null, text: "Please select an floor" }],
      urlimage: "",
      images: [],
      allImage: [],
      category: "",
      floor: "",
      form: {
        name: "",
        is_active: false,
        floor_id: null,
        category_id: null,
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

        let res = await Tenant.Update(this.$route.params.id, data);
        if (res.data.success) {
          this.$notify({
            message: "update tenant succes",
            icon: "fa  fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push({
            path: "/admin/Tenant",
          });
        }
      } else {
        this.isLoading = true;
        let data = this.form;
        try {
          let res = await Tenant.Update(this.$route.params.id, data);
          if (res.data.success) {
            const setdata = new FormData();
            for (var x = 0; x < this.allImage.length; x++) {
              setdata.append("file", this.allImage[x]);
            }
            let res_upload = await Tenant.Upload(
              this.$route.params.id,
              setdata
            );
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
                path: "/admin/Tenant",
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
              //   path: "/admin/Tenant",
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
    let getdetail = await Tenant.Detail(this.$route.params.id);
    this.form.name = getdetail.data.data[0].name;

    let res_floor = await Floor.GetActive();
    let res_category = await Category.GetActive();
    let options_floor = [
      { value: null, text: "Please select an floor", disabled: true },
    ];
    let options_category = [
      { value: null, text: "Please select an category", disabled: true },
    ];

    res_floor.data.data.map((data) => {
      data = {
        value: data._id,
        text: `${data.name}`,
      };
      options_floor.push(data);
    });

    res_category.data.data.map((data) => {
      data = {
        value: data._id,
        text: `${data.name}`,
      };
      options_category.push(data);
    });

    this.options_floor = options_floor;
    this.options_category = options_category;
    this.form.category_id = getdetail.data.data[0].category_id[0]._id;
    this.category = getdetail.data.data[0].category_id[0].name;
    this.floor = getdetail.data.data[0].floor_id[0].name;

    this.form.floor_id = getdetail.data.data[0].floor_id[0]._id;
    // this.urlimage = getdetail.data.data[0].image[0]._id;
    if (getdetail.data.data[0].image == 0) {
      this.urlimage = "http://localhost:8081/tenant_img/notavaible.jpeg";
    } else {
      this.urlimage =
        "http://localhost:8081/" + getdetail.data.data[0].image[0].path;
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