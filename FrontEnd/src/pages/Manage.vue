<template lang="html">
  <div :onload="getData()" class="manage">
    <div class="left-nav">
      <div class="horizontal-center" style="height:100%;">
        <div class="button">
          <div class="horizontal-center" style="height:50px;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#000000" d="M4,2H2V22H4V13H18.17L12.67,18.5L14.08,19.92L22,12L14.08,4.08L12.67,5.5L18.17,11H4V2Z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="title">
        <h3>后台管理系统</h3>
      </div>
      <div class="table-list">
        <div class="table-item">

        </div>
      </div>
    </div>
    <div class="main">
      {{database}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      database: []
    }
  },
  methods: {
    getData: function () {
      const self = this
      axios.get('http://localhost:3000/data')
        .then(function (response) {
          console.log(response.data)
          self.database = response.data
        })
    }
  }
}
</script>

<style lang="css">
.left-nav{
  position: absolute;
  left: 0%;
  top: 0%;
  bottom: 0%;
  background-color: #888888;
  width:200px;
}
.button{
  border-radius: 50%;
  background-color: blue;
  width:50px;
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  left: 175px;
  transition: all .2s;
  -moz-transition: all .2s; /* Firefox 4 */
  -webkit-transition: all .2s; /* Safari 和 Chrome */
  -o-transition: all .2s; /* Opera */
}
.rotate{
  transform:rotate(-180deg);
  -ms-transform:rotate(-180deg); /* Internet Explorer */
  -moz-transform:rotate(-180deg); /* Firefox */
  -webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
  -o-transform:rotate(-180deg); /* Opera */
}
.horizontal-center{
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.title{

}
.main{
  margin-left: 200px;
}
</style>
