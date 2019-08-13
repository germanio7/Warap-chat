import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vuetify
import vuetify from "./plugins/vuetify";

// Vue Croppa
import "vue-croppa/dist/vue-croppa.css";
import Croppa from "vue-croppa";
Vue.use(Croppa);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.auth.token == null) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.state.auth.token != null) {
            next({
                path: "/account"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");
