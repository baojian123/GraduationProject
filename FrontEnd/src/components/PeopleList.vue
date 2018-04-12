<template lang="html">
  <div class="">
    <div class="people-list" v-for="(item, index) in list" :key="index">
      <PeopleListItem :item="item" :cookie="cookie"></PeopleListItem>
    </div>
  </div>
</template>

<script>
import PeopleListItem from './PeopleListItem'
export default {
  name: 'PeopleList',
  props: ['list', 'cookie'],
  data () {
    return {

    }
  },
  components: {
    PeopleListItem
  }
}
</script>

<style lang="css">
</style>
