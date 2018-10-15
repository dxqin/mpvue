<template>
  <div>
    <scroll-view scroll-y style="height: calc(100vh - 10px);" scroll-top="0">
      <!--猜你喜欢，商品列表-->
      <div style="background:#fff">
        <div class="nav">
          <span style="margin-right:36rpx;">EBO VIP</span>
          <span  style="margin-left:36rpx;">我的账户</span>
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
               <img style="width:80rpx;height:80rpx;" src="/static/img/apt.png" />
             </div>
             <span>智能入住</span>
           </div>
           <div class="fe-col">
             <div class="fe-col-icon">
               <img style="width:80rpx;height:80rpx;" src="/static/img/apt.png" />
             </div>
             <span>智能入住</span>
           </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
  "use strict";
  import tools from "@/utils/mp";
  import user from "@/utils/user.js";
  export default {
    data() {
      return {
        countDownList: [],
        actEndTimeList: [],
        time: {
          hou: "23",
          min: "10",
          sec: "40"
        },
        num: 1,
        list: [{
            goodId: "100",
            img: "/static/img/kn.png",
            mainTitle: "二次元康纳抱枕",
            subTitle: "单人自助晚餐",
            distance: "1.7",
            unitPriceDesc: "308",
            originalPriceDesc: "555",
            sellCount: 1000,
            perCount: 80,
            sales: "42739",
            stockTotal: 1000
          },
          {
            goodId: "100",
            img: "/static/img/kn.png",
            mainTitle: "二次元康纳抱枕",
            subTitle: "单人自助晚餐",
            distance: "1.7",
            unitPriceDesc: "308",
            originalPriceDesc: "555",
            sellCount: 375,
            perCount: 80,
            sales: "42739",
            stockTotal: 1000
          },
          {
            goodId: "100",
            img: "/static/img/kn.png",
            mainTitle: "二次元康纳抱枕",
            subTitle: "单人自助晚餐",
            distance: "1.7",
            unitPriceDesc: "308",
            originalPriceDesc: "555",
            sellCount: 975,
            perCount: 80,
            sales: "42739",
            stockTotal: 1000
          },
          {
            goodId: "100",
            img: "/static/img/kn.png",
            mainTitle: "二次元康纳抱枕",
            subTitle: "单人自助晚餐",
            distance: "1.7",
            unitPriceDesc: "308",
            originalPriceDesc: "555",
            sellCount: 675,
            perCount: 80,
            sales: "42739",
            stockTotal: 1000
          },
          {
            goodId: "100",
            img: "/static/img/kn.png",
            mainTitle: "二次元康纳抱枕",
            subTitle: "单人自助晚餐",
            distance: "1.7",
            unitPriceDesc: "308",
            originalPriceDesc: "555",
            sellCount: 875,
            perCount: 80,
            sales: "42739",
            stockTotal: 1000
          }
        ]
      };
    },
    methods: {
      onLoad: function () {
        const _this = this;
        let goodsList = [{
          actEndTime: "2018-09-30 21:32:59"
        }];
        let endTimeList = [];
        // 将活动的结束时间参数提成一个单独的数组，方便操作
        goodsList.forEach(o => {
          endTimeList.push(o.actEndTime);
        });
        _this.actEndTimeList = endTimeList;
        // 执行倒计时函数
        _this.countDown();
      },

      //当时间小于两位数时十位数补零。
      timeFormat: function (param) {
        //小于10的格式化函数
        return param < 10 ? "0" + param : param;
      },

      //倒计时函数
      countDown: function () {
        const _this = this;
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime(); //当前时间
        let endTimeList = _this.actEndTimeList; //结束时间的数组集合
        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
          let endTime = new Date(o).getTime();
          let obj = null;
          // 如果活动未结束，对时间进行处理
          if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let hou = parseInt(time / 3600);
            let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
            let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
            obj = {
              hou: _this.timeFormat(hou),
              min: _this.timeFormat(min),
              sec: _this.timeFormat(sec)
            };
          } else {
            //活动已结束，全部设置为'00'
            obj = {
              hou: "00",
              min: "00",
              sec: "00"
            };
          }
          _this.time = obj;
        });
        //每隔一秒执行一次倒计时函数， 渲染
        setTimeout(_this.countDown, 1000);
      },
      changeType() {
        const _this = this;
        _this.num = 1;
      },
      changeType2() {
        const _this = this;
        _this.num = 2;
      },
      navigate(url, type) {
        tools.navigate(url, type);
      }
    },
    onShow() {
      const _this = this;
      const token = user.getToken();
      if (!token) {
        //未登录，先去登录
        user.login();
      }
      _this.onLoad();
    },
    onPullDownRefresh() {
      console.log("onPullDownRefresh");
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 600);
    }
  };

</script>
<style scoped>
  .nav{
    height: 82rpx;
    line-height: 82rpx;
    display: flex;
    justify-content: flex-end;
    padding-right: 40rpx;
    /* background:pink; */
  }

  .nav span{
    font-size: 24rpx;
    color: #B2B2B2;
    border-bottom:1px solid #00A4A2;
    /* border-width: 66rpx; */
  }

  .nav .active{
    color: #00A4A2;
  }

  .banner{
    width: 100%;
    height: 422rpx;
    background: pink;
    position: relative;
  }

  .banner .group{
    position: absolute;
    top: -56rpx;
    left: 18rpx;
    width: 110rpx;
    height: 90rpx;
    background-color: #00A4A2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner .group img{
    width: 86rpx;  
    height: 74rpx;
  }
  .user{
    width: 100%;
    height: 148rpx;
    display: flex;
    justify-content: center;
    margin-top: 52rpx;
  }

  .user .user-box{
    width: 672rpx;
    height: 100rpx;
    display: flex;
    padding: 24rpx 0;
    /* background:pink; */
    background: #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.13);
    border-radius: 10px;
  }

  .user .user-box .user-box-l{
    width: 333rpx;
    border-right: 3rpx solid #EEEEEE;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-box-l .name{
    font-size:40rpx;
    color: #353535;
    display: inline-block;
    line-height: 56rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
  }

  .user-box-l .gender{
    font-size:24rpx;
    color: #C6C6C6;
  }

  .user-box-l .vip{
    display: flex;
    line-height: 34rpx;
  }

  .user-box-l .vip img{
    width: 28rpx;
    height: 28rpx;
    margin-right: 12rpx;
  }

  .user-box-l .vip span{
    color: #00A4A2;
    font-size:24rpx;
  }

   .user .user-box .user-box-r {
     display: flex;
     flex-direction: column;
   }
  .user .user-box .user-box-r .integral{
    margin-left: 23rpx;
    margin-top: 12rpx;
    font-size:28rpx;
    line-height: 40rpx;
    color:#353535;
  }

  .user .user-box .user-box-r .integral-num{
    text-align: right;
    /* margin-right: 23rpx; */
    font-size:40rpx;
    color:#00A4A2;
    display: inline-block;
    width: 100%;
  }

  .features{
    display: flex;
    justify-content: space-between;
    height: 198rpx;
    padding: 0 40rpx;
    margin-top: 134rpx;
  }

  .features .fe-col{
    width: 148rpx;
    height: 198rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

   .features .fe-col .fe-col-icon{
    width: 148rpx;
    height: 148rpx;
    margin-bottom: 16rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background:rgba(255,255,255,1);
    box-shadow:0rpx 2rpx 8rpx 0rpx rgba(0,0,0,0.13);
    border-radius:20rpx;
  }

  .features .fe-col span{
    color: #353535;
    font-size: 24rpx;
  }

</style>
