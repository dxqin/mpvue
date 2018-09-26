import Vue from 'vue'
import App from './App'
import http from "@/utils/http"

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

//将fly实例挂在Vue原型上
Vue.prototype.$http = http