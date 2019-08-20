import axios from "axios";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accsess_token");

const state = {
    inProcessUsers: false,
    users: null,
    user: null,
    formUsers: {},
    errorsUsers: null
};

const mutations = {
    fillUsers(state, users) {
        state.users = users;
    },

    fillUser(state, user) {
        state.user = user;
    },

    fillFormUsers(state, form) {
        state.formUsers = form;
    },

    fillErrorsUsers(state, errors) {
        state.errorsUsers = errors;
    },

    resetUsers(state) {
        state.users = null;
    },

    resetUser(state) {
        state.user = null;
    },

    resetFormUsers(state) {
        state.formUsers = {};
    },

    resetErrorsUsers(state) {
        state.errorsUsers = null;
    },

    resetAll(state) {
        state.users = null;
        state.user = null;
        state.formUsers = {};
        state.errorsUsers = null;
    }
};

const actions = {
    indexUsers: function({ state, commit }, params) {
        state.inProcessUsers = true;
        commit("resetErrorsUsers");
        return new Promise(resolve => {
            axios
                .get("/api/users", { params: params })
                .then(response => {
                    commit("fillUsers", response.data);
                    state.inProcessUsers = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsUsers", error.response.data);
                    state.inProcessUsers = false;
                    throw new Error(error);
                });
        });
    },

    showUsers: function({ state, commit }, params) {
        state.inProcessUsers = true;
        commit("resetErrorsUsers");
        return new Promise(resolve => {
            axios
                .get("/api/user/" + params.id, { params: params })
                .then(response => {
                    commit("fillUser", response.data);
                    state.inProcessUsers = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsUsers", error.response.data);
                    state.inProcessUsers = false;
                    throw new Error(error);
                });
        });
    },

    saveUsers: function({ state, commit }) {
        state.inProcessUsers = true;
        commit("resetErrorsUsers");
        return new Promise(resolve => {
            axios
                .post("/api/users", state.formUsers)
                .then(response => {
                    commit("resetFormUsers");
                    state.inProcessUsers = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsUsers", error.response.data);
                    state.inProcessUsers = false;
                    throw new Error(error);
                });
        });
    },

    editUsers: function({ commit }, params) {
        commit("fillFormUsers", params.data);
    },

    updateUsers: function({ state, commit }, params) {
        state.inProcessUsers = true;
        commit("resetErrorsUsers");
        return new Promise(resolve => {
            axios
                .put("/api/users/" + params.id, state.formUsers)
                .then(response => {
                    commit("resetFormUsers");
                    state.inProcessUsers = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsUsers", error.response.data);
                    state.inProcessUsers = false;
                    throw new Error(error);
                });
        });
    },

    destroyUsers: function({ state, commit }, params) {
        state.inProcessUsers = true;
        commit("resetErrorsUsers");
        return new Promise(resolve => {
            axios
                .delete("/api/users/" + params.id)
                .then(response => {
                    state.inProcessUsers = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsUsers", error.response.data);
                    state.inProcessUsers = false;
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
