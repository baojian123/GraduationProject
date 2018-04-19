<template lang="html">
  <div class="passage-item">
    <div class="passage-title">
      <h1>
        {{passage.passage_title}}
      </h1>
    </div>
    <div class="passage-content" v-html="passage.passage_content">
    </div>
    <button  @click="previewPassage(passage)">预览</button>
    <div class="passage-footer">
      <div class="author">
        <div class="small-icon">
          <img :src="author.user_icon" alt="">
        </div>
        <div class="author-id">
          <router-link :to="{ path: '/userinfo/' + passage.user_id }">{{passage.user_id}}</router-link>
        </div>
        <div v-if="user.user_info.user_id === undefined" class="follow-button">
          <!-- <button @click="follow">
            关注
          </button> -->
          <FollowButton  :follower_id="user.user_info.user_id" :item="author"></FollowButton>
        </div>
      </div>
      <div class="comment">
        评论数: {{passage.comment_count}}
        <button @click="collect(flag)">
          点赞数:{{passage.collect_count}}
        </button>
      </div>
    </div>
    <CommentBoard :passage_id="passage.passage_id" :user_id="user.user_info.user_id"></CommentBoard>
  </div>
</template>

<script>
import axios from 'axios'
import CommentBoard from './CommentBoard'
import FollowButton from './FollowButton'

import '@/css/base.css'
export default {
  name: 'PassageListItem',
  props: ['passage', 'user'],
  data () {
    return {
      author: {
        user_id: '',
        user_icon: '',
        is_followed: false
      }
    }
  },
  methods: {
    isFollowed: function (id) {
      var list = this.user.following_list
      // var list = []

      var flag = 0
      for (var i in list) {
        if (list[i].user_id === id) {
          flag = 1
        }
      }
      if (this.user.user_info.user_id === id) {
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
    getUserIcon: function (id) {
      const self = this
      axios.post('http://localhost:3000/getusericon', {user_id: id})
        .then(function (response) {
          self.author.user_icon = require('../assets/icon/' + response.data.user_icon)
          self.author.user_id = self.passage.user_id
          self.author.is_followed = self.isFollowed(self.passage.user_id)
        })
    },
    previewPassage: function (passage) {

      this.$emit('previewPassage', passage)
    }
    // closeDialog: function (is_show) {
    //   alert(312)
    //   this.$emit('closeDialog', is_show)
    // }
  },
  mounted () {
    this.getUserIcon(this.passage.user_id)
  },
  components: {
    CommentBoard,
    FollowButton
  }
}
</script>

<style scoped>
.passage-title {
  display:flex;
  flex-direction: row;
  justify-content: center;
}
.author {
  display:flex;
  flex-direction: row;
  width:200px;
}
.author-id {
  display:flex;
  flex-direction: column;
  justify-content: center;
}
.passage-item {
  border: 1px solid #000000;
  padding:10px;
  margin:10px;
}
</style>
