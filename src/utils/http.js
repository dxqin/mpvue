/**
 * http.js
 * 网络请求
 */

import user from "./user";
import tools from "./mp"

var Fly = require('flyio/dist/npm/wx')

const authNone = [
  '/sms/register/sms',
  '/users/user/register',
  '/sms/login/sms',
  '/users/vip/codeLogin',
  '/hotels/all',
  '/hotels/detail',
  '/roomTypes/accord/roomType',
  '/roomTypes/detail/roomType',
  '/files/homePage/all',
]

const fly = new Fly()

// 设置请求基地址
// fly.config.baseURL = 'http://localhost:8888'
// fly.config.baseURL = 'http://192.168.2.71:1443'
fly.config.baseURL = 'http://hoteltest.rudolph-ibs.com/api/hotel'

fly.interceptors.request.use((request) => {
  
  const { url } = request;
 // 鉴权
  let token = wx.getStorageSync('hoteltestToken');
  let account = wx.getStorageSync('account');
  if (token && account) {
    request.headers.token = `${token}`
    request.headers.account = `${account}`
  } else {
    if (!authNone.includes(url)) {
      wx.navigateTo({
        url: '../register/index'
      })
    }
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
