<template>
  <div class="background">
    <div class="horizontal-center">
      <div class="form">
        <div class="form-header">

        </div>
        <form action="">
          <div class="input username">
            用户名:
            <input type="text">
          </div>
          <div class="input password">
            密码:
            <input type="text">
          </div>
          <input type="submit">
          <input type="reset">
          <router-link :to="{ path:'/Register' }">
            <div class="register">注册</div>
          </router-link>
        </form>
        <div class="form-footer">

        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .background{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    background-color: #e8e8e8;
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
    width:400px;
    background-color:#ffffff;
    display: flex;
    flex-direction: column;
  }
  .form-header{
    width:100%;
    height: 50px;
    background-color: blue;
  }
  .form-footer{
    width:100%;
    height:50px;
    background-color: yellow;
  }
  .input{
    height:30px;
    display: flex;
    flex-direction:row;
  }
  input{
    height:20px;
  }
</style>

<script>
export default{
  name: 'Login'
}
</script>
