<template lang="html">
  <div class="main">
    <Navigation :color="colorMsg" :active="target"></Navigation>
    <div class="content">
      <div class="user-page">
        <div style="margin:0 auto;">
          <div class="big-icon">
            <img :src="user.user_info.user_icon" alt="">
          </div>
          <h2>
            {{user.user_info.user_id}}
          </h2>
        </div>
        <div class="menu">
          <hr/>
          <br>
          <div class="tab">
            <div class="user-info" @click="tabShow('user_info')">个人信息</div>
            <div class="changepwd" @click="tabShow('changepwd')">修改密码</div>
            <div class="follower-list" @click="tabShow('follower_list')">关注他的人</div>
            <div class="following-list" @click="tabShow('following_list')">他关注的人</div>
          </div>
          <div class="tab-page">
            <div v-if="tab_show.user_info" class="user-info">
              <label for="">
                个人邮箱:
              </label><input type="text" name="" value="">
              <br>
              <button>保存</button>
            </div>
            <div v-if="tab_show.changepwd" class="changepwd">
              <label for="">
                旧密码:
              </label><input type="text" name="" value="">
              <br>
              <label for="">
                新密码:
              </label><input type="text" name="" value="">
              <br>
              <label for="">
                重复新密码:
              </label><input type="text" name="" value="">
              <br>
              <button>保存</button>
            </div>
            <div v-if="tab_show.follower_list" class="follower-list">
              关注他的人
              <PeopleList :list="user.follower_list" :cookie="my_info.user_info.user_id"></PeopleList>
            </div>
            <div v-if="tab_show.following_list" class="following-list">
              他关注的人
              <PeopleList :list="user.following_list" :cookie="my_info.user_info.user_id"></PeopleList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PeopleListItem from '@/components/PeopleListItem'
import PeopleList from '@/components/PeopleList'
import Navigation from '@/components/Navigation'
import '@/css/base.css'
export default {
  name: 'UserInfo',
  data () {
    return {
      is_user: false,
      tab_show: {
        user_info: true,
        changepwd: false,
        follower_list: false,
        following_list:false
      },
      user: {
        user_id: '',
        user_info: {
          user_id: '',
          user_icon: ''
        }
      },
      flag: false,
      my_info: {},
      colorMsg: '#555555',
      target: ''
    }
  },
  methods: {
    tabShow: function (tabName) {
      for (var i in this.tab_show) {
        this.tab_show[i] = false
        if (i === tabName) {
          this.tab_show[i] = true
        }
      }
    },
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
      if ( this.my_info.user_id === this.user.user_id) {
        this.is_user = true
      }
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
      axios.post('http://localhost:3000/userallinfo', {user_id: id})
        .then(function (response) {
          self.my_info = response.data
          if ( response.data === undefined) {
            self.my_info = {
              user_info: {
                user_id: ''
              },
              follower_list: [],
              following_list: []
            }
          }
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
    PeopleListItem,
    Navigation
  }
}
</script>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.main {
  width:100%;
  height: 100%;
  padding-top:70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
}
.content {
  width:600px;
  margin: 0 auto;
  padding:10px;
  padding-top: 20px;
  box-shadow: 7px 7px 5px 3px rgba(0,0,0,.3);
  background-color:#ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.tab {
  display: flex;
  flex-direction:row;
}
.tab>div {
  border:1px solid #000000;
  cursor:pointer;
}

</style>
