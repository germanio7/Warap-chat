import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// Login Views
import Login from './v-auth/Login.vue'
import Register from './v-auth/Register.vue'
import User from './v-auth/User.vue' 

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
      }
    },

    // Login Route's
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})
