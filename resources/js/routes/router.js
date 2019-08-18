import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

//Auth Views
import Register from "../views/auth/Register.vue";
import Login from "../views/auth/Login.vue";

//Roles Views
import Roles from "../views/roles/Roles.vue";

//Users Views
import Users from "../views/users/Users.vue";

//Permisos
import permissions from "./permissions";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "",
            meta: {
                permissions: permissions.nothing
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
                permissions: permissions.unregistered
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                permissions: permissions.unregistered
            }
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                permissions: permissions.visitor
            }
        },

        //Roles Routes
        {
            path: "/roles",
            name: "roles",
            component: Roles,
            meta: {
                permissions: permissions.superAdmin
            }
        },

        //Users Routes
        {
            path: "/users",
            name: "users",
            component: Users,
            meta: {
                permissions: permissions.administrador
            }
        }
    ]
});
