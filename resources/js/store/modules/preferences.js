const state = {
    darkMode: JSON.parse(window.localStorage.getItem("darkMode")) || null
};

const mutations = {
    modeControl(state, value) {
        state.darkMode = value;
        window.localStorage.setItem("darkMode", JSON.stringify(value));
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
