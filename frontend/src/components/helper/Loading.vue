<template>
  <v-overlay :value="value" class="text-center" style="z-index:999;">
    <!-- <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear> -->
    <v-progress-circular :color="color" indeterminate size="64"></v-progress-circular>
    <h3 class="pt-6">{{message}}</h3>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    value() {
      return this.$store.state.is_loading.value;
    },
    message() {
      return this.$store.state.is_loading.message;
    },
    color() {
      return this.$store.state.is_loading.color;
    }
  }
};
</script>
