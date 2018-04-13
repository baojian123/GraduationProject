<template lang="html">
  <div>
    <router-link :to="{ name: 'Homepage'}">首页</router-link>
    <div class="user-info">
      <div class="big-icon">
        <img :src="user.user_info.user_icon" alt="">
      </div>
      {{user.user_info.user_id}}
      <div class="follow-list">
        <div class="follower-list">
          关注他的人
          <PeopleList :list="user.follower_list" :cookie="my_info.user_info.user_id"></PeopleList>
        </div>
        <div class="following-list">
          他关注的人
          <PeopleList :list="user.following_list" :cookie="my_info.user_info.user_id"></PeopleList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PeopleListItem from '@/components/PeopleListItem'
import PeopleList from '@/components/PeopleList'
import '@/css/base.css'
export default {
  name: 'UserInfo',
  data () {
    return {
      user: {
        user_id: '',
        user_info: {
          user_id: '',
          user_icon: ''
        }
      },
      flag: false,
      my_info: {}
    }
  },
  methods: {
    isFollowed: function (id) {
      var list = this.my_info.following_list
      // var list = []

      var flag = 0
      for (var i in list) {
        if (list[i].user_id === id) {
          flag = 1
        }
      }
      if (this.my_info.user_info.user_id === id) {
        flag = -1
      }
      if (flag === 1) {
        return true
      }
      if (flag === 0) {
        return false
      }
      return undefined
    },
    getCookie: function (name) {
      var str = document.cookie.split(';')
      var arr
      for (var i in str) {
        arr = unescape(str[i])
        arr = arr.split('=')
        for (var j in arr) {
          if (name === arr[j]) {
            console.log(arr[Number(j) + 1])
            return arr[Number(j) + 1]
          }
        }
      }
    },
    getUrl: function (name) {
      var str = location.href.split('/')
      for (var i in str) {
        if (str[i] === 'userinfo') {
          console.log(str[Number(i) + 1])
          return str[Number(i) + 1]
        }
      }
    },
    getUserInfo: function () {
      const self = this
      this.user.user_id = this.getUrl('user_id')
      axios.post('http://localhost:3000/userallinfo', {user_id: this.user.user_id})
        .then(function (response) {
          if (response.data === undefined) {
          }
          self.user = response.data
          self.user.user_info.user_icon = require('../assets/icon/' + self.user.user_info.user_icon)
          for (var i in self.user.follower_list) {
            self.user.follower_list[i].user_icon = require('../assets/icon/' + self.user.follower_list[i].user_icon)
            self.user.follower_list[i].is_followed = self.isFollowed(self.user.follower_list[i].user_id)
          }
          for (i in self.user.following_list) {
            self.user.following_list[i].user_icon = require('../assets/icon/' + self.user.following_list[i].user_icon)
            self.user.following_list[i].is_followed = self.isFollowed(self.user.following_list[i].user_id)
          }
        })
    },
    getMyInfo: function () {
      const self = this
      var id = this.getCookie('user_id')
      if (id === undefined) {
      }
      axios.post('http://localhost:3000/userallinfo', {user_id: id})
        .then(function (response) {
          self.my_info = response.data
        })
    },
    submitContent: function (content) {
      var time = new Date().toLocaleDateString()
      // alert(time);
      var json = {
        user_id: this.my_info.user_info.user_id,
        submit_date: time,
        passage_content: content
      }
      axios.post('http://localhost:3000/passage', json)
        .then(function (response) {
        })
    },
    getAssets: function (url) {
      url = '../assets/icon/' + url
      return require(url)
    }
  },
  mounted () {
    this.getMyInfo()
    this.getUserInfo()
  },
  components: {
    PeopleList,
    PeopleListItem
  }
}
</script>

<style scoped>

.follow-list{
  display:flex;
  flex-direction: row;
}
</style>
