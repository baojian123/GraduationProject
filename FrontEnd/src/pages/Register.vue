<template>
  <div class="background">
    <div class="horizontal-center">
      <div class="form">
        <div class="form">
          <h1>注册</h1>
          <div class="input username">
            用户名:
            <input type="text" v-model="user.user_id">
          </div>
          <div class="email">
            邮箱:
            <input type="text" v-model="user.user_email">
          </div>
          <div class="input password">
            密码:
            <input type="password" v-model="user.user_pwd">
          </div>
          <div class="input password">
            重复密码:
            <input type="password" v-model="repeat_pwd">
          </div>
          <div class="submit button" @click="register">
            提交
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'Register',
  data () {
    return {
      user: {
        user_id: '',
        user_pwd: '',
        user_email: ''
      },
      repeat_pwd: '',
      message: ''
    }
  },
  methods: {
    register: function () {
      const self = this
      axios.post('http://localhost:3000/register', this.user)
        .then(function (response) {
          self.message = response.data
          alert(self.message)
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
    height: 500px;
    width:300px;
    background-color:#ffffff;
  }
</style>
