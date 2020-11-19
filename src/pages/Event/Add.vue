<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h1 class="text-center">Add Event</h1>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label=" Event Name:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Event name ex: big sale"
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
                  label=" start date:"
                  label-for="input-1"
                >
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="form.start_date"
                    class="mb-2"
                  ></b-form-datepicker>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label=" end date:"
                  label-for="input-1"
                >
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="form.end_date"
                    class="mb-2"
                  ></b-form-datepicker>
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
    </b-container>
  </div>
</template>

<script>
import Event from "@/api/EventApi";
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

      images: [],
      allImage: [],
      form: {
        title: "",
        content: null,
        start_date: null,
        end_date: null,
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
        this.$notify({
          message: "please choose an image",
          icon: "fa  fa-exclamation-circle",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger",
        });
      } else {
        this.isLoading = true;
        let data = this.form;
        try {
          let res = await Event.Add(data);

          if (res.data.success) {
            const setdata = new FormData();
            for (var x = 0; x < this.allImage.length; x++) {
              setdata.append("file", this.allImage[x]);
            }
            console.log(res.data.message);
            let res_upload = await Event.Upload(res.data.message, setdata);
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
                path: "/admin/Event",
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

    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  },
};
</script>