<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="8" md="8" class="my-1">
          <card>
            <div>
              <h4 class="text-center font-weight-bold">
                Update Data Calon Siswa
              </h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit.prevent="onSubmit">
                <h5>Data diri calon siswa</h5>
                <!-- Nama Lengkap jenis kelamin -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Nama Lengkap :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.nama"
                        maxlength="30"
                        type="text"
                        required
                        placeholder="Masukkan Nama Lengkap"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Jenis Kelamin :"
                      label-for="input-1"
                    >
                      <select class="form-control" v-model="form.jenis_kelamin">
                        <option disabled>Default select</option>
                        <option>Laki-Laki</option>
                        <option>Perempuan</option>
                      </select>
                    </b-form-group>
                  </div>
                </div>

                <!-- tempat tanggal lahir -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Tempat Lahir :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.tempat_lahir"
                        type="text"
                        required
                        maxlength="20"
                        placeholder="Contoh : Bogor"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Tanggal Lahir :"
                      label-for="input-1"
                    >
                      <date-picker
                        v-model="form.tanggal_lahir"
                        format="DD-MM-YYYY"
                        placeholder="18-06-1999"
                        valueType="format"
                        style="height: 40px"
                      ></date-picker>
                    </b-form-group>
                  </div>
                </div>

                <!-- email no tlp -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="No telpon :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.no_telpon"
                        type="number"
                        maxlength="12"
                        required
                        placeholder="Contoh : 08xxx"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Email :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.email"
                        type="text"
                        required
                        placeholder="Contoh : xxx@gmail.com"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <h5>Data diri orang tua</h5>
                <!-- data diri ayah -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Nama Ayah :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.nama_ayah"
                        type="text"
                        required
                        placeholder="Masukkan nama ayah"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Pekerjaan Ayah :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.pekerjaan_ayah"
                        type="text"
                        required
                        placeholder="Contoh : Wiraswasta"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <!-- data diri ibu -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Nama Ibu :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.nama_ibu"
                        type="text"
                        required
                        placeholder="Masukkan nama ibu"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Pekerjaan ibu :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.pekerjaan_ibu"
                        type="text"
                        required
                        placeholder="Contoh : Wiraswasta"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <!-- data diri wali opsional -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Nama Wali :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.nama_wali"
                        type="text"
                        required
                        placeholder="Masukkan nama Wali , nama ibu , ayah , atau wali"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="input-group-1"
                      label="Pekerjaan Wali :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.pekerjaan_wali"
                        type="text"
                        required
                        placeholder="Contoh : Wiraswasta"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <!-- alamat -->
                <b-form-group
                  id="input-group-1"
                  label="Alamat :"
                  label-for="input-1"
                >
                  <textarea
                    v-model="form.alamat"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </b-form-group>

                <h5 class="mt-4">Data Sekolah Asal</h5>
                <!-- sekolah asal -->
                <b-form-group
                  id="input-group-1"
                  label="Nama Asal Sekolah :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Article"
                    v-model="form.nama_sekolah_asal"
                    type="text"
                    required
                    placeholder="Masukkan sekolah asal"
                  ></b-form-input>
                </b-form-group>

                <!-- no nisn tahun kelulusan nilai rata-rata -->
                <div class="row">
                  <div class="col-md-4">
                    <b-form-group
                      id="input-group-1"
                      label="No nisn :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.no_nisn"
                        type="number"
                        required
                        placeholder="Masukkan No NISN"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group
                      id="input-group-1"
                      label="Tahun kelulusan :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.tahun_kelulusan"
                        type="number"
                        required
                        placeholder="Contoh : 2019"
                        maxlength="20"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group
                      id="input-group-1"
                      label="Nilai Rata-rata :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.nilai_rata_rata"
                        type="number"
                        required
                        placeholder="Contoh : 8.5"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <!-- <b-form-group
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
                </div> -->
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
                              path: '/admin/calon-siswa',
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
import calonSiswaApi from "@/api/CalonSiswaApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    VueUploadMultipleImage,
    DatePicker,
  },
  data() {
    return {
      images: [],
      allImage: [],
      urlBanner: null,
      fileBanner: null,
      url: null,
      angka: 2,
      file: null,
      form: {
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        no_telpon: "",
        no_nisn: "",
        alamat: "",
        email: "",
        nama_sekolah_asal: "",
        tahun_kelulusan: "",
        nilai_rata_rata: "",
        nama_ayah: "",
        pekerjaan_ayah: "",
        nama_ibu: "",
        pekerjaan_ibu: "",
        nama_wali: "",
        pekerjaan_wali: "",
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
    };
  },
  methods: {
    // onFileChangeBanner(e) {
    //   const file = e.target.files[0];
    //   this.urlBanner = URL.createObjectURL(file);
    // },
    // onFileChange(e) {
    //   const file = e.target.files[0];
    //   this.url = URL.createObjectURL(file);
    // },
    // async uploadImageSuccess(formData, index, fileList) {
    //   let imgdata = new FormData();
    //   if (fileList.length < 5) {
    //     for (var pair of formData.entries()) {
    //       imgdata.append(pair[0], pair[1]);
    //       this.allImage.push(pair[1]);
    //     }
    //   }
    // },
    // beforeRemove(index, done, fileList) {
    //   console.log("index", index, fileList);
    //   var r = confirm("remove image");
    //   if (r == true) {
    //     done();
    //   } else {
    //     console.log("x");
    //   }
    //   if (fileList.length === 0) {
    //     this.allImage = null;
    //   }
    // },
    // editImage(formData, index, fileList) {
    //   for (var pair of formData.entries()) {
    //     imgdata.append(pair[0], pair[1]);
    //     this.allImage.push(pair[1]);
    //   }
    // },
    async onSubmit() {
      this.isLoading = true;
      let data = this.form;

      try {
        let res = await calonSiswaApi.Update(this.$route.params.id, data);
        if (res.data.status === 200) {
          this.success = true;
          this.$notify({
            message: "success",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push({
            path: "/admin/calon-siswa",
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.showError = true;
          this.messageError = res.data.data;
          this.$notify({
            message: res.data.data,
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
      const getCalonSiswaDetails = await calonSiswaApi.Detail(
        this.$route.params.id
      );

      if (getCalonSiswaDetails.data.status === 200) {
        this.form = getCalonSiswaDetails.data.data;
      } else {
        this.$notify({
          message: "something went wrong",
          icon: "fa fa-times-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger",
        });
      }
    } catch (error) {
      this.$notify({
        message: "something went wrong",
        icon: "fa fa-times-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger",
      });
    }
  },
};
</script>
