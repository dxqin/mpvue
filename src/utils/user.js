/**
 * user.js
 * 
 * 登录、获取、更新用户信息等
 */

import http from "./http";
import wxasync from "./wxasync"

export default {
  login() {
    console.log('登录');
    wxasync
      .login()
      .then(res => {
        //拿到微信授权code，去登录
        console.log(res);
        http
          .post("/applet/wechatLogin", {
            code: res.code
          })
          .then(res => {
            //拿到token，保存使用
            console.log(res);
            let token = res.data.token;
            let userInfo = res.data.userInfo;

            //保存token
            this.setToken(token)
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getUserInfo() {
    //通过微信API获取用户信息
    // 查看是否授权
    let _this = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              let data = res
              if (data.errMsg == 'getUserInfo:ok') {
                // 获取用户信息成功
                let userInfo = {
                  'avatar': data.userInfo.avatarUrl,
                  'city': data.userInfo.city,
                  'country': data.userInfo.country,
                  'gender': data.userInfo.gender,
                  'nick': data.userInfo.nickName,
                  'province': data.userInfo.province,
                  'encrypted_data': data.encryptedData,
                  'iv': data.iv,
                }
                _this.updateUserInfo(userInfo)
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        } else {
          console.log('未授权,无法获取用户信息')
          wx.showModal({
              title: '提示',
              content: '未授权无法享受完整服务，去授权？',
              showCancel: false,
              success: function () {
                  wx.switchTab({url: '/pages/mine/mine'})
              }
          })
        }
      }
    })
  },

  updateUserInfo(userInfo) {
    //更新用户信息到后台
    console.log('更新用户信息');
    http
      .put("user/userInfo", userInfo)
      .then(res => {
        //更新用户信息成功
        console.log('更新用户信息成功');
        console.log(res);
      })
      .catch(err => {
        console.log('更新用户信息失败');
        console.log(err);
      });
  },
  updateOpenId(callback) {
    wxasync
    .login()
    .then(res => {
      http
      .put("/user/updateAppletOpenId", {
        code: res.code
      })
      .then(res => {
        //拿到token，保存使用
        callback()
      })
      .catch(err => {
        console.log(err);
      });
    })
  },

  getToken() {
    return wx.getStorageSync("token");
  },

  setToken(token) {
    wx.setStorageSync('token', token);
  },

  removeToken() {
    wx.removeStorageSync("token")
  }
}
