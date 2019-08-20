const state = {
    mode: "chat"
};

const mutations = {
    setMode(state, data) {
        state.mode = data.mode;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
