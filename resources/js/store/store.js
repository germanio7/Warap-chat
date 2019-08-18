import Vue from "vue";
import Vuex from "vuex";

// Modules
import auth from "./modules/auth";
import crudx from "./modules/crudx";
import preferences from "./modules/preferences";
import chat from "./modules/chat";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: auth,
        crudx: crudx,
        preferences: preferences,
        chat: chat
    }
});
