<template>
  <div>
    <scroll-view scroll-y style="height: calc(100vh - 10px);" scroll-top="0"> 
      <div style="background:#fff">
        <div class="nav">
          <span class="active" style="">EBO VIP</span>
          <span style="margin-left:36rpx;" @click="navigateToMine()">我的账户</span>
        </div>
        <div class="banner">
          <swiper class="banner-img" circular="true" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
            <block v-for="(item, index) in datas" :index="index" :key="key">
              <swiper-item>
                <image :src="item" class="banner-img" mode="aspectFill"/>
              </swiper-item>
            </block>
          </swiper>
          <div class="group">
            <img src="/static/img/group.png" />
          </div>
        </div>
        <div class="user">
          <div class="user-box" v-if="user">
            <div class="user-box-l">
              <span class="nickname">
                <span class="name">{{user.name}}</span>
                <span class="gender" v-if="user.sex == 0">先生</span>
                <span class="gender" v-if="user.sex == 1">女士</span>
                </span>
              <div class="vip">
                <img src="/static/img/star.png" />
                <span>VIP{{user.level}} / 会员权益</span>
                </div>
            </div>
            <div class="user-box-r">
              <span class="integral">我的积分：</span>
              <span class="integral-num">{{user.integral}}</span>
            </div>
          </div> 
        </div>
        <div class="features">
           <div class="fe-col" @click="navigateToCheckIn()">
             <div class="fe-col-icon">
               <img style="width:80rpx;height:80rpx;" src="/static/img/apt.png" />
             </div>
             <span>智能入住</span>
           </div>
           <div class="fe-col" @click="navigateToCoupon()">
             <div class="fe-col-icon">
               <img style="width:88rpx;height:52rpx;" src="/static/img/coupon.png" />
             </div>
             <span>我的卡券</span>
           </div>
           <div class="fe-col" @click="navigateToQrcode()">
             <div class="fe-col-icon">
               <img style="width:68rpx;height:68rpx;" src="/static/img/QRcode.png" />
             </div>
             <span>我的二维码</span>
           </div>
        </div>
      </div>
    </scroll-view>
    <!-- <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../../../static/img/group.png" />
        </div>
        <div class="modal-body">
          <img />
          <sapn class="f16 c-app">订单正在提交中</sapn>
          <sapn class="f14 c3b mt20">预定结果稍后以短信形式通知到您</sapn>
        </div>
        <div class="modal-footer">
          <p class="modal-footer-txt cb4 f12">6秒后自动跳转</p>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
  "use strict";
  // import tools from "@/utils/mp";
  // import user from "@/utils/user.js";
  import './wxss/index.wxss'
  export default {
    data() {
      return {
        datas : this.datas,
        user : this.user
      };
    },
    onShow(){
      this.getUser();
    },
    onLoad() {
      this.getUrl();
      this.getData();
      this.getUser();
    },
    methods: {
      getUrl(){
        // let pages = getCurrentPages();//获取加载的页面
        // let currentPage = pages[pages.length-1];
        // let options = currentPage.options;
        // for(let key in options){
        //   console.log(options[key]);
        // // this.$wxasync.setStorage('hoteltestUserId', id);
        // }
      },
      getData(){
        this.$http.get('/files/homePage/all', '').then((res = {}) => {
          const { data = [] } = res;
          this.datas = data;
        }).catch(res => {
          console.log(res, 'resErr');
        });
      },
      getUser(){
        this.$wxasync.getStorage('hoteltestUserId').then(res => {
          const { data:hoteltestUserId = '' } = res;
          const params = {
            userId: hoteltestUserId
          }
          this.$http.get('/users/user/detail', params).then((res = {}) => {
            const { data = {} } = res; 
            this.user = data;
          }).catch(res => {
            console.log(res, 'resErr')
          });
        }).catch(err => {
          this.$base.toast('用户信息失效，请重新登录')
          wx.navigateTo({
            url: `../../pages/register/index`
          });
        });
      },
      navigateToMine(){
        wx.navigateTo({
          url:'../../pages/my-account/index'
        });
      },
      navigateToCheckIn(){
        wx.navigateTo({
          url:'../check-in/index'
        });
      },
      navigateToCoupon(){
        wx.navigateTo({
          url:'../coupon/index'
        });
      },
      navigateToQrcode(){
        wx.navigateTo({
          url:'../QRcode/index'
        });
      },
    },
  };

</script>
<style scoped>

</style>
