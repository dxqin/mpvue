<template>
<div class="">
  <div class="result">
    <p class="icon-sfz text-center result_icon"></p>
    <p class="text-center result_status">拼单{{result}}</p>
    <p class="result_tips text-center">{{tips}}</p>
    <div class="result_btn_group">
      <a class="weui_btn weui_btn_primary" v-show="result !== '成功'" @click="payAgain()">重新拼单</a>
      <div class="weui_btn weui_btn_default" @click="navigate('/pages/index/index')">取消拼单</div>
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
        _this.tips = "一定是您兴奋的手抖，才让这次拼单慢人一步，根据我们的操作引导重新拼单吧！";
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
