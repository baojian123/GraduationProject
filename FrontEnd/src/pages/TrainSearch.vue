<template lang="html">
  <div class="">
    <Navigation :active="target" :color="colorMsg"></Navigation>'
    <div class="main">
      {{hotel}}
      <input type="text" v-model="train.from_station">
      <input type="text" v-model="train.to_station">
      <DatePicker v-model="train.train_date"></DatePicker>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import DatePicker from 'vue-date'
export default {
  name: 'TrainSearch',
  data () {
    return {
      target: '火车',
      colorMsg: '#555555',
      train: {
        train_date: '2018-05-01',
        from_station: '',
        to_station: '',
        purpose_codes: ''
      }
    }
  },
  components: {
    Navigation,
    DatePicker
  }
}
</script>

<style scoped>
.main {
  position:absolute;
  top:20%;
  left:20%;
}
</style>
