/* eslint-disable*/
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify';
import helpers from '@/utils/helpers';
import http from '@/utils/http';
import VueTheMask from 'vue-the-mask';
const moment = require('moment');
import '@/utils/mixins';
import '@/components/global';
import '@mdi/font/css/materialdesignicons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';



Vue.config.productionTip = false;
Vue.prototype.$helpers = helpers;
Vue.prototype.$http = http;
Vue.use(VueTheMask);
Vue.use(require('vue-moment'), {
  moment
});

const initVue = () => {
  return new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
};

const init = () => {
  // http.getCsrfToken();
  store.dispatch('auth/initAuth');
  initVue();
};

const isCordovaApp = typeof window.cordova !== 'undefined';

document.addEventListener('deviceready', () => init());

if (!isCordovaApp)
  document.dispatchEvent(new CustomEvent('deviceready', {}));