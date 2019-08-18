const state = {
    chatID: null
};

const mutations = {
    setChatID(state, id) {
        state.chatID = id;
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
