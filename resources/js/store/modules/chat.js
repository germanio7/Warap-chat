import axios from "axios";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accsess_token");

const state = {
    inProcess: false,
    chats: null,
    errors: null
};

const mutations = {
    fillChats(state, chats) {
        state.chats = chats;
    },

    fillErrors(state, errors) {
        state.errors = errors;
    },

    resetChats(state) {
        state.chats = null;
    },

    resetErrors(state) {
        state.errors = null;
    },

    resetAll(state) {
        state.chats = null;
        state.errors = null;
    }
};

const actions = {
    index: function({ state, commit }, params) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .get("/api/chats", { params: params })
                .then(response => {
                    commit("fillChats", response.data);
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

    save: function({ state, commit }, params) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .post("/api/chats", {
                    users: params.users
                })
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
