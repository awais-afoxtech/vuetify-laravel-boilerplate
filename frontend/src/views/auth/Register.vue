<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-spacer />
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="register" ref="form" v-model="form.valid">
        <v-form-base :value="form.data" :schema="form.schema" />
        <v-select
          v-model="form.data.role"
          :rules="form.role.rules"
          :items="form.role.items"
          :label="form.role.label"
          :prepend-icon="form.role.prependIcon"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="secondary" :to="{name:'Login'}">
        Login
        &nbsp;
        <icon icon="login"></icon>
      </v-btn>
      <v-spacer />
      <v-btn color="primary" @click="register">Register &nbsp;</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import VFormBase from "vuetify-form-base";
const required = msg => v => !!v || msg;
const validPhone = msg => v => (!!v && v.length == 12) || msg;
export default {
  components: { VFormBase },
  data() {
    return {
      form: {
        valid: false,
        data: {
          name: "",
          phone: "",
          email: "",
          password: "",
          role: 2
        },
        schema: {
          name: {
            clearable: true,
            type: "text",
            label: "Full Name",
            prependIcon: "mdi-account",
            rules: [required("Name is required.")],
            flex: 12
          },
          phone: {
            clearable: true,
            type: "tel",
            label: "Phone",
            name: "phone",
            prependIcon: "mdi-phone",
            prefix: "0",
            mask: "###-###-####",
            rules: [
              required("Phone is required."),
              validPhone("Phone number must be valid.")
            ],
            flex: 12
          },
          email: {
            clearable: true,
            type: "email",
            label: "Email",
            prependIcon: "mdi-email",
            rules: [required("Phone is required.")],
            flex: 12
          },
          password: {
            clearable: true,
            type: "password",
            label: "Password",
            prependIcon: "mdi-lock",
            rules: [required("Password is required.")],
            flex: 12
          }
        },
        role: {
          clearable: true,
          label: "Account Type",
          items: [
            { text: "Admin", value: 1 },
            { text: "Normal", value: 2 }
          ],
          prependIcon: "mdi-account-tie",
          rules: [required("Account Type is required.")],
          flex: 12
        }
      }
    };
  },
  methods: {
    register() {
      this.$refs.form.validate();
      if (!this.form.valid) return;
      this.$store.dispatch("auth/register", this.form.data);
    }
  }
};
</script>