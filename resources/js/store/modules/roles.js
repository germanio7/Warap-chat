import axios from "axios";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accsess_token");

const state = {
    inProcessRoles: false,
    roles: null,
    permissions: null,
    formRoles: {},
    errorsRoles: null
};

const mutations = {
    fillRoles(state, roles) {
        state.roles = roles;
    },

    fillPermissions(state, permissions) {
        state.permissions = permissions;
    },

    fillFormRoles(state, form) {
        state.formRoles = form;
    },

    fillErrorsRoles(state, errors) {
        state.errorsRoles = errors;
    },

    resetRoles() {
        state.roles = null;
    },

    resetPermissions() {
        state.permissions = null;
    },

    resetFormRoles(state) {
        state.formRoles = {};
    },

    resetErrorsRoles(state) {
        state.errorsRoles = null;
    },

    resetAll() {
        state.roles = null;
        state.permissions = null;
        state.formRoles = {};
        state.errorsRoles = null;
    }
};

const actions = {
    indexRoles: function({ state, commit }, params) {
        state.inProcessRoles = true;
        commit("resetErrorsRoles");
        return new Promise(resolve => {
            axios
                .get("/api/roles", { params: params })
                .then(response => {
                    commit("fillRoles", response.data);
                    state.inProcessRoles = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsRoles", error.response.data);
                    state.inProcessRoles = false;
                    throw new Error(error);
                });
        });
    },

    indexPermissions: function({ state, commit }, params) {
        state.inProcessRoles = true;
        commit("resetErrorsRoles");
        return new Promise(resolve => {
            axios
                .get("/api/roles/show", { params: params })
                .then(response => {
                    commit("fillPermissions", response.data);
                    state.inProcessRoles = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsRoles", error.response.data);
                    state.inProcessRoles = false;
                    throw new Error(error);
                });
        });
    },

    saveRoles: function({ state, commit }) {
        state.inProcessRoles = true;
        commit("resetErrorsRoles");
        return new Promise(resolve => {
            axios
                .post("/api/roles", state.formRoles)
                .then(response => {
                    commit("resetFormRoles");
                    state.inProcessRoles = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsRoles", error.response.data);
                    state.inProcessRoles = false;
                    throw new Error(error);
                });
        });
    },

    editRoles: function({ commit }, params) {
        commit("fillFormRoles", params.data);
    },

    updateRoles: function({ state, commit }, params) {
        state.inProcessRoles = true;
        commit("resetErrorsRoles");
        return new Promise(resolve => {
            axios
                .put("/api/roles/" + params.id, state.formRoles)
                .then(response => {
                    commit("resetFormRoles");
                    state.inProcessRoles = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsRoles", error.response.data);
                    state.inProcessRoles = false;
                    throw new Error(error);
                });
        });
    },

    destroyRoles: function({ state, commit }, params) {
        state.inProcessRoles = true;
        commit("resetErrorsRoles");
        return new Promise(resolve => {
            axios
                .delete("/api/roles/" + params.id)
                .then(response => {
                    state.inProcessRoles = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsRoles", error.response.data);
                    state.inProcessRoles = false;
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
