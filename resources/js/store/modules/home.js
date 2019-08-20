const state = {
    mode: "chat"
};

const mutations = {
    setMode(state, mode) {
        state.mode = mode;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
