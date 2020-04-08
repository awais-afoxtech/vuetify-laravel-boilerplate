<template>
  <v-app>
    <v-app-bar :dense="$vuetify.breakpoint.mdAndDown" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <span>App</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <icon icon="refresh"></icon>
      </v-btn>
      <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon color="white" dark v-on="on">
            <icon icon="dots-vertical"></icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item @click="logout()">
              <v-list-item-title>Logout</v-list-item-title>
              <v-list-item-action>
                <icon icon="logout"></icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <c-footer></c-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {},
  data: () => ({
    menu: false
  }),
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>
