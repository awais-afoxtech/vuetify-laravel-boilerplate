import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import {
    Touch
} from 'vuetify/lib/directives';
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
    directives: {
        Touch,
    }
});

export default new Vuetify({
    theme: {
        themes: {
            light: {
                // primary: "#ee44aa",
                // primary: "#ff9800",
                // secondary: "#424242",
                // accent: "#82B1FF",
                // error: "#FF5252",
                // info: "#2196F3",
                // success: "#4CAF50",
                // warning: "#FFC107"
            }
        }
    },
    icons: {
        iconfont: "mdi"
    }
});