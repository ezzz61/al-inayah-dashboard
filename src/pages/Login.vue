<template>
  <div class="login">
    <b-container>
      <b-row class="justify-content-center mt-5">
        <b-col md="4" class="text-center">
          <b-card-group deck>
            <b-card
              header="Gaia admin site"
              header-tag="header"
              footer="Welcome"
              footer-tag="footer"
              title="Login account"
            >
              <b-alert
                v-if="error.length > 0"
                show
                variant="danger"
                dismissible
              >
                {{ error[0] }}
              </b-alert>
              <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label-for="input-2">
                  <b-form-input
                    type="password"
                    id="input-2"
                    v-model="form.password"
                    required
                    placeholder="enter password"
                  ></b-form-input>
                </b-form-group>
                <b-button
                  class="btn-fill"
                  v-if="!isLoading"
                  type="submit"
                  variant="primary"
                  >Submit</b-button
                >
                <b-button
                  v-if="isLoading"
                  class="btn-fill"
                  disabled
                  variant="primary"
                  >loading...</b-button
                >
              </b-form>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Login from "@/api/UserApi";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      isLoading: false,
      error: [],
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.error = [];
      this.isLoading = true;
      let res = await Login.Login({
        username: this.form.username,
        password: this.form.password,
      });

      if (res.data.token) {
        try {
          var expired = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

          let data_user = await this.$jwtDec.decode(res.data.token);
          this.$cookie.set("token", res.data.token, {
            expires: expired,
          });
          this.$cookie.set("data_user", JSON.stringify(data_user), {
            expires: expired,
          });

          // this.$router.push({ path: "/product" });
          this.$router.push({ path: "/admin" });
        } catch (err) {
          console.log(err);
        }
        // console.log(role.role);
        // console.log(this.$jwtDec);

        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.error.push(res.data.message);
      }
    },
  },
  created() {
    let token = this.$cookie.get("token");
    // let data = JSON.parse(this.$cookie.get("data_user"));

    if (token !== null) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>
