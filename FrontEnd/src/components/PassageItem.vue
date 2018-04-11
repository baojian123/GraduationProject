<template lang="html">
  <div class="">
    <div class="passage-content" v-html="item.passage_content">
    </div>
    <div class="passage-footer">
      <div class="author">{{item.user_id}}</div>
      <div class="comment">
        评论数
        点赞数
      </div>
    </div>
    <div class="commment-broad">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassageItem',
  props: ['item'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
