<template lang="html">
  <div class="header" :style="{ backgroundColor: color }">
    <div class="left-nav">

    </div>
    <div class="logo">
      <img src="" alt="">
    </div>
    <div class="nav-list">

    </div>
    <div class="user-info" v-if="cookie">
      <router-link :to="{ path: '/userinfo/'+user.user_info.user_id }">
        <div class="icon">
          <img :src="user.user_info.user_icon">
        </div>
      </router-link>
      <div class="user-name">
        {{user}}
      </div>
    </div>
    <div class="user-login" v-if="!cookie">
      <router-link :to="{ name: 'Login'}">
        <div class="login button">
          登陆
        </div>
      </router-link>
      <router-link :to="{ name: 'Register'}">
        <div class="register button">
          注册
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/css/base.css'
export default {
  name: 'Navigation',
  data () {
    return {
      cookie: false,
      user: {
        user_id: ''
      }
    }
  },
  props: ['color'],
  methods: {
    getCookie: function (name) {
      var arr = document.cookie.split(';')
      var temp
      for (var i in arr) {
        temp = unescape(arr[i])
        temp = temp.split('=')
        for (var j in temp) {
          if (temp[j] === name) {
            console.log(temp[Number(j) + 1])
            this.cookie = true
            return temp[Number(j) + 1]
          }
        }
      }
    },
    getUserInfo: function () {
      const self = this
      var id = this.getCookie('user_id')
      if (this.cookie === true) {
        axios.post('http://localhost:3000/userallinfo', {user_id: id})
          .then(function (response) {
            self.user = response.data
            self.user.user_info.user_icon = require('../assets/icon/' + self.user.user_info.user_icon)
          })
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="css">
.header{
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.icon>img{
  width:40px;
  height:40px;
  border-radius:50%;
}
</style>
