<template lang="html">
  <div class="">
    <div class="comment-list" v-for="(item,index) in comment_list.data" :key="index">
      <CommentListItem :item="item" ></CommentListItem>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentListItem from './CommentListItem'
export default {
  name: 'CommentBoard',
  props: ['passage_id'],
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
    }
  },
  mounted () {
    this.getComment(this.passage_id)
  },
  components: {
    CommentListItem
  }
}
</script>

<style lang="css">
</style>
