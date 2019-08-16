import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

//Auth Views
import Register from "./auth/views/Register.vue";
import Login from "./auth/views/Login.vue";
import Main from "./views/Main.vue";

//Roles Views
import Roles from "./auth/views/Roles.vue";

//Users Views
import Users from "./auth/views/Users.vue";

//Preferences Views
import Preferences from "./preferences/views/Preferences.vue";

//Permisos

const unregistered = [
    {
        role: "unregistered",
        access: true
    },
    {
        role: "visitor",
        access: false,
        redirect: "main"
    },
    {
        role: "superAdmin",
        access: false,
        redirect: "main"
    },
    {
        role: "administrador",
        access: false,
        redirect: "main"
    }
];

const visitor = [
    {
        role: "unregistered",
        access: false,
        redirect: "login"
    },
    {
        role: "visitor",
        access: true
    },
    {
        role: "superAdmin",
        access: true
    },
    {
        role: "administrador",
        access: true
    }
];

const administrador = [
    {
        role: "unregistered",
        access: false,
        redirect: "login"
    },
    {
        role: "visitor",
        access: false,
        redirect: "main"
    },
    {
        role: "superAdmin",
        access: true
    },
    {
        role: "administrador",
        access: true
    }
];

const superAdmin = [
    {
        role: "unregistered",
        access: false,
        redirect: "login"
    },
    {
        role: "visitor",
        access: false,
        redirect: "main"
    },
    {
        role: "superAdmin",
        access: true
    },
    {
        role: "administrador",
        access: false,
        redirect: "main"
    }
];

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "",
            name: "home",
            component: Home,
            meta: {
                permissions: [
                    {
                        role: "unregistered",
                        access: false,
                        redirect: "main"
                    },
                    {
                        role: "visitor",
                        access: false,
                        redirect: "main"
                    },
                    {
                        role: "superAdmin",
                        access: false,
                        redirect: "main"
                    },
                    {
                        role: "administrador",
                        access: false,
                        redirect: "main"
                    }
                ]
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
                permissions: unregistered
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                permissions: unregistered
            }
        },
        {
            path: "/main",
            name: "main",
            component: Main,
            meta: {
                permissions: visitor
            }
        },

        //Roles Routes
        {
            path: "/roles",
            name: "roles",
            component: Roles,
            meta: {
                permissions: superAdmin
            }
        },

        //Users Routes
        {
            path: "/users",
            name: "users",
            component: Users,
            meta: {
                permissions: administrador
            }
        },

        //Preferences Routes
        {
            path: "/preferences",
            name: "preferences",
            component: Preferences,
            meta: {
                permissions: visitor
            }
        }
    ]
});
