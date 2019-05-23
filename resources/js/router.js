import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

//Auth Components
import Register from "./auth/views/Register.vue";
import Login from "./auth/views/Login.vue";
import Account from "./auth/views/Account.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: "*",
            component: NotFound
        },

        //Auth Routes
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: "/account",
            name: "account",
            component: Account,
            meta: {
                requiresAuth: true
            }
        }
    ]
});
