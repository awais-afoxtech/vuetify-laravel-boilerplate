import Vue from 'vue';

var mixin = {
    data() {
        return {
            offsetTop: window.pageYOffset || document.documentElement.scrollTop,
            is_cordova: process.env.CORDOVA_PLATFORM
        };
    },
    mounted() {
        document.addEventListener("scroll", () => (this.offsetTop = window.pageYOffset || document.documentElement.scrollTop));
    },
    computed: {},
    watch: {},
    methods: {
        back() {
            this.$router.go(-1);
        },
        goTo(routeName) {
            this.$router.push({
                name: routeName
            });
        },
        showLoader(message = null) {
            this.hideMessage();
            document.dispatchEvent(
                new CustomEvent("showLoader", {
                    bubbles: true,
                    detail: {
                        text: message
                    }
                })
            );
        },
        hideLoader() {
            document.dispatchEvent(new CustomEvent("hideLoader", {}));
        },
        showMessage(message, time = null) {
            if (Object.keys(message).includes("error_obj"))
                message.message = Object.values(message.error_obj)[0][0];

            document.dispatchEvent(
                new CustomEvent("showMessage", {
                    bubbles: true,
                    detail: {
                        data: message,
                        time: time
                    }
                })
            );
        },
        hideMessage() {
            document.dispatchEvent(new CustomEvent("hideMessage", {}));
        },
        responseErrorMsg() {
            this.hideLoader();
            this.showMessage({
                code: 203,
                status: "error",
                message: "Seems internet issue or contact IT team."
            });
        }
    }
}

Vue.mixin(mixin);

export default mixin;