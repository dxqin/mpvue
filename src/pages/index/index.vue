<template>
  <div>
    <scroll-view scroll-y style="height: calc(100vh - 10px);" scroll-top="0">
      <!--猜你喜欢，商品列表-->
      <div style="background:#fff">
        <div style="border-bottom:1px solid #eee">
          <span sytle="font-weight:500" class="z-width-100-percent ub-box ub-ver z-font-size-18 z-color-000 z-lineHeight-36">—精选拼团—</span>      
        <div class="router-style">
          <div class="a" :class="num == 1 ? 'active' : ''" @click="changeType">
          <span class="a1">本期拼团</span>
          <span class="a2">正在拼团</span>
          </div>
          <div class="b" :class="num == 2 ? 'active' : ''" @click="changeType2">
          <span class="b1">下期拼团</span>
          <span class="b2">未开始</span>
          </div>
          <div v-show="num == 1" class="c1 text-right">
          <span>火热拼团中</span>
          </div>
        <div class="c2 text-right" v-show="num == 2">
          <div class="hd">距开拼还有</div>
          <div class="bd">
            <span class="value">{{time.hou}}</span>
            <span class="colon">:</span>
            <span class="value">{{time.min}}</span>
            <span class="colon">:</span>
            <span class="value">{{time.sec}}</span>
          </div>
        </div>
        </div>
        </div>
        <div v-show="num == 1" class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" v-for="(item, idx) in list" :key="idx">
      <div @click="navigate('/pages/item/index')" :class="{'z-border-bottom-1-eee':isLast==false}" class="card ub-box z-padding-v-10-px">
      <img :src="item.img" class="z-img-cover">
      <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
        <div class="ub-box ub-ver ub-between">
          <span class="z-width-80-percent .z-height-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold2">{{item.mainTitle}}</span>
        </div>
        <div class="price">
        <text class="new-price">￥{{item.unitPriceDesc}}</text>
        <text class="text-price">原价:</text>
        <text class="origin-price">￥{{item.originalPriceDesc}}</text>
        </div>
        <div style="margin-top:40rpx" class="lower">
        <p class="lower-bg"></p>
        <p class="lower-hd progress" :style="{ width: (item.sellCount / item.stockTotal) * 100 + '%' }"></p>
        <p class="lower-value" v-show="item.sellCount / item.stockTotal < 0.9">{{ (item.sellCount/item.stockTotal)*100 | progressValue}}%</p>
        <p class="lower-value" v-show="item.sellCount / item.stockTotal > 0.9 && item.stockTotal - item.sellCount !== 0">即将售罄</p>
        <p class="lower-value" v-show="item.stockTotal - item.sellCount === 0">已售罄</p>
        </div>
        <div class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
          <span class="z-font-size-16" style="font-weight:500;color:rgba(244,107,106,1)">已拼 {{item.sellCount}}件</span>
          <v-button class="free-cell">立刻拼团</v-button>
        </div>
      </div>
  </div>
        </div>
        <div v-show="num == 2" class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" v-for="(item, idx) in list" :key="idx">
      <div @click="navigate('/pages/item/index')" :class="{'z-border-bottom-1-eee':isLast==false}" class="card ub-box z-padding-v-10-px">
      <img :src="item.img" class="z-img-cover">
      <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
        <div class="ub-box ub-ver ub-between">
          <span class="z-width-80-percent .z-height-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold2">{{item.mainTitle}}</span>
        </div>
        <div class="price">
        <text class="new-price">￥{{item.unitPriceDesc}}</text>
        <text class="text-price">原价:</text>
        <text class="origin-price">￥{{item.originalPriceDesc}}</text>
        </div>
        <div class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
        <v-button style="text-align:center;font-size:18rpx;font-weight:500;color:rgba(244,107,106,1);" class="bt-style">暂未开拼</v-button>
        </div>
        <div class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
          <span class="z-font-size-16" style="font-weight:500;color:rgba(244,107,106,1)">可拼 {{item.sellCount}}件</span>
          <v-button class="free-cell2">前往查看</v-button>
        </div>
      </div>
  </div>
        </div>
        <div class="z-width-100-percent ub-box ub-ver img-style">
          <img src="/static/img/dm1.png" class="img2">
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
      list: [
        {
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
    onLoad: function() {
      const _this = this;
      let goodsList = [{ actEndTime: "2018-09-30 21:32:59" }];
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
    timeFormat: function(param) {
      //小于10的格式化函数
      return param < 10 ? "0" + param : param;
    },

    //倒计时函数
    countDown: function() {
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
.lower {
  border: 1px;
  border-color: #f46b6a;
  border-radius: 0.12rem;
  position: relative;
  margin-bottom: 0.24rem;
  font-size: 0;
}
.lower-bg {
  position: absolute;
  background-color: #ffd3d2;
  width: 100%;
  height: 0.18rem;
  border-radius: 0.12rem;
  z-index: 1;
}
.lower-value {
  color: #fff;
  font-size: 0.18rem;
  text-align: center;
  line-height: 1;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 3;
}
.lower-hd {
  border: 1px;
  border-color: #f46b6a;
  border-radius: 0.12rem;
  position: relative;
  margin-bottom: 0.24rem;
  font-size: 0;
}
.progress {
  position: relative;
  z-index: 2;
  background-color: #f46b6a;
  width: 80%;
  height: 0.18rem;
  border-radius: 0.12rem;
}
.hd {
  font-size: 20rpx;
  line-height: 28rpx;
}
.bd {
  color: rgba(255, 255, 255, 1);
  font-size: 28rpx;
}
.colon {
  color: #000;
  font-size: 28rpx;
  padding: 4rpx;
}
.active {
  color: rgba(0, 0, 0, 1);
}
.text-right {
  text-align: right;
}
.router-style {
  margin-top: 48rpx;
  margin-bottom: 20rpx;
  height: 73rpx;
  padding: 0 15rpx;
  display: flex;
  align-items: center;
  color: rgba(160, 160, 160, 1);
  justify-content: space-between;
}
.router-style .a {
  width: 128rpx;
}
.router-style .b {
  width: 128rpx;
}
.router-style .a .a1 {
  font-size: 32rpx;
  font-weight: 500;
}
.router-style .a .a2 {
  font-size: 22rpx;
  font-weight: 500;
}
.router-style .b .b1 {
  font-size: 32rpx;
  font-weight: 500;
}
.router-style .b .b2 {
  font-size: 22rpx;
  font-weight: 500;
}
.router-style .c1 {
  font-size: 28rpx;
  color: rgba(244, 107, 106, 1);
  font-weight: 400;
}
.router-style .c2 {
  font-size: 28rpx;
  color: rgba(244, 107, 106, 1);
  font-weight: 400;
}
.bt-style {
  width: 338rpx;
  height: 24rpx;
  background: rgba(255, 246, 246, 1);
  border-radius: 12rpx;
  border: 1rpx solid rgba(255, 210, 210, 1);
}
.free-cell {
  min-width: 120rpx;
  height: 32rpx;
  color: #fff;
  text-align: center;
  font-size: 24rpx;
  line-height: 32rpx;
  border-radius: 1em;
  background: #000;
}
.free-cell2 {
  min-width: 120rpx;
  height: 32rpx;
  color: #fff;
  text-align: center;
  font-size: 24rpx;
  line-height: 32rpx;
  border-radius: 1em;
  background: #999;
}
.price {
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
}
.price .new-price {
  font-size: 32rpx;
  color: #ff6464;
}
.price .text-price {
  margin-top: 7rpx;
  font-size: 24rpx;
  margin-left: 30rpx;
  color: #d2d2d2;
}
.price .origin-price {
  margin-top: 7rpx;
  font-size: 24rpx;
  margin-left: 20rpx;
  color: #d2d2d2;
  text-decoration: line-through;
}
.card img {
  width: 300rpx;
  height: 300rpx;
}
.search {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 5px 10px;
}
.icon-item {
  width: 20%;
  padding: 10px 13px 0 13px;
  box-sizing: border-box;
}
.icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
}
.adv {
  border-right: 2px solid #eee;
}
.adv img {
  width: 50px;
  height: 50px;
}
.good {
  border-bottom: 1px solid #ddd8ce;
}
.img-style {
  margin: 40rpx 0;
}
.img-style .img2 {
  width: 350rpx;
  height: 70rpx;
}
.img-style .text1 {
  margin: 0 60rpx 30rpx 0;
  width: 256rpx;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  height: 32rpx;
}
.value {
  background-color: #383838;
  color: #fff;
  padding: 0.03rem;
  border-radius: 0.04rem;
  font-size: 0.28rem;
}
.text2 {
  margin: 0 0 0 260rpx;
  width: 280rpx;
  font-weight: 400;
  color: rgba(160, 160, 160, 1);
  font-size: 20rpx;
  height: 28rpx;
}
</style>

