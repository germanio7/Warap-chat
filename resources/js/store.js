import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth/auth";
import crudx from "./crudx/crudx";
import preferences from "./preferences/preferences";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: auth,
        crudx: crudx,
        preferences: preferences
    }
});
