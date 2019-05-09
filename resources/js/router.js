import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ToDo from './views/ToDo.vue'

// Login Views
import Login from './auth/Login.vue'
import Register from './auth/Register.vue'
import User from './auth/User.vue' 

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
    {
      path: '/todo',
      name: 'todo',
      component: ToDo,
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
