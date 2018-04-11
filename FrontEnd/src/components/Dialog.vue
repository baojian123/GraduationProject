<template>
  <div >
    <div class="curtain" @click="show=false">
    </div>
    <div class="vertical-center">

    </div>
    <div class="horizontal-center">

    </div>
    <div class="dialog">
      <div class="tab login" @click="type='login'">
        <p>登陆</p>
        {{type}}
      </div>
      <div class="tab register" @click="type='register'">
        <p>注册</p>
      </div>
      <div class="exit" @click="show=false"></div>
      <div class="content">
        <div class="form">
          <div class="input username">
            用户名:
            <input type="text" v-model="user.user_id">
          </div>
          <div class="input password">
            密码:
            <input type="text" v-model="user.user_pwd">
          </div>
          <div class="submit button" @click="submitData">
            提交
          </div>
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
  props: ['type'],
  data () {
    return {
      show: false,
      user: {
        user_id: '',
        user_pwd: '',
        repeat_pwd: ''
      }
    }
  },
  methods: {
    submitData: function () {
      this.type = 'haha'
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
    }
  }
}
</script>

<style lang="css">
.curtain {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.7)
}
.dialog {
  position:absolute;
  min-height:600px;
  max-height:700px;
  border-radius: 5px;
  background-color:#ffffff;
}

</style>
