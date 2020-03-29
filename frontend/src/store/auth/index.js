/* eslint-disable no-unused-vars */
import http from "@/utils/http";
import helpers from "@/utils/helpers";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    user: null,
    user_role: 0,
    auth_token: null,
    userTypes: helpers.userTypes()
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.user_role = user == null ? 0 : user.role;
      helpers.storageSet('user', user);
    },
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      helpers.storageSet('auth_token', token);
    }
  },
  getters: {},
  actions: {
    initAuth({
      commit
    }) {
      if (helpers.storageGet('auth_token') && helpers.storageGet('user')) {
        commit('SET_USER', helpers.storageGet('user'));
        commit('SET_AUTH_TOKEN', helpers.storageGet('auth_token'));
      }
    },

    async login({
      commit
    }, data) {

      data['device_name'] = helpers.getUA();

      http.post('/api/login', data).then(res => {
        if (res.code == 200) {
          commit('SET_USER', res.data.user);
          commit('SET_AUTH_TOKEN', res.data.auth_token);
          router.replace({
            name: 'Home'
          });
        }
      });
    },

    async logout({
      commit
    }) {
      commit('SET_USER', null);
      commit('SET_AUTH_TOKEN', null);
      http.get('/api/logout', false);
      router.replace({
        name: 'Login'
      });
    },

    async register() {},

    async getUser() {}
  },
};