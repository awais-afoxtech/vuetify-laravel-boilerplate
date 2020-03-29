/* eslint-disable no-unused-vars */

import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import helpers from '@/utils/helpers';

axios.defaults.baseURL = helpers.baseUrl();
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf-8;multipart/form-data";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["apiKey"] = "wholesale-1qaz2wsx3edec-0okmnj9";
axios.defaults.validateStatus = (status =>
    status === 422 ||
    status === 401 ||
    status === 403 ||
    status === 412 ||
    status >= 200 &&
    status < 300
);

var http = {

    async getCsrfToken() {
        let token = helpers.cookies()['XSRF-TOKEN'];
        if (typeof token == 'undefined')
            return await http.get('/api/sanctum/csrf-cookie').then(() => {
                let newToken = helpers.cookies()['XSRF-TOKEN'];
                if (typeof newToken == 'undefined') {
                    this.getCsrfToken();
                } else {
                    return true;
                }
            });
    },

    async get(url, loading = true) {
        try {
            store.commit('SET_LOADING', {
                value: loading
            });

            return await axios.get(url).then(({
                data
            }) => {
                if (data) {
                    store.commit("SET_NOTIFICATION", data);
                    return data;
                }
            });

        } catch (err) {
            console.log('get request error.', err);
        } finally {
            store.commit('SET_LOADING', {});
        }
    },

    async post(url, data, loading = true) {
        try {
            store.commit('SET_LOADING', {
                value: loading
            });

            return await axios.post(url, helpers.jsonToFormData(data)).then(({
                data
            }) => {
                if (data) {
                    store.commit("SET_NOTIFICATION", data);
                    return data;
                }
            });

        } catch (err) {
            console.log('post request error.', err);
        } finally {
            store.commit('SET_LOADING', {});
        }
    }

}

Vue.use(http);

export default http;