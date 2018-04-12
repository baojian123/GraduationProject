<template>
  <div  class = "Homepage">
    <Navigation :color = "colorMsg"></Navigation>
    <div class="left-nav">
      {{type}}
      <!-- <Dialog :type = "type"></Dialog> -->
    </div>
    <div class="main">
      <!-- <button @click="flag=!flag" type="button" name="button">{{flag}}</button> -->
      <!-- <div class="header"></div> -->
      <div class="content">
        <div class="passage-list"></div>
        <div class="" v-for="(passageItem,index) in passage.data" :key="index">
          <PassageListItem :passage="passageItem" :user="user"></PassageListItem>
        </div>
      </div>
        <input type="text" v-model="passage_title">
        <PassageEditor @submitContent="submitContent"></PassageEditor>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '@/components/Navigation'
import PassageEditor from '@/components/PassageEditor'
import PassageListItem from '@/components/PassageListItem'
// import Dialog from '@/components/Dialog'
export default {
  name: 'Homepage',
  data () {
    return {
      colorMsg: '#555555',
      msg: 'hello',
      type: 'login',
      flag: false,
      passage_title: '',
      passage: {},
      user: {}
    }
  },
  methods: {
    getMyinfo: function () {
      const self = this
      var id = this.getCookie('user_id')
      axios.post('http://localhost:3000/userallinfo', {user_id: id})
        .then(function (response) {
          self.user = response.data
        })
    },
    getCookie: function (column) {
      var str = document.cookie.split(';')
      var arr
      for (var i in str) {
        arr = unescape(str[i])
        arr = arr.split('=')
        for (var j in arr) {
          if (column === arr[j]) {
            console.log(arr[Number(j) + 1])
            return arr[Number(j) + 1]
          }
        }
      }
    },
    submitContent: function (content) {
      var time = new Date().toLocaleDateString()
      // alert(time);
      var json = {
        user_id: this.user.user_info.user_id,
        passage_title: this.passage_title,
        submit_date: time,
        passage_content: content
      }
      axios.post('http://localhost:3000/passage', json)
        .then(function (response) {
        })
    },
    getPassage: function () {
      const self = this
      var json = {
        user_id: ''
      }
      axios.post('http://localhost:3000/getallpassage', json)
        .then(function (response) {
          self.passage = response.data
        })
    }
  },
  mounted () {
    this.getMyinfo()
    this.getPassage()
  },
  components: {
    Navigation, PassageEditor, PassageListItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  position:relative;
  top:200px;
  left:200px;
  width:800px;
  height:300px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
