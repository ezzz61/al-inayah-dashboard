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
                    v-model="form.name"
                    :disabled="!is_editable"
                    type="text"
                    required
                    placeholder="Event name ex: BANSOS KEMENAG 2021"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label=" end date:"
                  label-for="input-1"
                >
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="form.end_time"
                    :disabled="!is_editable"
                    class="mb-2"
                  ></b-form-datepicker>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" total recipient:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Total"
                    v-model="form.total"
                    type="text"
                    :disabled="!is_editable"
                    required
                    placeholder="Total Recepient for this event,example:20"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label=" Criteria:"
                  label-for="input-1"
                >
                  <card>
                    <div v-for="(data, index) in arr_criteria" :key="index">
                      <b-form-group
                        class="mt-3"
                        id="input-group-1"
                        :label="'criteria ' + (index + 1) + ':'"
                        label-for="input-1"
                      ></b-form-group>
                      <b-form-input
                        id="Event"
                        v-model="arr_criteria[index].name"
                        type="text"
                        :disabled="!is_editable"
                        required
                        placeholder="criteria name"
                      ></b-form-input>
                      <b-form-input
                        id="Event"
                        v-model="arr_criteria[index].point"
                        class="mt-2"
                        type="text"
                        :disabled="!is_editable"
                        required
                        placeholder="point , ex:20 , max : all combination is 100"
                      ></b-form-input>
                      <b-form-select
                        v-model="arr_criteria[index].type"
                        :options="options_data"
                        size="l"
                        :disabled="!is_editable"
                        class="mt-2"
                      ></b-form-select>
                      <div
                        v-if="index != 0"
                        class="row mt-2 mb-5 justify-content-center"
                      >
                        <button
                          :disabled="!is_editable"
                          class="btn btn-icon btn-danger btn-fill mr-4"
                          @click="RemoveCriteria(index)"
                        >
                          <i class="nc-icon nc-simple-remove"></i>
                        </button>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="col-4">
                        <b-button
                          class="mr-1 btn-fill"
                          variant="primary"
                          :disabled="!is_editable"
                          @click="AddCriteria()"
                          >add criteria</b-button
                        >
                      </div>
                    </div>
                  </card>
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
                          >{{
                            this.form.status != "new" ? "back" : "cancel"
                          }}</b-button
                        >
                        <b-button
                          class="btn-fill"
                          v-if="role == 'kecamatan'"
                          :disabled="!is_editable"
                          type="submit"
                          variant="primary"
                          >save</b-button
                        >
                        <b-button
                          class="ml-1 btn-fill"
                          @click="Handlepublish"
                          v-if="role == 'kecamatan'"
                          :disabled="!is_editable"
                          variant="success"
                          >Publish</b-button
                        >
                        <b-button
                          v-if="
                            form.status == 'published' && role == 'kecamatan'
                          "
                          class="ml-1 btn-fill"
                          @click="HandleFinish"
                          variant="info"
                          >finished</b-button
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

export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      role: null,
      options_floor: [{ value: null, text: "Please select an floor" }],
      options_category: [{ value: null, text: "Please select an floor" }],
      selected: null,
      arr_criteria: [
        {
          name: "input criteria name ex: Gaji",
          point: 100,
          type: null,
        },
      ],
      options_data: [
        { value: null, text: "Please select type", disabled: true },
        { value: "up", text: "Upper is Better" },
        { value: "down", text: "Lower is Better" },
      ],
      images: [],
      allImage: [],
      angka: 2,
      form: {
        name: "",
        content: null,
        start_date: null,
        end_time: null,
      },
      isLoading: false,
      is_editable: true,
      options: [],
      show: true,
      messageError: "",
      showError: false,
    };
  },
  methods: {
    async Handlepublish() {
      if (confirm("after publish this event cant be edited,are you sure?")) {
        try {
          let data = this.form;
          data["criteria"] = this.arr_criteria;
          let res = await Event.Update(
            this.$route.params.id + "?type=status",
            data
          );
          if (res.data.success) {
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
          this.$notify({
            message: "something went wrong",
            icon: "fa fa-times-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
          this.isLoading = false;
          console.log(err);
        }
      }
    },
    async HandleFinish() {
      if (
        confirm(
          "after publish this event cant be edited and result will be showing in result page,are you sure?"
        )
      ) {
        try {
          let res = await Event.Finish(this.$route.params.id);
          if (res.data.success) {
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
          this.$notify({
            message: "something went wrong",
            icon: "fa fa-times-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
          this.isLoading = false;
          console.log(err);
        }
      }
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
        type: null,
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

      this.isLoading = true;
      let data = this.form;
      data["criteria"] = this.arr_criteria;
      try {
        let res = await Event.Update(this.$route.params.id, data);
        if (res.data.success) {
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
    },
  },
  async created() {
    try {
      let data = JSON.parse(this.$cookie.get("data_user"));
      if (data) {
        this.role = data.role_id.name;
      }
      let getdetail = await Event.Detail(this.$route.params.id);
      if (getdetail.data.data.status != "new") {
        this.is_editable = false;
      }
      this.form = getdetail.data.data;
      this.arr_criteria = getdetail.data.data.criteria;
    } catch (error) {
      this.$notify({
        message: "failed get data from backend",
        icon: "fa fa-times-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger",
      });
    }

    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  },
};
</script>