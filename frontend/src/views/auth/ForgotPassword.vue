<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-spacer />
      <v-toolbar-title>{{appName}} Forgot Password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="forgotPassword" ref="form" v-model="form.valid">
        <v-form-base :value="form.data" :schema="form.schema" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="accent" :to="{name:'Login'}">Login</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="forgotPassword">
        Send Reset Code &nbsp;
        <icon icon="send"></icon>
      </v-btn>
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
          username: ""
        },
        schema: {
          username: {
            clearable: true,
            type: "text",
            label: "Username",
            prependIcon: "mdi-account",
            tooltip: "Your Account Username/Email.",
            rules: [required("Username is required.")],
            flex: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
          }
        }
      }
    };
  },
  methods: {
    forgotPassword() {
      this.$refs.form.validate();
      if (!this.form.valid) return;
      var $this = this;
      this.$store.dispatch("auth/forgotPassword", this.form.data).then(res => {
        if (res.code == 200) $this.$router.push({ name: "ResetPassword" });
      });
    }
  }
};
</script>