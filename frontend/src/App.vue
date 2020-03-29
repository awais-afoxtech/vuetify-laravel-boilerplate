<template>
  <v-app :class="themeClass">
    <Loading></Loading>
    <router-view></router-view>
    <Notification></Notification>
  </v-app>
</template>

<script>
import Loading from "@/components/helper/Loading";
import Notification from "@/components/helper/Notification";

export default {
  name: "App",
  components: { Loading, Notification },
  computed: {
    themeClass() {
      return this.$store.state.theme;
    }
  },
  mounted() {
    this.$vuetify.theme.dark =
      this.$store.state.theme.split("-")[0] == "dark" ? true : false;
  },
  data: () => ({}),
  methods: {}
};
</script>
