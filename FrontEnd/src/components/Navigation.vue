<template lang="html">
  <div class="header" :style="{ backgroundColor: color }">
    <div class="small-icon logo">
      <img src="../assets/icon/default-icon.jpg" alt="">
    </div>
    <div class="title" style="color:#e8e8e8;">
      <h3>
        交游旅游网站
      </h3>
    </div>
    <div class="nav-list">
      <div class="homepage nav-list-item">
        <router-link :to="{ path: '/' }">首页</router-link>
      </div>
      <div class="hotel nav-list-item">
        <router-link :to="{ path: '/hotel' }">酒店</router-link>
      </div>
      <div class="train nav-list-item">
        <router-link :to="{ path: '/train' }">火车</router-link>
      </div>
    </div>
    <div class="user-info" v-if="cookie">
      <router-link :to="{ path: '/userinfo/'+user.user_info.user_id }">
        <div class="small-icon">
          <img :src="user.user_info.user_icon">
        </div>
      </router-link>
      <div class="user-id">
        <router-link :to="{ path: '/userinfo/'+user.user_info.user_id }">
          {{user.user_info.user_id}}
        </router-link>
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

<style scoped>
.header{
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  padding-left: 20px;
  padding-right: 20px;
}
.user-info{
  display: flex;
  flex-direction: row;
}
.user-id{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nav-list {
  display:flex;
  flex-direction: row;
  width:800px;
}
.nav-list-item {
  padding: 20px;
  /* height:100%;
  display:flex;
  flex-direction: column;
  justify-content:center; */
}
</style>
