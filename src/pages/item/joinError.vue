<template>
<div>
  <div class="result">
    <img src="/static/img/pde.png" class="result_icon" />
    <p class="result_status">拼单失败</p>
    <p class="result_tips">{{tips}}</p>
  </div>
    <div>
      <button class="btn" @click="payAgain()">重新拼单</button>
      <button class="btn2" @click="navigate('/pages/index/index')">取消拼单</button>
    </div>
  <user-analysis></user-analysis>
</div>
</template>


<style scoped>
.result {
    height: 400rpx;
    padding: 80rpx 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.result_icon {
    height: 120rpx;
    width: 120rpx;
}
.result_status {
    font-size: 36rpx;
    font-weight: 400;
    color: rgba(35,35,35,1);
    line-height:50rpx;   
}
.result_tips {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(160,160,160,1);
    line-height: 40rpx;
}
.btn {
    height: 88rpx;
    background:rgba(0,0,0,1);
    font-weight:400;
    color:rgba(255,255,255,1);
    font-size:32rpx;
}
.btn2 {
    height: 88rpx;
    background:rgba(240,240,240,1);
    margin-top: 40rpx;
    font-weight:400;
    color:rgba(35,35,35,1);
    font-size:32rpx;
}
</style>


<script>
'use strict';
import Vue from 'vue';
import userAnalysis from '../../components/user-analysis/user-analysis';
export default {
  data() {
    const _this = this;
    return {
      tips: _this.tips
    }
  },
  onShow() {
    const _this = this;
    _this.init();
  },
  methods: {
    init() {
      const _this = this;
      _this.tips = "一定是您兴奋的手抖，才让这次拼单慢人一步，根据我们的操作引导重新拼单吧！";
    },
    handleDialogAction(action) {
      const _this = this;
      window.mallUtils.funs.activeTouchMove();
    },
    order() {
      const _this = this;
      _this.$router.push({
        name: 'orderList'
      });
    },
    payAgain() {
      const _this = this;
      sessionStorage.setItem('payAgain', true);
      _this.$router.push({
        name: 'orderDetail',
        params: {
          id: _this.$route.params.id,
          type: 'multiple'
        }
      });
    },
    del() {
      const _this = this;
      window.mallUtils.funs.unTouchMove();
    }
  },
  components: {
    userAnalysis
  }
}
</script>
