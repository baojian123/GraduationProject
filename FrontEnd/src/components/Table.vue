<template lang="html">
  <div class="">
    <table :id="table_style">
        <tr>
          <th v-for="(subitem, property) in column_name" :key="property" :value="subitem">
            {{subitem}}
          </th>
        </tr>
        <tr v-for="(row, index) in list" :key="index">
          <td v-for="(subitem, i) in row" :key="i">{{subitem}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import '@/css/table-style.css'
export default {
  name: 'Table',
  props: ['list', 'column_name', 'table_style'],
  data () {
    return {
    }
  }
  // methods: {
  // },
  // mounted () {
  // }
}
</script>

<style lang="css">
  
</style>
