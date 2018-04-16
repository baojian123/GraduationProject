<template>
  <div class="background">
    <div class="horizontal-center">
      <div class="form">
        <div class="form">
          <h1>登陆</h1>
          <div class="input username">
            用户名:
            <input type="text" v-model="user.user_id">
          </div>
          <div class="input password">
            密码:
            <input type="text" v-model="user.user_pwd">
          </div>
          <div class="submit button" @click="login">
            提交
          </div>
          <button @click="resetpwd">忘记密码</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'Login',
  data () {
    return {
      user: {
        user_id: '',
        user_pwd: ''
      },
      message: ''
    }
  },
  methods: {
    login: function () {
      const self = this
      axios.post('http://localhost:3000/login', this.user)
        .then(function (response) {
          self.message = response.data
          alert(self.message)
        })
    },
    resetpwd: function () {
      axios.post('http://localhost:3000/resetpassword',{user_id: this.user.user_id})
        .then(function (response) {
        })
    }
  }
}
</script>

<style>
  .background{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    background-color: blue;
  }
  .horizontal-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:100%;
  }
  .form{
    border: 1px solid #000000;
    border-radius: 5px;
    height: 400px;
    width:300px;
    background-color:#ffffff;
  }
</style>
