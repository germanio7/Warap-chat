import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

var mode = false;
var dark = {};
var light = {};

let lightColorsStorage = localStorage.getItem("lightColors");

if (lightColorsStorage == null) {
    let darkColors = {
        primary: "#25D366",
        secondary: "#128C7E",
        accent: "#075E54",
        error: "#F44336",
        info: "#34B7F1",
        success: "#4CAF50",
        warning: "#FFC107"
    };

    let lightColors = {
        primary: "#25D366",
        secondary: "#128C7E",
        accent: "#075E54",
        error: "#F44336",
        info: "#34B7F1",
        success: "#4CAF50",
        warning: "#FFC107"
    };

    window.localStorage.setItem("darkMode", JSON.stringify(false));
    window.localStorage.setItem("darkColors", JSON.stringify(darkColors));
    window.localStorage.setItem("lightColors", JSON.stringify(lightColors));

    mode = false;
    dark = darkColors;
    light = lightColors;
} else {
    mode = JSON.parse(window.localStorage.getItem("darkMode"));
    dark = JSON.parse(window.localStorage.getItem("darkColors"));
    light = JSON.parse(window.localStorage.getItem("lightColors"));
}

export default new Vuetify({
    theme: {
        dark: mode,
        themes: {
            dark: dark,
            light: light
        }
    },
    options: {
        customProperties: true
    },
    icons: {
        iconfont: "fa"
    },
    lang: {
        locales: { es },
        current: "es"
    }
});
