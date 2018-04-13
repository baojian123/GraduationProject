<template lang="html">
  <button v-if="item.is_followed != undefined" @click="follow(item.user_id,is_followed)">{{is_followed? '取消关注':'关注' }}</button>
</template>

<script>
import axios from 'axios'
import notice from '@/js/notice.js'
export default {
  name: 'FollowButton',
  props: ['follower_id', 'item'],
  data () {
    return {
      is_followed: undefined
    }
  },
  methods: {
    follow: function (id, flag) {
      var json = {
        follower_id: this.follower_id,
        following_id: id
      }
      this.is_followed = !this.is_followed
      var url = 'http://localhost:3000/'
      if (flag === true) { // 已关注
        url += 'unfollow'
      } else {
        url += 'follow'
      }
      // json.follower_id = response.data.user_info.user_id
      console.log(json)
      axios.post(url, json)
        .then(function (response) {
          notice.alert(1, response.data, 2)
        })
    }
  },
  mounted () {
    this.is_followed = this.item.is_followed
  }
}
</script>

<style scoped>
</style>
