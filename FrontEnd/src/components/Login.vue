<template>
  <div class="background" >
    <div class="horizontal-center">
      <div class="form">
        <div class="form-title">
          <h1>登陆</h1>
        </div>
        <div class="input username">
          <label for="">用户名:</label>
          <input type="text" v-model="user.user_id">
        </div>
        <br/>
        <div class="input password">
          <label for="">密码:</label>
          <input type="password" v-model="user.user_pwd" style="margin-left:16px;">
        </div>
        <br/>
        <div class="form-footer">
          <div class="submit button" @click="login">
            提交
          </div>
          <div >
            <a href="#" @click="resetpwd" style="color:#ffffff;">
              忘记密码？
            </a>
          </div>
        </div>
        <div class="register" >
          <router-link :to="{ path: '/'}">
            <h3>
              首页
            </h3>
          </router-link>
          <router-link :to="{ path: '/register'}">
            <h3>
              注册
            </h3>
          </router-link>
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
          location.href = "/"
        })
    },
    resetpwd: function () {
      axios.post('http://localhost:3000/resetpassword', {user_id: this.user.user_id})
        .then(function (response) {
        })
    }
  }
}
</script>

<style scoped>
  a {
    color:#ffffff;
  }
  .register {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    top:48%;
    left:0%;
  }
  .background{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    background-image: url(../assets/icon/background.jpg);
    background-size:cover;
  }
  .horizontal-center{
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:100%;
  }
  .form{
    border: 2px solid #e8e8e8;
    border-radius: 20px;
    height: 400px;
    width:300px;
    background-color: transparent;
    font-size: 18px;
    padding-left: 10px;
  }
  .form-title {
    display:flex;
    flex-direction: row;
    justify-content: center;
    width:100%;
  }
  .form-footer {
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width:100%;
  }
  input {
    color: #ffffff;
    height:24px;
    border: 0px solid #e8e8e8;
    border-bottom: 2px solid #e8e8e8;
    background-color: transparent;
    outline:none;
    font-size:18px;
    padding-left: 5px;
  }
  input:focus{
    border: 0px solid #e8e8e8;
    border-bottom: 2px solid #e8e8e8;
    background-color: transparent;
  }
  .button {
    border: 2px solid #e8e8e8;
    padding: 5px 10px;

  }
</style>
