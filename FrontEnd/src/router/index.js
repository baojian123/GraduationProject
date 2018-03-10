import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/Homepage.vue'
import Login from '@/pages/Login.vue'
import Manage from '@/pages/Manage.vue'
import ManageLogin from '@/pages/ManageLogin.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/Manage/Login',
      name: 'ManageLogin',
      component: ManageLogin
    }
  ]
})
