import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// Login Views
import Login from './views/auth_views/Login.vue'
import Register from './views/auth_views/Register.vue'
import User from './views/auth_views/User.vue' 

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
