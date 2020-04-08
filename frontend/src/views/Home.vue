<template>
  <v-container>
    <v-card class="fill-height">
      <div class="home">{{$helpers.getRoleName($store.state.auth.user.role)}} Home Page</div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      data: {}
    };
  },
  methods: {}
};
</script>
