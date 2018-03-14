<template>
  <div class="background">
    <div class="horizontal-center">
      <div class="form">

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

<script>
export default{
  name: 'Login'
}
</script>
