const state = {
    darkMode: JSON.parse(window.localStorage.getItem("darkMode")) || null
};

const mutations = {
    modeControl(state, data) {
        state.darkMode = data.value;
        window.localStorage.setItem("darkMode", JSON.stringify(data.value));
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
