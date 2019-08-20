import Vue from "vue";
import Vuex from "vuex";

// Modules
import crudx from "./modules/crudx";
import auth from "./modules/auth";
import home from "./modules/home";
import users from "./modules/users";
import roles from "./modules/roles";
import preferences from "./modules/preferences";
import chat from "./modules/chat";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        crudx: crudx,
        auth: auth,
        home: home,
        users: users,
        roles: roles,
        preferences: preferences,
        chat: chat
    }
});
