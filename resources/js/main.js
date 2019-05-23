import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vuetify";
import "@fortawesome/fontawesome-free/css/all.css";

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
    render: function(h) {
        return h(App);
    }
}).$mount("#app");
