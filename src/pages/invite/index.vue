<template>
<div>
  <div class="invite">
    <img class="invite-img" src="/static/img/invite.png" />
    <span class="invite-tit">邀请好友得现金奖励</span>
    <span class="invite-txt">为好友提供优惠链接，TA首次下单后您可获得该订单 实付金额的8%作为奖励。</span>
    <button class="invite-btn" open-type="share">立即分享邀请链接</button>
    <span sytle="font-weight:500" class="invite-cash">—我的现金奖励—</span>      
    <span class="invite-cash-num">0<span style="font-size:24rpx;">元</span></span>
    <div class="invite-user">
      <p class="invited-txt">已邀请的好友</p>
      <div class="users">
        <!-- <p class="f12 cb2" style="text-align:center;margin-bottom:20rpx;" v-if="datas.length <= 0">暂无数据</p> -->
        <div class="users-show" v-for="(item,index) in datas" :key="index">
          <img class="users-l" :src="item.headImageUrl" />
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
import './wxss/index.wxss'
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
  onShareAppMessage(e) {
    const _this = this;
    _this.userId = wx.getStorageSync('hoteltestUserId');
    // console.log(_this.userId)
    return {
      title: `忆泊大酒店`,
      path: '/pages/index/index?userId='+_this.userId ,// 路径，传递参数到指定页面。
      imageUrl : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2929067511,4026656966&fm=26&gp=0.jpg',
      success(e){
        console.log("分享成功")
      },
      fail(e){
        console.log("分享失败")
      }
    }
  },
  methods: {
    getList(){
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        this.userId = hoteltestUserId;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/invite', params).then((res = {}) => {
          const { data = [] } = res;
          this.datas = data;
          // console.log(this.datas)
        }).catch(res => {
          console.log(res, 'resErr')
        });
      }).catch(err => {
        this.$base.toast('用户信息失效，请重新登录')
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      });
    }
  }
};
</script>
