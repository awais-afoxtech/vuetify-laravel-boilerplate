<template>
  <v-card
    style="bottom:5px;left:0;right:0;margin:0 auto;position:fixed;width:100% !important;max-width:400px; height:auto;z-index:999;"
    v-if="value"
    dark
  >
    <v-alert
      class="ma-0"
      dense
      v-model="value"
      dismissible
      outlined
      prominent
      border="left"
      :type="status"
    >{{ message }}</v-alert>
  </v-card>
</template>

<script>
export default {
  computed: {
    value: {
      set(value) {
        this.$store.commit("SET_NOTIFICATION", {
          value: value
        });
      },
      get() {
        return this.$store.state.notification.value;
      }
    },
    message() {
      return this.$store.state.notification.message;
    },
    status() {
      return this.$store.state.notification.status;
    }
  },
  methods: {
    close() {
      this.$store.commit("SET_NOTIFICATION", {
        value: false
      });
    }
  }
};
</script>
