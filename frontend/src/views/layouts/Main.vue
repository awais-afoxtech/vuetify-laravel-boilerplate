<template>
  <div>
    <v-navigation-drawer app></v-navigation-drawer>

    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-btn @click="$store.dispatch('auth/logout')" title="Logout" right icon>
        <icon icon="logout"></icon>
      </v-btn>
    </v-app-bar>

    <v-content app>
      <v-container fluid>
        <Icon></Icon>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app inset></v-footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {},
  data: () => ({})
};
</script>
