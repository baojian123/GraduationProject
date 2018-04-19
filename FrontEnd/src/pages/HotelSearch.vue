<template lang="html">
  <div class="">
    <Navigation :color="colorMsg" :active="target"></Navigation>
    <div class="main">
      {{hotel}}
      <DatePicker v-model="hotel.checkin_date"></DatePicker>
      <DatePicker v-model="hotel.checkout_date"></DatePicker>
      <input type="text" v-model="hotel.city">
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import DatePicker from 'vue-date'
export default {
  name: 'HotelSearch',
  data () {
    return {
      target: '酒店',
      colorMsg: '#555555',
      hotel: {
        city: '',
        checkin_date: '2018-05-01',
        checkout_date: '2018-05-01'
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
