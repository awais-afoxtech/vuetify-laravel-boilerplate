import Vue from 'vue';
import Vuex from 'vuex';

import messages from './messages';
import users from './users';
import auth from './auth';

Vue.use(Vuex);

const modules = {
  messages,
  users,
  auth
};

const store = new Vuex.Store({
  modules,
  actions: {},
  getters: {},
  mutations: {
    SET_LOADING(state, {
      value = false,
      message = 'Loading...',
      color = 'white'
    }) {
      state.is_loading.value = value;
      state.is_loading.message = message;
      state.is_loading.color = color;
    },
    SET_NOTIFICATION(state, {
      value = true,
      message = 'New Notification.',
      status = 'green'
    }) {
      state.notification.value = message != '' ? value : false;
      state.notification.message = message;
      state.notification.status = status;
      setTimeout(() => {
        state.notification.value = false
      }, 3000);
    }
  },
  state: {
    theme: 'dark-theme',
    csrfToken: '',
    is_loading: {
      value: false,
      message: "Loading",
      color: 'white'
    },
    notification: {
      value: false,
      message: "New Notification.",
      status: 'green'
    }
  },
});

export default store;