<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-spacer />
      <v-toolbar-title>{{appName}} {{role == 1 ? 'Admin' : 'Normal'}} Registration</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="register" ref="form" v-model="form.valid">
        <v-form-base :value="form.data" :schema="schema" />
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
  props: {
    role: { required: true, type: Number }
  },
  components: { VFormBase },
  data() {
    return {
      form: {
        valid: false,
        data: {
          name: "",
          phone: "",
          email: "",
          password: ""
        }
      }
    };
  },
  computed: {
    schema() {
      let fields = {
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
          rules: [required("Email is required.")],
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
      };
      if (this.role == 2) return fields;
      if (this.role == 3) return fields;
      return fields;
    }
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
