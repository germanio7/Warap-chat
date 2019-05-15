import axios from 'axios'
import router from '../router'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accsess_token');

const state = {

  inProcess: false,
  errors: null,
  form: {},
  data: [],
  showData: [],

}

const mutations = {

  fillForm(state, form) {
    state.form = form;
  },

  fillErrors(state, errors) {
    state.errors = errors;
  },

  fillData(state, data) {
    state.data = data;
  },

  fillShowData(state, showData) {
    state.showData = showData;
  },

  resetForm(state) {
    state.form = {};
  },

  resetErrors(state) {
    state.errors = null;
  },

  resetData() {
    state.data = [];
  },

  resetShowData() {
    state.showData = [];
  }

}

const actions = {

  index: function({ state, commit }, params) {
    state.inProcess = true;
    commit('resetErrors');
    axios.get(params.url, { params: params }).then(response => {
      commit('fillData', response.data);
      state.inProcess = false;
    }).catch(error => {
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  },

  show: function({ state, commit, dispatch }, params) {
    state.inProcess = true;
    commit('resetErrors');
    axios.get(params.url, { params: params }).then(response => {
      commit('fillShowData', response.data);
      state.inProcess = false;
      dispatch('redirect', params);
    }).catch(error => {
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  },

  save: function({ state, commit, dispatch }, params) {
    state.inProcess = true;
    commit('resetErrors');
    axios.post(params.url, state.form).then((response) => {
      commit('resetForm');
      state.inProcess = false;
      dispatch('redirect', params);
    }).catch((error)=>{
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  },

  edit: function({ commit, dispatch }, params) {
    commit('fillForm', params.data);
    dispatch('redirect', params);
  },

  update: function({ state, commit, dispatch }, params) {
    state.inProcess = true;
    commit('resetErrors');
    axios.put(params.url, state.form).then((response) => {
      commit('formReset');
      state.inProcess = false;
      dispatch('redirect', params);
    }).catch((error)=>{
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  },

  destroy: function({ commit, dispatch }, params) {
    state.inProcess = true;
    commit('resetErrors');
    axios.post(params.url).then((response) => {
      state.inProcess = false;
      dispatch('redirect', params);
    }).catch((error) => {
      commit('fillErrors', error.response.data);
      state.inProcess = false;
    });
  },

  redirect: function({dispatch}, params) {
    if(params.goTo) {
      if(typeof params.goTo == 'string') {
        router.push(params.goTo);
        return
      }
    } else if(params.history) {
      if(typeof params.history == 'number') {
        window.history.go(params.history);
        return
      }
    } else if(params.reload) {
      if(typeof params.reload == 'string') {
        let parameters = {
          url: params.reload
        }
        dispatch('index', parameters);
      }
    }
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}