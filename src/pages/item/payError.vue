<template>
<div class="">
  <div class="result">
    <p class="icon-sfz text-center result_icon"></p>
    <p class="text-center result_status">支付{{result}}</p>
    <p class="result_tips text-center">{{tips}}</p>
    <div class="result_btn_group">
      <a class="weui_btn weui_btn_primary" v-show="result !== '成功'" @click="payAgain()">重新支付</a>
      <div class="weui_btn weui_btn_default" @click="navigate('/pages/index/index')">取消订单</div>
    </div>
  </div>
  <user-analysis></user-analysis>
</div>
</template>


<style lang="stylus" scoped>
  @import "./styles/result.styl"
</style>


<script>
'use strict';
import Vue from 'vue';
import userAnalysis from '../../components/user-analysis/user-analysis';
export default {
  data() {
    const _this = this;
    return {
      result: _this.result,
      dialogControl: _this.dialogControl,
      tips: _this.tips
    }
  },
  activated() {
    const _this = this;
    _this.init();
  },
  methods: {
    init() {
      const _this = this;
      _this.dialogControl = false;
    //   _this.checkeStatus();
    },
    handleDialogAction(action) {
      const _this = this;
      _this.dialogControl = false;
      window.mallUtils.funs.activeTouchMove();
    },
    checkeStatus() {
      const _this = this;
      if (_this.$route.params.result === "success") {
        _this.result = "成功";
        _this.tips = "恭喜你支付成功，感谢您的购买。";
      } else {
        _this.result = "失败";
        _this.tips = "一定是您打开的方式不对，才让这次支付没有成功，根据我们的操作引导重新支付吧！";
      }
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
      _this.dialogControl = true;
      window.mallUtils.funs.unTouchMove();
    }
  },
  components: {
    userAnalysis
  }
}
</script>
