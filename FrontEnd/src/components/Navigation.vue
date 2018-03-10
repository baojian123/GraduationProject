<template lang="html">
  <div class="header" :style="{ backgroundColor: color }">
    <div class="left-nav">

    </div>
    <div class="logo">
      <img src="" alt="">
    </div>
    <div class="nav-list">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
  },
  props: ['color']
}
</script>

<style lang="css">
.header{
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

}
</style>
