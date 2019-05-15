import axios from 'axios'
import router from '../router'

const auth = {

  namespaced: true,
  
  state: {

    inProcess: false,
    token: localStorage.getItem('accsess_token') || null,
    user: {},
    form: {},
    errors: null

  },
  
  mutations: {

    fillToken(state, data) {
      state.token = data;
    },

    fillForm(state, data) {
      state.form = data;
    },

    fillErrors(state, data) {
      state.errors = data;
    },

    resetToken(state) {
      state.token = null;
    },

    resetForm(state) {
      state.form = {};
    },

    resetErrors(state) {
      state.errors = null;
    },

  },
  
  actions: {

    login: function({ state, commit }) {
      state.inProcess = true;
      commit('resetErrors');
      if(state.form.email) {
        state.form.username = state.form.email;
      }
      axios.post('/api/login', state.form).then((response) => {
        console.log(response.data);
        let token = response.data.access_token;
        localStorage.setItem('accsess_token', token);
        commit('fillToken', token);
        commit('resetForm');
        router.push('/user');
        state.inProcess = false;
      }).catch((error)=>{
        commit('fillErrors', error.response.data);
        state.inProcess = false;
      });
    },

    register: function({ state, commit, dispatch }) {
      commit('resetErrors');
      axios.post('/api/register', state.form).then((response) => {
        dispatch('login');
      }).catch((error)=>{
        commit('fillErrors', error.response.data);
      });
    },

    logout: function({ state, commit }) {
      state.inProcess = true;
      commit('resetErrors');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
      axios.post('/api/logout').then((response) => {
        localStorage.removeItem('accsess_token');
        commit('resetToken');
        router.push('/');
        state.inProcess = false;
      }).catch((error)=>{
        localStorage.removeItem('accsess_token');
        commit('resetToken');
        commit('fillErrors', error.response.data);
        state.inProcess = false;
      });
    },

  }
  
}

export default auth
