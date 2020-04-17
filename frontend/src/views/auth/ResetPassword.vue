<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-spacer />
      <v-toolbar-title>{{appName}} Reset Password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="resetPassword" ref="form" v-model="form.valid">
        <v-form-base :value="form.data" :schema="form.schema" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="secondary" :to="{name:'Login'}">Login</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="resetPassword">Reset Password</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import VFormBase from "vuetify-form-base";
const required = msg => v => !!v || msg;
export default {
  components: { VFormBase },
  data() {
    return {
      form: {
        valid: false,
        data: {
          code: "",
          password: "",
          password_confirmation: ""
        },
        schema: {
          code: {
            clearable: true,
            type: "text",
            label: "Code",
            prependIcon: "mdi-account",
            tooltip: "Code You received in email.",
            rules: [required("Code is required.")],
            flex: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
          },
          password: {
            clearable: true,
            type: "password",
            label: "Password",
            prependIcon: "mdi-lock",
            tooltip: "Your Account Password.",
            rules: [required("Password is required.")],
            flex: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
          },
          password_confirmation: {
            clearable: true,
            type: "password",
            label: "Conform Password",
            prependIcon: "mdi-lock",
            tooltip: "Your Account Password.",
            rules: [required("Password Conformation is required.")],
            flex: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
          }
        }
      }
    };
  },
  methods: {
    resetPassword() {
      this.$refs.form.validate();
      if (!this.form.valid) return;
      var $this = this;
      this.$store.dispatch("auth/resetPassword", this.form.data).then(res => {
        if (res.code == 200) $this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>