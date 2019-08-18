import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./routes/router";
import store from "./store/store";

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
let aplicationName = window.localStorage.getItem("appName");
if (!aplicationName) {
    axios
        .get("/api/preferences")
        .then(response => {
            window.localStorage.setItem("appName", response.data.appName);
            document.getElementById("appTitle").innerHTML =
                response.data.appName;
        })
        .catch(error => {
            console.log(error);
        });
}

document.getElementById("appTitle").innerHTML =
    window.localStorage.getItem("appName") || "";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");
