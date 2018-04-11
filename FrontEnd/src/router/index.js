import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/Homepage.vue'
import Login from '@/components/Login.vue'
import Register from '@/pages/Register.vue'
import UserInfo from '@/pages/UserInfo.vue'
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
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo,
      children: [
        {
          path: '*'
        }
      ]
    },
    {
      path: '/Manage',
      name: 'Manage',
      component: Manage,
      children: [
        {
          path: '/data',
          name: 'Data',
          component: Manage
        }
      ]
    },
    {
      path: '/Manage/Login',
      name: 'ManageLogin',
      component: ManageLogin
    }
  ]
})
