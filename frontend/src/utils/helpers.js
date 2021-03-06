import routes from '@/router/routes';


class Helper {
    constructor() {}
    navigationsList() {
        let allRoutes = this.pluck(routes, 'children');
        return allRoutes;
    }

    userRoles() {
        return {
            Guest: {
                val: 0,
                homePage: 'Login'
            },
            Admin: {
                val: 1,
                homePage: 'AdminHome'
            },
            Normal: {
                val: 2,
                homePage: 'NormalHome'
            },
        }
    }

    getRoleHome(roleVal) {
        for (const role in this.userRoles()) {
            if (this.userRoles()[role].val == roleVal)
                return this.userRoles()[role].homePage;
        }
    }

    getRoleName(roleVal) {
        for (const role in this.userRoles()) {
            if (this.userRoles()[role].val == roleVal)
                return role;
        }
    }

    storageGet($key) {
        let value = window.localStorage.getItem($key);
        return JSON.parse(value);
    }

    storageSet($key, $value) {
        this.storageRemove($key);
        return window.localStorage.setItem($key, JSON.stringify($value));
    }

    storageRemove($key) {
        return window.localStorage.removeItem($key);
    }

    storageClear() {
        return window.localStorage.clear();
    }

    cookies(key = null) {
        let cookies = [];
        let allCookies = document.cookie;
        if (allCookies != '') {
            let cookieArray = allCookies.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i].split('=');
                cookies[cookie[0]] = cookie[1];
            }
            if (key)
                return cookies[key];
        }
        return cookies;
    }

    getUA() {
        let device = "Unknown";
        const ua = {
            "Generic Linux": /Linux/i,
            "Android": /Android/i,
            "BlackBerry": /BlackBerry/i,
            "Bluebird": /EF500/i,
            "Chrome OS": /CrOS/i,
            "Datalogic": /DL-AXIS/i,
            "Honeywell": /CT50/i,
            "iPad": /iPad/i,
            "iPhone": /iPhone/i,
            "iPod": /iPod/i,
            "macOS": /Macintosh/i,
            "Windows": /IEMobile|Windows/i,
            "Zebra": /TC70|TC55/i,
        }
        Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));
        return device;
    }

    isJson(str) {
        if (typeof str !== "string") return false;
        try {
            const result = JSON.parse(str);
            const type = Object.prototype.toString.call(result);
            return type === "[object Object]" || type === "[object Array]";
        } catch (err) {
            return false;
        }
    }

    pluck(arr, key) {
        return arr.map(o => {
            return (typeof o[key] !== 'undefined') ? o[key] : null;
        });
    }

    buildFormData(formData, data, parentKey) {
        if (
            data &&
            typeof data === "object" &&
            !(data instanceof Date) &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach(key => {
                this.buildFormData(
                    formData,
                    data[key],
                    parentKey ? `${parentKey}[${key}]` : key
                );
            });
        } else {
            const value = data == null ? "" : data;

            formData.append(parentKey, value);
        }
    }
    jsonToFormData(data) {
        const formData = new FormData();

        this.buildFormData(formData, data);

        return formData;
    }
    rendString(length = 8) {
        var timestamp = new Date;
        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var randomStr = function () {
            var ts = timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "";

            for (var i = 0; i < length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }
            id.replace(' ', '');
            id.replace(' ', '');
            return id;
        }
        return randomStr();
    }
    randomNumber(min = 111111, max = 999999) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    apiEndPoint() {
        return window.location.origin.includes('localhost') ?
            'http://localhost:8000' :
            window.location.origin + '/backend/public';
    }

}

export default new Helper();