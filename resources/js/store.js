import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import crudx from './crudx/crudx'
import auth from './auth/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    'crudx': crudx,
    'auth': auth
  }
  
})
