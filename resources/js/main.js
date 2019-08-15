import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vuetify
import vuetify from "./plugins/vuetify";

// Vue Croppa
import "vue-croppa/dist/vue-croppa.css";
import Croppa from "vue-croppa";
Vue.use(Croppa);

// Vue User Roles
import VueRouterUserRoles from "vue-router-user-roles";
Vue.use(VueRouterUserRoles, { router });

let token = localStorage.getItem("accsess_token");
if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios
        .get("/api/user")
        .then(response => {
            if (response.data.user.role_id != null) {
                Vue.prototype.$user.set({
                    role: response.data.rol.role
                });
            } else {
                Vue.prototype.$user.set({
                    role: "visitor"
                });
            }
        })
        .catch(error => {
            commit("fillErrors", error.response.data);
            state.inProcess = false;
            throw new Error(error);
        });
} else {
    Vue.prototype.$user.set({ role: "unregistered" });
}

//Configuracion Inicial
import InitialsPreferences from "./preferences/InitialsPreferences";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    InitialsPreferences,
    vuetify,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");
