<template>
  <v-container
    class="fill-height"
    style="background-image: url(app-bg.png);
    background-size: 100% 100%;"
    fluid
  >
    <v-content>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-content>
    <c-footer></c-footer>
  </v-container>
</template>

<script>
export default {
  components: {},
  mounted() {},
  data: () => ({})
};
</script>
