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
    </div>
    <div class="main" :style="{marginLeft : !isRotate *(200) + 'px' }">
      <div class="train-list">
        <div class="train-form">
          <input type="text" value="2018-04-01" v-model="train_form.train_date">
          <input type="text" value="北京" v-model="train_form.from_station">
          <input type="text" value="上海" v-model="train_form.to_station">
          <input name="purpose_codes" type="radio" id="STUDENT" value="STUDENT" v-model="train_form.purpose_codes">
          <label for="STUDENT">学生票</label>
          <input name="purpose_codes" type="radio" checked id="ADULT" value="ADULT" v-model="train_form.purpose_codes">
          <label for="ADULT">成人票</label>
          <button type="button" name="button" @click="getAPI">查询</button>
          {{train_form}}
          {{train_data}}
        </div>
      </div>
      <div class="table-list">
        <select class="" name="" v-model="table_selected">
          <option value="-1" @click="selected(-1)">请选择</option>
          <option v-for="(table, i) in database.table_name" :key="table" :value="i">{{table}}</option>
        </select>
      </div>
      {{database.column_name[table_selected]}}
      {{database.data[table_selected]}}
      <table id="table-1" style="border:1px soild;">
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
import split from '@/split.js'
import '@/css/table-style.css'
export default {
  data () {
    return {
      database: [],
      train_form: {
        train_date: '',
        from_station: '',
        to_station: '',
        purpose_codes: ''
      },
      train_data: [{
        'train_status': '',
        'train_code': '',
        'from_station': '',
        'to_station': '',
        'start_time': '',
        'end_time': '',
        'cost_time': '',
        'order_status': '',
        'train_date': '',
        'hard_berth': '',
        'soft_berth': '',
        'second_class': '',
        'first_class': '',
        'special_class': '',
        'motor_berth': ''
      }],
      table_selected: -1,
      isRotate: 0
    }
  },
  mounted () {
    this.getData()
    // this.getAPI()
  },
  methods: {
    getData: function () {
      // console.log(document.cookie.indexOf('user='))
      const self = this
      axios.get('http://localhost:3000/data')
        .then(function (response) {
          console.log('tableData:' + response.data)
          self.database = response.data
        })
    },
    getAPI: function () {
      const self = this
      axios.post('http://localhost:3000/query', this.train_form)
        .then(function (response) {
          var results = split.getTrain(response.data)
          self.train_data = results
          console.log('train_Data:' + results)
        })
        .catch(function (err) {
          console.log(err.message)
        })
    },
    selected: function (i) {
      console.log(i)
      this.table_selected = i
    }
  }
}
</script>

<style scoped>
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
  padding:10px;
}
th, td{
  border:1px solid;
}
</style>
