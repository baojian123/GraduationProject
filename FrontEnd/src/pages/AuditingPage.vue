<template lang="html">
  <div class="">
    <AuditingTable @submitData="AuditingPassage" :list="passage_list.data" :table_style="table_style" :column_name="['用户ID', '文章ID', '提交日期', '文章内容', '文章状态', '评论数', '点赞数']"></AuditingTable>
  </div>
</template>

<script>
import axios from 'axios'
import AuditingTable from '@/components/AuditingTable'
export default {
  name: 'AuditingPage',
  data () {
    return {
      table_style: 'table-7',
      passage_list: []
    }
  },
  methods: {
    getAuditingPassage: function () {
      const self = this
      axios.post('http://localhost:3000/getauditingpassage', {})
        .then(function (response) {
          self.passage_list = response.data
        })
    },
    AuditingPassage: function (obj) {
      alert(obj.passage_id)
      axios.post('http://localhost:3000/auditingpassage', {passage_id: obj.passage_id})
        .then(function (response) {
        })
    }
  },
  mounted () {
    this.getAuditingPassage()
  },
  components: {
    AuditingTable
  }
}
</script>

<style lang="css">
</style>
