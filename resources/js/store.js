import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import v_auth from './v-auth/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {

    'auth': v_auth

  }
  
})
