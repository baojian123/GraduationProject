<template lang="html">
  <div class="people">
    <div class="small-icon">
      <img :src="item.user_icon" alt="">
    </div>
    <div class="people-id">
      <!-- <router-link :to="{ path: '/userinfo/' + item.user_id}">
        {{item.user_id}}
      </router-link> -->
      <a :href="item.user_id">
        {{item.user_id}}
      </a>
      <!-- <router-link :to="{ path: '/userinfo/' + item.user_id}"> -->
    </div>
    <!-- <button type="button" v-if="item.is_followed != undefined" @click="follow(item.user_id,flag)">{{flag? '取消关注':'关注'}}</button> -->
    <div v-if="cookie != ''" class="follow-button">
      <FollowButton :follower_id="cookie" :item="item"></FollowButton>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FollowButton from './FollowButton'
export default {
  name: 'PeopleListItem',
  props: ['item', 'cookie'],
  data () {
    return {
      flag: false
    }
  },
  methods: {
    follow: function (id, flag) {
      // alert(this.cookie + ' ' + id)
      var json = {
        follower_id: this.cookie,
        following_id: id
      }
      this.flag = !this.flag
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
        })
    }
  },
  mounted () {
    console.log(this.item.is_followed)
    this.flag = this.item.is_followed
  },
  components: {
    FollowButton
  }
}
</script>

<style scoped>
.people {
  display: flex;
  flex-direction: row;
}
.people-id, .follow-button{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
