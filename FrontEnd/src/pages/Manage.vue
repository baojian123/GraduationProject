<template lang="html">
  <div  class="manage">
    <div class="left-nav" :style="{ marginLeft : isRotate *(-200) + 'px' }">
      <div class="horizontal-center" style="height:100%;">
        <div class="button" :class="{ rotate:!isRotate }" @click="isRotate=!isRotate">
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

        <select class="" name="" v-model="table_selected">
          <option value="-1" @click="selected(-1)">请选择</option>
          <option v-for="(table, i) in database.table_name" :key="table" :value="i">{{table}}</option>
        </select>
      </div>
    </div>
    <div class="main">
      {{database.column_name[table_selected]}}
      {{database.data[table_selected]}}
      <table style="border:1px soild;">
        <th v-for="(value) in database.column_name[table_selected]" :key="value">{{value}}</th>
        <tr v-for="(row) in database.data[table_selected]" :key="row">
          <td v-for="(value) in row" :key="value">{{value}}</td>
        </tr>
      </table>
      <!-- {{database}} -->
      <!-- {{table_selected}} -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      database: [],
      table_selected: -1,
      isRotate: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData: function () {
      // console.log(document.cookie.indexOf('user='))
      const self = this
      axios.get('http://localhost:3000/data')
        .then(function (response) {
          console.log(response.data)
          self.database = response.data
        })
    },
    selected: function (i) {
      console.log(i)
      this.table_selected = i
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
  transition: all .2s;
  -moz-transition: all .2s; /* Firefox 4 */
  -webkit-transition: all .2s; /* Safari 和 Chrome */
  -o-transition: all .2s; /* Opera */
}
.button{
  cursor: pointer;
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
th, td{
  border:1px solid;
}
</style>
