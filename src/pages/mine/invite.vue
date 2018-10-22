<template>
<div>
  <div class="invite">
    <img class="invite-img" src="/static/img/invite.png" />
    <span class="invite-tit">邀请好友得现金奖励</span>
    <span class="invite-txt">为好友提供优惠链接，TA首次下单后您可获得该订单 实付金额的8%作为奖励。</span>
    <button class="invite-btn">立即分享邀请链接</button>
    <span sytle="font-weight:500" class="invite-cash">—我的现金奖励—</span>      
    <span class="invite-cash-num">0<span style="font-size:24rpx;">元</span></span>
    <span class="invited-txt">已邀请的好友</span>

  </div>
</div>
</template>
 
<script>
"use strict";
import Vue from "vue";  
import './wxss/invite.wxss'
export default {
  data() {
    const _this = this;
    return {
     
    };
  },
  onShow() {
    const _this = this;
    _this.init();
  },
  methods: {
    init() {
      const _this = this;
    },
  }
};
</script>
