<template>
<div class="">
  <div class="result">
    <p class="icon-sfz text-center result_icon"></p>
    <p class="text-center result_status"></p>
    <p class="result_tips text-center"></p>
    <p class="result_btn_group">
      <a class="weui_btn weui_btn_primary" v-show="result !== '成功'" @click="payAgain()">我来发起拼单</a>
      <a class="weui_btn weui_btn_primary" v-show="result === '成功'" @click="order()">我的拼单</a>
      <a class="weui_btn weui_btn_primary" v-show="result === '成功'" @click="order()">一键拼单{{time}}后结束</a>
      <router-link class="weui_btn weui_btn_default" @click="navigate('/pages/index/index')">去首页逛逛</router-link>
    </p>
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
    },
    handleDialogAction(action) {
      const _this = this;
      _this.dialogControl = false;
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
      _this.dialogControl = true;
      window.mallUtils.funs.unTouchMove();
    }
  },
  components: {
    userAnalysis
  }
}
</script>
