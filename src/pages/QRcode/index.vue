<template>
  <div class="container-middle">
    <div class="qrcode" id="myCanvas">
      <img class="logo" src="./../../../static/img/logo2.png" />
      <div class="qrcode-img-s">
        <img class="qrcode-img" :src="datas" />
        <img class="avatar" :src="user.headImageUrl" />
      </div>
      <span>长按二维码扫码，可邀请好友获得红包奖励</span>
      <span>至酒店直接扫二维码，可直接录入个人信息</span>
    </div>
    <button>保存并分享图片</button>
  </div>
</template>
<script>
import './wxss/index.wxss'
import { parse } from 'semver';
export default {
  data() {
    return {
      datas : '',
      user : {}
    }
  },
  onLoad() {
    const _this = this;
    this.getData();
    
  },
  methods: {
    getData(){
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/QRCode', params).then((res = {}) => {
          const { data = [] } = res; 
          this.datas = data;
          this.getUser();
        }).catch(res => {
          console.log(res, 'resErr')
        });
      }).catch(err => {
        this.$base.toast('用户信息失效，请重新登录')
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      });
    },
    getUser(){
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/detail', params).then((res = {}) => {
          const { data = [] } = res; 
          this.user = data;
          this.getImg();
        }).catch(res => {
          console.log(res, 'resErr')
        });
      }).catch(err => {
        this.$base.toast('用户信息失效，请重新登录')
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      });
    },
    getImg(){
      const data = new Uint8ClampedArray([255, 0, 0, 1])
      wx.canvasPutImageData({
        canvasId: 'myCanvas',
        x: 0,
        y: 0,
        width: 1,
        data: data,
        success(res) {}
      })
    }
  },
 }
</script>