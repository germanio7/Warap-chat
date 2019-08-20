import axios from "axios";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accsess_token");

const state = {
    inProcess: false,
    users: null,
    user: null,
    form: {},
    errors: null
};

const mutations = {
    fillUsers(state, users) {
        state.users = users;
    },

    fillUser(state, user) {
        state.user = user;
    },

    fillForm(state, form) {
        state.form = form;
    },

    fillErrors(state, errors) {
        state.errors = errors;
    },

    resetUsers(state) {
        state.users = null;
    },

    resetUser(state) {
        state.user = null;
    },

    resetForm(state) {
        state.form = {};
    },

    resetErrors(state) {
        state.errors = null;
    },

    resetAll(state) {
        state.users = null;
        state.user = null;
        state.form = {};
        state.errors = null;
    }
};

const actions = {
    index: function({ state, commit }, params) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .get("/api/users", { params: params })
                .then(response => {
                    commit("fillUsers", response.data);
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

    show: function({ state, commit }, params) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .get("/api/user/" + params.id, { params: params })
                .then(response => {
                    commit("fillUser", response.data);
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

    save: function({ state, commit }) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .post("/api/users", state.form)
                .then(response => {
                    commit("resetForm");
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

    edit: function({ commit }, params) {
        commit("fillForm", params.data);
    },

    update: function({ state, commit }, params) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .put("/api/users/" + params.id, state.form)
                .then(response => {
                    commit("resetForm");
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

    destroy: function({ state, commit }, params) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .delete("/api/users/" + params.id)
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
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
