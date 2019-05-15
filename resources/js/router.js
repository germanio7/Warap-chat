import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// Auth Views
import Login from './auth/Login.vue'
import Register from './auth/Register.vue'
import User from './auth/User.vue'

//Role Views
import Role from './views/role/Role'

// Task Views
import Task from './views/task/Task.vue'

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

    // Auth Routes
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

    // Role Routes
    {
      path: '/role',
      name: 'role',
      component: Role,
      meta: {
        requiresAuth: true,
      }
    },

    // Task Routes
    {
      path: '/task',
      name: 'task',
      component: Task,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})
