<template lang="html">
  <div class="">
    {{user_icon}}
    <div class="passage-content" v-html="passage.passage_content">
    </div>
    <div class="passage-footer">
      <div class="author">
        <div class="small-icon">
          <img :src="user_icon" alt="">
        </div>
        {{passage.user_id}}</div>
      <div class="comment">
        评论数:{{passage.comment_count}}
        点赞数:{{passage.collect_count}}
      </div>
    </div>
    <CommentBoard :passage_id="passage.passage_id"></CommentBoard>
  </div>
</template>

<script>
import axios from 'axios'
import CommentBoard from './CommentBoard'
export default {
  name: 'PassageListItem',
  props: ['passage'],
  data () {
    return {
      user_icon: ''
    }
  },
  methods: {
    getUser: function (id) {
      const self = this
      axios.post('http://localhost:3000/getusericon', {user_id: id})
        .then(function (response) {
          self.user_icon = require('../assets/icon/' + response.data.user_icon)
        })
    }
  },
  mounted () {
    this.getUser(this.passage.user_id)
  },
  components: {
    CommentBoard
  }
}
</script>

<style lang="css">
.small-icon>img{
  width:40px;
  height:40px;
  border-radius:50%;
}
</style>
