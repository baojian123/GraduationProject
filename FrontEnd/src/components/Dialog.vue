<template>
  <div class="dialog-background">

    <div class="horizontal-center" >
      <div class="vertical-center">
        <div class="dialog" >
          <div v-if="type === 'html'" class="html">
            <div class="passage-title">
              <h1>{{passage.passage_title}}</h1>
            </div>
            <div class="passage-content"  v-html="passage.passage_content">

            </div>
          </div>
        </div>
        <div class="curtain" @click="closeDialog">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
import '@/css/base.css'
export default {
  name: 'Dialog',
  props: ['type', 'passage'],
  data () {
    return {
      user: {
        user_id: '',
        user_pwd: '',
        repeat_pwd: ''
      }
    }
  },
  methods: {
    submitData: function () {
      // // const self = this
      // var url
      // if (this.type === 'login') {
      //   url = 'http://localhost:3000/login'
      // }
      // if (this.type === 'register') {
      //   url = 'http://localhost:3000/register'
      // }
      // axios.post(url, this.user)
      //   .then(function (response) {
      //
      //   })
    },
    closeDialog: function () {
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style scoped>
.dialog-background{
  position: fixed;
  z-index: 5;
}
.curtain {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.7);
  z-index: 8;
}
.horizontal-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height:100%;
}
.dialog {
  min-width:500px;
  min-height:400px;
  border-radius: 5px;
  background-color:#ffffff;
  z-index: 12;
}
.html {
  min-width:800px;
  max-width:800px;
}
.passage-title {
  text-align: center;
}
</style>
