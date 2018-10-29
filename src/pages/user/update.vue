<template>
<div>
  <div class="invite">
    <img class="invite-img" src="/static/img/invite.png" />
    <span class="invite-tit">邀请好友得现金奖励</span>
    <span class="invite-txt">为好友提供优惠链接，TA首次下单后您可获得该订单 实付金额的8%作为奖励。</span>
    <button class="invite-btn" open-type='share' @click="share">立即分享邀请链接</button>
    <span sytle="font-weight:500" class="invite-cash">—我的现金奖励—</span>      
    <span class="invite-cash-num">0<span style="font-size:24rpx;">元</span></span>
    <div class="invite-user">
      <p class="invited-txt">已邀请的好友</p>
      <div class="users">
        <div class="users-show" v-for="(item,index) in datas" :key="index">
          <div class="users-l"></div>
          <span class="users-r">{{item.userName}}</span>
        </div>
      </div>
    </div>
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
     datas : this.datas
    };
  },
  onLoad() {
    const _this = this;
    this.getList();
  },
  methods: {
    share() { //分享给好友或者群
      const _this = this;
      _this.onShareAppMessage();
    },
    onShareAppMessage() {
      return {
        title: '弹出分享时显示的分享标题',
        // desc: '分享页面的内容desc',
        path: '../index/index?userId=24' ,// 路径，传递参数到指定页面。
        imageUrl : './../../../static/img/kn.png',
        success(e){
          console.log("分享成功")
        },
        fail(e){

        }
      }
    },
    getList(){
      let data = {
        userId : 24
      }
      this.$http.get('/users/user/invite', data).then((res = {}) => {
        const { data = [] } = res;
        this.datas = data;
      }).catch(res => {
        console.log(res, 'resErr')
      });
    }
  }
};
</script>
