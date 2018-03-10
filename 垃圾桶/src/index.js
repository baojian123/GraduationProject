import Vue from 'vue'
import App from './App'
// import router from './router'
// import axios from 'axios'

Vue.config.productionTip = false
// Vue.prototype.$http = axios
// Vue.prototype.$http.defaults.baseURL = 'http://112.74.214.252:8080/acloud/'
Vue.prototype.$http.defaults.baseURL = 'http://127.0.0.1:8080'
Vue.prototype.$http.defaults.withCredentials = true
Vue.prototype.$http.defaults.headers = {
  'Content-Type': 'application/json'
}

new Vue({
  el:'#app',
  // router,
  template:'<App/>',
  Component:{ App }
})
