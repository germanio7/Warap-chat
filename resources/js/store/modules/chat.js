import axios from "axios";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accsess_token");

const state = {
    chats: null,
    errorsChat: null,
    chatID: null
};

const mutations = {
    fillChats(state, chats) {
        state.chats = chats;
    },

    fillErrorsChats(state, errors) {
        state.errorsChat = errors;
    },

    resetChats(state) {
        state.chats = null;
    },

    resetErrorsChats(state) {
        state.errorsChat = null;
    },

    resetAll(state) {
        state.chats = null;
        state.errorsChat = null;
    },

    setChatID(state, id) {
        state.chatID = id;
    }
};

const actions = {
    indexChat: function({ state, commit }, params) {
        commit("resetErrorsChats");
        return new Promise(resolve => {
            axios
                .get("/api/chats", { params: params })
                .then(response => {
                    commit("fillChats", response.data);
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsChats", error.response.data);
                    state.inProcess = false;
                    throw new Error(error);
                });
        });
    },

    saveChat: function({ state, commit }, params) {
        commit("resetErrorsChats");
        return new Promise(resolve => {
            axios
                .post("/api/chats", {
                    users: params.users
                })
                .then(response => {
                    commit("resetForm");
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrorsChats", error.response.data);
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
