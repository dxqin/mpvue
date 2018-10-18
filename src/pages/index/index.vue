<template>
  <div>
    <scroll-view scroll-y style="height: calc(100vh - 10px);" scroll-top="0"> 
      <div style="background:#fff">
        <div class="nav">
          <span class="active" style="">EBO VIP</span>
          <span style="margin-left:36rpx;" bindtap="navigateToMine">我的账户</span>
        </div>
        <div class="banner">
          <img />
          <div class="group">
            <img src="/static/img/group.png" />
          </div>
        </div>
        <div class="user">
          <div class="user-box">
            <div class="user-box-l">
              <span class="nickname"><span class="name">gunner</span><span class="gender">先生</span></span>
              <div class="vip">
                <img src="/static/img/star.png" />
                <span>VIP3 / 会员权益</span>
                </div>
            </div>
            <div class="user-box-r">
              <span class="integral">我的积分：</span>
              <span class="integral-num">231</span>
            </div>
          </div> 
        </div>
        <div class="features">
           <div class="fe-col">
             <div class="fe-col-icon">
               <img style="width:80rpx;height:80rpx;" src="/static/img/apt.png" />
             </div>
             <span>智能入住</span>
           </div>
           <div class="fe-col">
             <div class="fe-col-icon">
               <img style="width:88rpx;height:52rpx;" src="/static/img/coupon.png" />
             </div>
             <span>我的卡券</span>
           </div>
           <div class="fe-col">
             <div class="fe-col-icon">
               <img style="width:68rpx;height:68rpx;" src="/static/img/QRcode.png" />
             </div>
             <span>我的二维码</span>
           </div>
        </div>
      </div>
    </scroll-view>
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
      };
    },
    methods: {
      // onLoad: function () {
      //   const _this = this;
      //   let goodsList = [{
      //     actEndTime: "2018-09-30 21:32:59"
      //   }];
      //   let endTimeList = [];
      //   // 将活动的结束时间参数提成一个单独的数组，方便操作
      //   goodsList.forEach(o => {
      //     endTimeList.push(o.actEndTime);
      //   });
      //   _this.actEndTimeList = endTimeList;
      //   // 执行倒计时函数
      //   _this.countDown();
      // }, 
      // navigate(url, type) {
      //   tools.navigate(url, type);
      // },
      navigateToMine:function(){
        console.log("../mine/index--")
        wx.navigateTo({
          url:'../mine/index'
        })
      },
    },
  };

</script>
<style scoped>

</style>
