<template>
  <div class="background">
    <div class="horizontal-center">
      <div class="form">
        <div class="form-title">
          <h1>注册</h1>
        </div>
        <div class="input username">
          <label for="">
            用户名:
          </label>
          <input type="text" v-model="user.user_id" style="margin-left:18px;">
        </div>
        <br/>
        <div class="email">
          <label for="">
            邮箱:
          </label>
          <input type="text" v-model="user.user_email" style="margin-left:36px;">
        </div>
        <br/>
        <div class="input password">
          <label for="">
            密码:
          </label>
          <input type="password" v-model="user.user_pwd" style="margin-left:36px;">
        </div>
        <br/>
        <div class="input password">
          <label for="">
            重复密码:
          </label>
          <input type="password" v-model="repeat_pwd">
        </div>
        <br/>
        <div class="form-footer">
          <div class="submit button" @click="register">
            提交
          </div>
        </div>
        <div class="login" >
          <router-link :to="{ path: '/'}">
            <h3>
              首页
            </h3>
          </router-link>
          <router-link :to="{ path: '/login'}">
            <h3>
              登陆
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
          location.href = "/"
        })
    }
  }
}
</script>

<style scoped>
  a {
    color:#ffffff;
  }
  .login {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    top:20%;
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
    width:330px;
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
    justify-content:flex-end;
    padding-right: 20px;
    width:90%;
  }
  input {
    color:#ffffff;
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
