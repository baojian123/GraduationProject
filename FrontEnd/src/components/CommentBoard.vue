<template lang="html">
  <div class="">
    <div class="comment-list" v-for="(item,index) in comment_list.data" :key="index">
      <CommentListItem :item="item" ></CommentListItem>
    </div>
    <CommentEditor @submitContent="submitContent" :passage_id="passage_id"></CommentEditor>
  </div>
</template>

<script>
import axios from 'axios'
import CommentListItem from './CommentListItem'
import CommentEditor from './CommentEditor'
export default {
  name: 'CommentBoard',
  props: ['passage_id', 'user_id'],
  data () {
    return {
      comment_list: []
    }
  },
  methods: {
    getComment: function (pid) {
      const self = this
      axios.post('http://localhost:3000/getcomment', {passage_id: pid})
        .then(function (response) {
          self.comment_list = response.data
        })
    },
    submitContent: function (content) {
      var json = {
        passage_id: this.passage_id,
        user_id: this.user_id,
        comment_content: content
      }
      alert(content)
      axios.post('http://localhost:3000/comment', json)
        .then(function (response) {
        })
    }
  },
  mounted () {
    this.getComment(this.passage_id)
  },
  components: {
    CommentListItem,
    CommentEditor
  }
}
</script>

<style scoped>
</style>
