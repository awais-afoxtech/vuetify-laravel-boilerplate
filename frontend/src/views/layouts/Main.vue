<template>
  <v-app>
    <v-app-bar :dense="$vuetify.breakpoint.mdAndDown" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="navDrawer = !navDrawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <span>{{appName}}</span>
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
    <v-navigation-drawer v-model="navDrawer" app>
      <v-list :dense="$vuetify.breakpoint.mdAndDown" nav class="py-0">
        <v-list-item color="primary">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{$store.state.auth.user.name}}</v-list-item-title>
            <v-list-item-subtitle>{{$store.state.auth.user_role_name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          active-class="primary--text"
          :to="{name:navigation.route}"
          v-for="navigation in navigations"
          :key="navigation.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ navigation.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ navigation.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <c-footer></c-footer>
  </v-app>
</template>

<script>
import navs from "@/utils/navigations";
export default {
  name: "App",
  data: () => ({
    menu: false,
    navDrawer: true
  }),
  computed: {
    navigations() {
      return navs[this.$store.state.auth.user_role_name];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>
