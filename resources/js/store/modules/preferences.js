import axios from "axios";

const state = {
    inProcess: false,
    darkMode: JSON.parse(window.localStorage.getItem("darkMode")) || null,
    darkColors: JSON.parse(window.localStorage.getItem("darkColors")) || null,
    lightColors: JSON.parse(window.localStorage.getItem("lightColors")) || null,
    appName: window.localStorage.getItem("appName") || "",
    errors: null
};

const mutations = {
    modeControl(state, value) {
        state.darkMode = value;
        window.localStorage.setItem("darkMode", JSON.stringify(value));
    },

    darkControl(state, color) {
        state.darkColors[color.name] = color.value;

        this.$vuetify.theme.themes.dark = state.darkColors;
        window.localStorage.setItem(
            "darkColors",
            JSON.stringify(state.darkColors)
        );
    },

    lightControl(state, color) {
        state.lightColors[color.name] = color.value;
        window.localStorage.setItem(
            "lightColors",
            JSON.stringify(state.lightColors)
        );
    },

    fillAppName(state, name) {
        state.appName = name;
    },

    fillErrors(state, errors) {
        state.errors = errors;
    },

    resetErrors(state) {
        state.errors = null;
    }
};

const actions = {
    updateAppName: function({ state, commit }, data) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .post(data.url, data)
                .then(response => {
                    commit("fillAppName", data.appName);
                    window.localStorage.setItem("appName", data.appName);
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrors", error.response.data);
                    throw new Error(error);
                });
        });
    },

    updateAppLogo: function({ state, commit }, data) {
        state.inProcess = true;
        commit("resetErrors");
        return new Promise(resolve => {
            axios
                .post(data.url, data)
                .then(response => {
                    state.inProcess = false;
                    resolve(response.data);
                })
                .catch(error => {
                    commit("fillErrors", error.response.data);
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
