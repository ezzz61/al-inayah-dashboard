<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="7" md="7" class="my-1">
          <card>
            <div>
              <h4 class="text-center">Detail data candidate</h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Candidate Nik:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-live"
                    type="number"
                    :disabled="update_view || !is_editable"
                    v-model="form.nik"
                    :state="nikState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Enter your name"
                    trim
                  ></b-form-input>

                  <!-- This will only be shown if the preceding input has an invalid state -->
                  <b-form-invalid-feedback id="input-live-feedback">
                    16 character
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Candidate Name:"
                  label-for="input-1"
                >
                  <b-form-input
                    :disabled="update_view || !is_editable"
                    id="Event"
                    :state="nameState"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="candidate name ex: Bambang Sutarjo"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    max 20 characters
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" Phone:"
                  label-for="input-1"
                >
                  <b-form-input
                    :disabled="update_view || !is_editable"
                    id="Event"
                    v-model="form.phone"
                    type="text"
                    required
                    placeholder="phone ex: 085727181292"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Address:"
                  label-for="input-1"
                >
                  <b-form-input
                    :disabled="update_view || !is_editable"
                    id="Total"
                    v-model="form.address"
                    type="text"
                    required
                    placeholder="user address,ex : perumahan taman walet Blok SL 15 no 02"
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
                        :label="data.name + ':'"
                        label-for="input-1"
                      ></b-form-group>
                      <b-form-input
                        id="Event"
                        :disabled="update_view || !is_editable"
                        v-model="arr_criteria[index].value"
                        type="text"
                        required
                        placeholder="criteria name"
                      ></b-form-input>
                    </div>
                  </card>
                </b-form-group>

                <b-row class="justify-content-center">
                  <b-col class="text-center">
                    <b-col class="text-center">
                      <div v-if="!isLoading">
                        <b-button
                          class="mr-1 btn-fill"
                          type="reset"
                          variant="danger"
                          @click="$router.go(-1)"
                          >back</b-button
                        >
                        <b-button
                          :disabled="update_view || !is_editable"
                          type="submit"
                          class="btn-fill"
                          variant="primary"
                          >Save</b-button
                        >
                        <b-button
                          class="ml-1 btn-fill"
                          :disabled="update_view || !is_editable"
                          type="reset"
                          variant="success"
                          @click="handleVerify"
                          >verify</b-button
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
        <b-col cols="2" md="2" class="my-1">
          <b-button class="btn-fill" @click="handleUpdate" variant="info"
            >Update</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Event from "@/api/EventApi";
import User from "@/api/UserApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";
export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
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
      event_data: {},
      images: [],
      allImage: [],
      angka: 2,
      form: {
        name: "",
        nik: "",
        content: null,
        start_date: null,
        end_time: null,
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",

      showError: false,
      update_view: true,
      is_editable: true,
    };
  },
  methods: {
    async handleVerify() {
      try {
        let data = this.form;
        data["criteria"] = this.arr_criteria;
        data["event_id"] = this.$route.params.id_event;
        let res = await User.UpdateCandidate(
          this.$route.params.id_candidate + "?type=status",
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
            path: "/admin/verification/c/" + this.$route.params.id_event,
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
    async handleUpdate() {
      this.update_view = !this.update_view;
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
      if (this.form.nik.length != 16) return;
      if (this.form.name.length > 20) return;

      this.isLoading = true;
      let data = this.form;
      data["criteria"] = this.arr_criteria;
      data["event_id"] = this.$route.params.id_event;
      // alert(JSON.stringify(this.arr_criteria));
      try {
        let res = await User.UpdateCandidate(
          this.$route.params.id_candidate,
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
            path: "/admin/verification/c/" + this.$route.params.id_event,
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
  computed: {
    nikState() {
      return this.form.nik.length == 16 ? true : false;
    },
    nameState() {
      return this.form.name.length <= 20 ? true : false;
    },
  },
  async created() {
    try {
      let getdetail = await User.CandidateDetail(
        this.$route.params.id_candidate
      );
      if (getdetail.data.data.status != "new") {
        this.is_editable = false;
      }

      this.form = getdetail.data.data;
      this.arr_criteria = getdetail.data.data.criteria_data;
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