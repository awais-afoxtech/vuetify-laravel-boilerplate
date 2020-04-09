/* eslint-disable no-unused-vars */
import http from "@/utils/http";
import helpers from "@/utils/helpers";
import router from "@/router";
import axios from 'axios';
import store from "@/store";

export default {
  namespaced: true,
  state: {
    user: null,
    user_role: 0,
    auth_token: null,
    userRoles: helpers.userRoles()
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.user_role = user == null ? 0 : user.role;
      helpers.storageSet('user', user);
    },
    SET_AUTH_TOKEN(state, token) {
      state.auth_token = token;
      helpers.storageSet('auth_token', token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
  getters: {},
  actions: {
    initAuth({
      commit
    }) {
      if (helpers.storageGet('auth_token') &&
        helpers.storageGet('auth_token') != null &&
        typeof helpers.storageGet('auth_token') != "undefined" &&
        helpers.storageGet('user') &&
        helpers.storageGet('user') != null &&
        typeof helpers.storageGet('user') != "undefined"
      ) {
        commit('SET_USER', helpers.storageGet('user'));
        commit('SET_AUTH_TOKEN', helpers.storageGet('auth_token'));
      } else {
        helpers.storageClear();
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
            name: helpers.getRoleHome(res.data.user.role)
          });
        }
      });
    },

    async register({
      commit,
      state
    }, data) {

      data['device_name'] = helpers.getUA();

      return http.post('/api/register', data).then(res => {
        console.log('register response', res);
        if (res.code == 200) {
          commit('SET_AUTH_TOKEN', res.data.auth_token);
          commit('SET_USER', res.data.user);
          router.replace({
            name: helpers.getRoleHome(res.data.user.role)
          });
        }
      });
    },

    async logout({
      commit
    }) {
      let data = {
        user_id: store.state.auth.user.id,
        token: store.state.auth.auth_token
      };

      return http.post('/api/logout', data).then(() => {
        commit('SET_USER', null);
        commit('SET_AUTH_TOKEN', null);
        router.replace({
          name: 'Login'
        });
      });
    },
  },
};