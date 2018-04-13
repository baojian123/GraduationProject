<template lang="html">
  <div class="">
    <table :id="table_style">
        <tr>
          <th v-for="(subitem, property) in column_name" :key="property" :value="subitem">
            {{subitem}}
          </th>
          <th>操作</th>
        </tr>
        <tr v-for="(row, index) in list" :key="index">
          <td v-for="(subitem, i) in row" :key="i">{{subitem}}</td>
          <td>
            <button @click="submitData(row)">审核通过</button>
          </td>
        </tr>
    </table>
  </div>
</template>

<script>
import '@/css/table-style.css'
export default {
  name: 'AuditingTable',
  props: ['list', 'column_name', 'table_style'],
  data () {
    return {
    }
  },
  methods: {
    submitData: function (data) {
      this.$emit('submitData', data)
    }
  }
  // mounted () {
  // }
}
</script>

<style scoped>

</style>
