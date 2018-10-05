/**
 * http.js
 * 网络请求
 */

import user from "./user";
import tools from "./mp"

var Fly = require('flyio/dist/npm/wx')

const fly = new Fly()

// 设置请求基地址
// fly.config.baseURL = 'http://localhost:8888'
// fly.config.baseURL = 'http://192.168.2.71:1443'
fly.config.baseURL = 'https://wxtest.dingleague.com'

fly.interceptors.request.use((request) => {
 // 鉴权
 let token = wx.getStorageSync('token')
 if (token) {
   request.headers.Authorization = `Bearer ${token}`
 }
 // console.log('flyio发请求,request为', request);
 wx.showNavigationBarLoading()
 return request
})

fly.interceptors.response.use(
 (response, promise) => {
   wx.hideNavigationBarLoading()
   // console.log(response);
   let res = response.data
   //处理登录失效
   if (res.code === 4004 || res.code === 4003 || res.code === 4001 || res.code === 4002) {
     user.removeToken()
     //重新登录
     //user.login()
     tools.navigate('/pages/mine/login', 'redirect')
   }
   return promise.resolve(res)
 },
 (err, promise) => {
   wx.hideNavigationBarLoading()
   console.log(err);
   wx.showToast({
     title: err.message,
     icon: 'none'
   })
   return promise.resolve()
 }
)

export default fly
