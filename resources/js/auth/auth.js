import axios from 'axios'
import router from '../router'

const state = {

  inProcess: false,
  token: localStorage.getItem('accsess_token') || null,
  user: {},
  rol: {},
  permission: {},
  form: {},
  errors: null

}

const mutations = {

  fillToken(state, token) {
    state.token = token;
  },

  fillUser(state, user) {
    state.user = user;
  },

  fillRol(state, rol) {
    state.rol = rol;
  },

  fillPermission(state, permission) {
    state.permission = permission;
  },

  fillForm(state, form) {
    state.form = form;
  },

  fillErrors(state, errors) {
    state.errors = errors;
  },

  resetToken(state) {
    state.token = null;
  },

  resetUser(state) {
    state.user = {};
  },

  resetRol(state) {
    state.rol = {};
  },

  resetPermission(state) {
    state.permission = {};
  },

  resetForm(state) {
    state.form = {};
  },

  resetErrors(state) {
    state.errors = null;
  },

}

const actions = {

  login: function({ state, commit, dispatch }) {
    state.inProcess = true;
    commit('resetErrors');
    if(state.form.email) {
      state.form.username = state.form.email;
    }
    axios.post('/api/login', state.form).then((response) => {
      let token = response.data.access_token;
      localStorage.setItem('accsess_token', token);
      commit('fillToken', token);
      commit('resetForm');
      dispatch('getUser');
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

  getUser: function({ state, commit }) {
    state.inProcess = true;
    commit('resetErrors');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
    axios.get('/api/user').then((response) => {
      commit('fillUser', response.data.user);
      commit('fillRol', response.data.rol.role);
      commit('fillPermission', response.data.permission);
      state.inProcess = false;
    }).catch((error)=>{
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  },

  logout: function({ state, commit }) {
    state.inProcess = true;
    commit('resetErrors');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
    axios.post('/api/logout').then((response) => {
      localStorage.removeItem('accsess_token');
      commit('resetToken');
      commit('resetUser');
      commit('resetRol');
      commit('resetPermission');
      router.push('/');
      state.inProcess = false;
    }).catch((error)=>{
      localStorage.removeItem('accsess_token');
      commit('resetToken');
      commit('resetUser');
      commit('resetRol');
      commit('resetPermission');
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}