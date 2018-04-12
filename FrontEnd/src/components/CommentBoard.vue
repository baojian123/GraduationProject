<template lang="html">
  <div class="">
    {{comment_list}}
  </div>
</template>

<script>
import axios from 'axios'
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
    this.getComment()
  }
}
</script>

<style lang="css">
</style>
