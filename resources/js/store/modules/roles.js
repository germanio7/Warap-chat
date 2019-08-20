import axios from "axios";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accsess_token");

const state = {
    inProcess: false,
    roles: null,
    permissions: null,
    form: {},
    errors: null
};

const mutations = {
    fillRoles(state, roles) {
        state.roles = roles;
    },

    fillPermissions(state, permissions) {
        state.permissions = permissions;
    },

    fillForm(state, form) {
        state.form = form;
    },

    fillErrors(state, errors) {
        state.errors = errors;
    },

    resetRoles() {
        state.roles = null;
    },

    resetPermissions() {
        state.permissions = null;
    },

    resetForm(state) {
        state.form = {};
    },

    resetErrors(state) {
        state.errors = null;
    },

    resetAll() {
        state.roles = null;
        state.permissions = null;
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
                .get("/api/roles", { params: params })
                .then(response => {
                    commit("fillRoles", response.data);
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
                .get("/api/roles/show", { params: params })
                .then(response => {
                    commit("fillPermissions", response.data);
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
                .post("/api/roles", state.form)
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
                .put("/api/roles/" + params.id, state.form)
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
                .delete("/api/roles/" + params.id)
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
