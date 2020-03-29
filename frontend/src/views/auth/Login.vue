<template>
  <v-container fluid>
    <v-form ref="form" v-model="form.valid">
      <v-form-base :value="form.data" :schema="form.schema" />
      <v-btn block @click="login">
        Login &nbsp;
        <icon icon="login"></icon>
      </v-btn>
    </v-form>
  </v-container>
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
          username: "",
          password: ""
        },
        schema: {
          username: {
            clearable: true,
            type: "text",
            label: "Username",
            prependIcon: "mdi-account",
            tooltip: "Your Account Username/Email.",
            // rules: [required("Username is required.")],
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
          }
        }
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate();
      if (!this.form.valid) return;
      this.$store.dispatch("auth/login", this.form.data);
    }
  }
};
</script>