import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: "#41B883",
                secondary: "#ffffff",
                accent: "#41B883",
                error: "#F44336",
                info: "#00BCD4",
                success: "#4CAF50",
                warning: "#FFC107"
            },

            light: {
                primary: "#41B883",
                secondary: "#34495E",
                accent: "#41B883",
                error: "#F44336",
                info: "#00BCD4",
                success: "#4CAF50",
                warning: "#FFC107"
            }
        }
    },
    options: {
        customProperties: true
    },
    iconfont: "fa",
    lang: {
        locales: { es },
        current: "es"
    }
});
