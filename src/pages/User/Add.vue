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
                  label=" email*:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.email"
                    type="text"
                    required
                    placeholder=" email ex: andimalaran@mail.com"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label=" password*:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="username:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="full name , ex: doni wihaya"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" phone:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.phone"
                    type="text"
                    required
                    placeholder=" phone ex: 08512555121"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="full name:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="full name , ex: doni wihaya"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="fav game:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.game_fav"
                    type="text"
                    required
                    placeholder="game fav : mobile legend"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="subscription:"
                  label-for="input-1"
                >
                  <b-form-checkbox
                    v-model="form.subscription"
                    switch
                    size="lg"
                    >{{
                      form.subscription ? "Active" : "Unactive"
                    }}</b-form-checkbox
                  >
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Role*:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.role"
                    :options="['admin', 'user']"
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
    VueUploadMultipleImage
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
          type: null
        }
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
        role: "user"
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false
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
            type: "success"
          });
          this.$router.push({
            path: "/admin/user"
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
    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  }
};
</script>
