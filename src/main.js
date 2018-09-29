import Vue from 'vue'
import App from './App'
import http from "@/utils/http"
import './css/common.css'
import moment from 'moment'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

//将fly实例挂在Vue原型上
Vue.prototype.$http = http
Vue.prototype.$moment = moment
