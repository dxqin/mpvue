<template>
  <div class="result">
    <div class="main">
          <img src="/static/img/kn.png" class="img" />
    <div class="main2 ub-ver">
          <img src="/static/img/dm2.png" class="logo" />
        <div class="text-price">
        <text>原价:  </text>
        <text class="origin-price">￥188.00</text>
        </div>
        <text class="new-price">￥120.00</text>
        <div class="circle">
           <img src="/static/img/kn.png" />
           <img src="/static/img/wenhao.png" />
        </div>
        <div class="btn">参与拼团</div>
    </div>
    </div>
    <div class="btn_group">
      <a class="primary" v-show="result !== '成功'" @click="payAgain()">我来发起拼单</a>
      <a class="primary" v-show="result === '成功'" @click="order()">我的拼单</a>
      <a class="primary" v-show="result === '2成功'" @click="order()">一键拼单{{time}}后结束</a>
      <div class="default" @click="navigate('/pages/index/index', 'switchTab')">去首页逛逛</div>
    </div>
    <user-analysis></user-analysis>
  </div>
</template>


<style scoped>
.result {
  height: 100vh;
  width: 750rpx;
  background-color: #fff;
}
.result .main {
  margin: 3rpx;
  height: 570rpx;
  display: flex;
  background: rgba(255, 255, 255, 1);
  border: 5rpx solid rgba(0, 0, 0, 1);
}
.result .main .img {
  width: 440rpx;
  height: 440rpx;
  margin: 60rpx 28rpx 70rpx 32rpx;
}
.result .main .main2 {
  width: 220rpx;
  height: 440rpx;
  margin: 60rpx 0 70rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.result .main .main2 .logo {
  width: 180rpx;
  height: 70rpx;
}
.result .main .main2 .text-price {
  font-size: 24rpx;
  width: 168rpx;
  height: 33rpx;
  font-weight: 400;
  flex-direction: row;
  color: rgba(160, 160, 160, 1);
}
.result .main .main2 .new-price {
  font-size: 48rpx;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  width: 196rpx;
  height: 67rpx;
}
.result .main .main2 .btn {
  font-size: 26rpx;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  padding-top: 15rpx;
  width: 210rpx;
  border-radius: 8rpx;
  border: 2rpx solid rgba(20, 20, 20, 1);
  height: 60rpx;
}
.result .main .main2 .circle {
  width: 190rpx;
  height: 90rpx;
  flex-direction: row;
}
.result .main .main2 .circle img {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  border:2rpx rgba(20, 20, 20, 1) dashed;
}
.result .main .main2 .text-price .origin-price {
  text-decoration: line-through;
}
.result .btn_group {
  margin-top: 37rpx;
  padding: 0 32rpx;
}
.result .btn_group .primary {
  width: 686rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  color: rgba(255, 255, 255, 1);
  border-radius: 8rpx;
  text-align: center;
  background-color: rgba(0, 0, 0, 1);
}
.result .btn_group .default {
  width: 686rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  margin-top: 28rpx;
  border-radius: 8rpx;
  text-align: center;
  background-color: rgba(240, 240, 240, 1);
  color: rgba(35, 35, 35, 1);
}
</style>


<script>
"use strict";
import Vue from "vue";
import userAnalysis from "../../components/user-analysis/user-analysis";
import tools from "@/utils/mp";
export default {
  data() {
    const _this = this;
    return {
      result: "成功",
      time: "22:21:32"
    };
  },
  activated() {
    const _this = this;
    _this.init();
  },
  methods: {
    init() {
      const _this = this;
      _this.dialogControl = false;
    },
    handleDialogAction(action) {
      const _this = this;
      _this.dialogControl = false;
      window.mallUtils.funs.activeTouchMove();
    },
    order() {
      const _this = this;
      _this.$router.push({
        name: "orderList"
      });
    },
    payAgain() {
      const _this = this;
      sessionStorage.setItem("payAgain", true);
      _this.$router.push({
        name: "orderDetail",
        params: {
          id: _this.$route.params.id,
          type: "multiple"
        }
      });
    },
    del() {
      const _this = this;
      _this.dialogControl = true;
      window.mallUtils.funs.unTouchMove();
    },
    navigate(url, type) {
      tools.navigate(url, type);
    }
  },
  components: {
    userAnalysis
  }
};
</script>
