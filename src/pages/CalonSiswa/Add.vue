<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="8" md="8" class="my-1">
          <card>
            <div>
              <h4 class="text-center font-weight-bold">
                Tambah Data Calon Siswa
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
                        maxlength="40"
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
                        placeholder="18-06-1999"
                        format="DD-MM-YYYY"
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
                        @keypress="onlyNumber"
                        id="Article"
                        v-model="form.no_telpon"
                        type="text"
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
                        maxlength="60"
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
                        maxlength="40"
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
                        maxlength="20"
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
                        maxlength="40"
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
                        maxlength="20"
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
                        maxlength="40"
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
                        maxlength="20"
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
                    maxlength="255"
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
                    maxlength="50"
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
                        @keypress="onlyNumber"
                        v-model="form.no_nisn"
                        maxlength="15"
                        type="text"
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
                        @keypress="onlyNumber"
                        type="text"
                        required
                        placeholder="Contoh : 2019"
                        maxlength="4"
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
                        @keypress="onlyNumber"
                        id="Article"
                        v-model="form.nilai_rata_rata"
                        type="text"
                        required
                        maxlength="5"
                        placeholder="Contoh : 8.5"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <h5>Lembaga Pendidikan Yang Di Tuju</h5>
                <!-- data diri Lembaga Pendidikan -->
                <div class="row">
                  <div class="col-md-6">
                    <b-form-select
                      v-model="selectedLembagaPendidikan"
                      :options="lembagaPendidikan"
                      class="mb-3"
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select an option --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
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
import LembagaPendidikanApi from "@/api/LembagaPendidikanApi";
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
      option_category: [
        { value: null, text: "Please select category", disabled: true },
      ],
      option_tag: [{ value: null, text: "Please select tag", disabled: true }],
      selected: null,
      angka: 2,
      form: {},
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
      lembagaPendidikan: [],
      selectedLembagaPendidikan: null,
    };
  },

  methods: {
    onlyNumber($event) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
      ];
      const keyPressed = $event.key;
      if (!keysAllowed.includes(keyPressed)) {
        $event.preventDefault();
      }
    },
    async onSubmit() {
      this.isLoading = true;
      let data = {
        ...this.form,
        lembaga_tujuan: this.selectedLembagaPendidikan,
      };
      try {
        let res = await calonSiswaApi.Add(data);
        if (res.data.status === 403) {
          this.$notify({
            message: res.data.data,
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
        }

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
        } else {
          this.false = true;
          this.$notify({
            message: "failed upload",
            icon: "fa fa-times-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
          this.isLoading = false;
          return;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    async getLembagaPendidikan() {
      try {
        const res = await LembagaPendidikanApi.Get();
        console.log(res);
        if (res.data.data.status === 200) {
          let mapLembaga = [];
          res.data.data.data.map((lembaga) => {
            mapLembaga.push({
              text: lembaga.name,
              value: lembaga._id,
            });
          });
          this.lembagaPendidikan = mapLembaga;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getLembagaPendidikan();
  },
};
</script>

<style lang="scss" scoped>
.mx-datepicker {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 40px !important;
}

input.mx-input {
  height: 40px !important;
}
</style>
