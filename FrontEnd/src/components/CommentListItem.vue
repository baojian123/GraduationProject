<template lang="html">
  <div class="">
    <div class="author">
      <div class="small-icon">
        <img :src="author.user_icon" alt="">
      </div>
      <div class="author-id">
        <router-link :to="{ path: '/userinfo/' + author.user_id }">{{author.user_id}}:</router-link>
      </div>
      <div class="content" v-html="item.comment_content"></div>
      <div class="like-count">
        <button @click="like(is_)">
          点赞数{{item.like_count}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/css/base.css'
export default {
  name: 'CommentListItem',
  props: ['item'],
  data () {
    return {
      author: {
        user_id: '',
        user_icon: ''
      }
    }
  },
  methods: {
    getUserIcon: function (id) {
      const self = this
      axios.post('http://localhost:3000/getusericon', {user_id: id})
        .then(function (response) {
          self.author = response.data
          self.author.user_icon = require('../assets/icon/' + self.author.user_icon)
        })
    }
  },
  mounted () {
    this.getUserIcon(this.item.user_id)
  }
}
</script>

<style scoped>
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
</style>
