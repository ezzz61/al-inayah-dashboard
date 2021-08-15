<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h1 class="text-center">Add User</h1>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label=" userName:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder=" username ex: andimalaran"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Password:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="password"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" first name:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.firstname"
                    type="text"
                    required
                    placeholder="firstname ex: andi"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" last name:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.lastname"
                    type="text"
                    required
                    placeholder="last name ex: malaranggi"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Rt:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.rt"
                    type="text"
                    required
                    placeholder="rt name ex: 07"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Rw:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.rw"
                    type="text"
                    required
                    placeholder="Rw name ex: 12"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Kelurahan:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.kelurahan"
                    type="text"
                    required
                    placeholder="kelurahan, ex: sindangsari"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Address:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.address"
                    type="text"
                    required
                    placeholder="address ex: perumahan taman walet"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Role:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.role_id"
                    :options="options_data"
                    size="l"
                    class="mt-2"
                  ></b-form-select>
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
import User from "@/api/UserApi";

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
      selected: null,
      arr_criteria: [
        {
          name: "input criteria name ex: Gaji",
          point: 100,
          type: null,
        },
      ],
      options_data: [],
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
        let res = await User.AddUser(data);
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
            path: "/admin/user",
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
    let get_role = await User.Role();
    if (get_role.data.data) {
      this.options_data = get_role.data.data.map((el) => {
        return { value: el._id, text: el.name };
      });
    }

    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  },
};
</script>