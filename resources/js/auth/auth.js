import axios from "axios";

const state = {
    inProcess: false,
    token: localStorage.getItem("accsess_token") || null,
    user: {},
    profile: "",
    rol: "",
    permission: {},
    form: {},
    errors: null
};

const getters = {
    account: state => {
        return {
            user: state.user,
            profile: state.profile,
            rol: state.rol,
            permission: state.permission
        };
    }
};

const mutations = {
    fillToken(state, token) {
        state.token = token;
    },

    fillUser(state, user) {
        state.user = user;
    },

    fillProfile(state, profile) {
        state.profile = profile;
    },

    fillRol(state, rol) {
        state.rol = rol;
    },

    fillPermission(state, permission) {
        state.permission = permission;
    },

    fillForm(state, form) {
        state.form = form;
    },

    fillErrors(state, errors) {
        state.errors = errors;
    },

    resetForm(state) {
        state.form = {};
    },

    resetErrors(state) {
        state.errors = null;
    },

    resetAll(state) {
        state.token = null;
        state.user = {};
        state.profile = "";
        state.rol = {};
        state.permission = {};
        state.form = {};
        state.errors = null;
    }
};

const actions = {
    register: function({ state, commit, dispatch }) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .post("/api/register", state.form)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrors", error.response.data);
                    throw new Error(error);
                });
        });
    },

    editAccount: function({ state, commit }) {
        commit("fillForm", state.user);
    },

    updateAccount: function({ state, commit }) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .post("/api/update_user", state.form)
                .then(response => {
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrors", error.response.data);
                    state.inProcess = false;
                    throw new Error(error);
                });
        });
    },

    login: function({ state, commit, dispatch }) {
        state.inProcess = true;
        commit("resetErrors");
        if (state.form.email) {
            state.form.username = state.form.email;
        }
        return new Promise(resolve => {
            axios
                .post("/api/login", state.form)
                .then(response => {
                    let token = response.data.access_token;
                    localStorage.setItem("accsess_token", token);
                    commit("fillToken", token);
                    commit("resetForm");
                    dispatch("getUser");
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrors", error.response.data);
                    state.inProcess = false;
                    throw new Error(error);
                });
        });
    },

    getUser: function({ state, commit, dispatch }) {
        state.inProcess = true;
        commit("resetErrors");
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.token;
        return new Promise(resolve => {
            axios
                .get("/api/user")
                .then(response => {
                    commit("fillUser", response.data.user);
                    dispatch("profile", response.data.user.name);
                    commit("fillRol", response.data.rol.role);
                    commit("fillPermission", response.data.permission);
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrors", error.response.data);
                    state.inProcess = false;
                    throw new Error(error);
                });
        });
    },

    profile: function({ commit }, name) {
        let arrayname = name.split(" ");
        let profile = "";

        for (let i = 0; i < arrayname.length; i++) {
            for (let e = 0; e < 1; e++) {
                profile = profile + arrayname[i][e];
            }
        }

        commit("fillProfile", profile);
    },

    logout: function({ state, commit }) {
        state.inProcess = true;
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.token;
        return new Promise(resolve => {
            axios
                .post("/api/logout")
                .then(response => {
                    localStorage.removeItem("accsess_token");
                    commit("resetAll");
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    localStorage.removeItem("accsess_token");
                    commit("resetAll");
                    commit("fillErrors", error.response.data);
                    state.inProcess = false;
                    throw new Error(error);
                });
        });
    },

    deleteAccount: function({ state, commit }) {
        state.inProcess = true;
        commit("resetErrors");
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.token;
        return new Promise(resolve => {
            axios
                .post("/api/delete_user")
                .then(response => {
                    localStorage.removeItem("accsess_token");
                    commit("resetAll");
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    localStorage.removeItem("accsess_token");
                    commit("resetAll");
                    commit("fillErrors", error.response.data);
                    state.inProcess = false;
                    throw new Error(error);
                });
        });
    }
};

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
};
