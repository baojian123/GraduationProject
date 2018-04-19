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
      <div class="homepage nav-list-item" :class="{active:homepageActive}">
        <router-link :to="{ path: '/' }">首页</router-link>
      </div>
      <div class="hotel nav-list-item" :class="{active:hotelActive}">
        <router-link :to="{ path: '/hotelsearch' }">酒店</router-link>
      </div>
      <div class="train nav-list-item" :class="{active:trainActive}">
        <router-link :to="{ path: '/trainsearch' }">火车</router-link>
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
      <div class="logout">
        <div class="button" @click="clearCookie('user')">
          注销
        </div>
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
      homepageActive:false,
      hotelActive:false,
      trainActive:false,
      cookie: false,
      user: {
        user_id: ''
      }
    }
  },
  props: ['color','active'],
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
    clearCookie: function (name) {
      document.cookie = name + '= ; expires=-1;'
      location.href = '/'
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
    },
    isActive: function () {
      if (this.active === '首页') {
        this.homepageActive = true;
      }
      if (this.active === '酒店') {
        this.hotelActive = true;
      }
      if (this.active === '火车') {
        this.trainActive = true;
      }
    }
  },
  mounted () {
    this.isActive()
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.active>a{
  color:#ffffff;
}
.active.nav-list-item {
  background-color: #999999;
  box-shadow: none;
}
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
  z-index:4;
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
  /* border-top-left-radius: 30px; */
  /* border-top-left-radius: 10px; */
  background-color: #777777;
  padding: 20px;
  /* box-shadow: 7px -4px 7px 0px rgb(0,0,0) inset; */
  /* height:100%;
  display:flex;
  flex-direction: column;
  justify-content:center; */
}
.user-login {
  padding-top: 10px;
  display: flex;
  flex-direction: row;
}
.register {
  margin-left: 15px;
}
.logout {
  padding-top:10px;
  margin-left: 15px;
}
</style>
