<template>
<div class="list">
  <ul class="list-tabs retinabb">
    <li class="list-tabs-tab" @click="changeTabs(index)" :class="{ active: select === index}" v-for="(tab,index) in tabs" :key="tab">{{tab}}</li>
  </ul>
  <scroll-view class="list-orders":scroll-y="true" @scrolltolower="scrollLower()">
    <p class="list-orders-item-outer f14 cb2" v-show="orderList.length <= 0">暂无数据</p>
    <div class="list-orders-item-outer" v-for="(li,index) in orderList" :key="li">
      <div class="list-orders-item" @click="detail(li.orderNumber)">
        <p class="list-orders-item-header">
          <span v-if="li.orderType == 1">系列商品</span>
          <span v-if="li.orderType == 0">酒店</span>
          <span style="color:#00A4A2;">{{statusArr[li.orderStatus]}}</span>
        </p>
        <div class="list-orders-item-content" v-if="li.orderType == 1">
          <img class="pic" :src="li.skuImage" />
          <div class="info">
            <div class="info-title">
              <span class="info-name">{{li.name}}</span>
              <span>￥{{li.price}}</span>
            </div>
            <div class="info-subtitle">{{li.subTitle}}</div>
            <div class="info-num">x{{li.num}}</div>
            <div class="info-num-price">共{{li.total}}件商品 合计：<span style="font-size:32rpx;">￥{{li.totalPrice}}</span></div>
            <div class="product"> 
              <v-button v-if="select == 0" class="count2 mr28">删除</v-button>
              <v-button v-if="select == 0" class="count2">再次预定</v-button>
            </div>
          </div>
        </div>
        <div class="list-orders-item-content flex-col" v-if="li.orderType == 0">
          <div class="info-title" style="width:100%;">
            <span>{{li.hotelName}}</span>
            <span>￥{{li.price}}</span>
          </div>
          <span class="room-Name">{{li.roomTypeName}}</span>
          <span class="room-time">{{li.checkInTime}}~{{li.checkOutTime}}</span>
          <span class="room-time">共{{li.time}}晚</span>
           <div class="product product-btn"> 
            <v-button  class="count2 mr28" @click="onDelete(li.orderNumber)">删除</v-button>
            <v-button v-if="li.orderStatus != 0" class="count2" @click.stop="onOrder(li.hotelId)">再次预定</v-button>
            <v-button v-if="li.orderStatus == 0" class="count2" @click.stop="onCancel(li.orderNumber)">取消订单</v-button>
          </div>
        </div>
      </div>
      <div class="gap"></div>
    </div>
  </scroll-view>
  <toast type="loading" v-if="toastShow">数据加载中</toast>
  <toast v-if="toastShowAll">已显示全部</toast>
</div>
</template>
 

<script>
"use strict";
import Vue from "vue";
import Toast from "../../components/toast/toast.vue";
import countDown from "../../components/count-down/countDown";
import './wxss/index.wxss'
import { parse } from 'semver';
export default {
  data() {
    const _this = this;
    return {
      // dialogControl: _this.dialogControl,
      toastShow: _this.toastShow,
      toastShowAll: _this.toastShowAll,
      orderList: _this.orderList,
      statusArr: ['预定中', '预定成功', '预定取消','已入住','已完成'],
      tabs: _this.tabs,
      select: _this.select,
      page : 1,
      size : 10,
      isLast: false,
      isCanCatch: false,
    };
  }, 
   onLoad() {
    const _this = this;
    _this.select = 0;
    _this.toastShow = false;
    _this.toastShowAll = false;
    _this.currentPage = 1;
    _this.tabs = ["全部"];
    this.getList()
  },
  methods: {
     showToast() {
      const _this = this;
      _this.toastShowAll = true;
      setTimeout(() => {
        _this.toastShowAll = false;
      }, 2000);
    },
    getList() {
      // console.log("page="+this.page)
      const { isLast = false, isCanCatch = false, page = 1, size = 10, orderList } = this.$data;
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId,
          page,
          size,
        }
        this.$http.get('/orderForms/orderForm/all', params).then((res = {}) => {
          this.isCanCatch = true;
          const { data = [] } = res;
          if (Array.isArray(data) && data.length > 0) {
            this.isLast = false
            this.orderList = orderList.concat(data);
            this.page = parseInt(page, 10) + 1;
          } else {
            this.isLast = true;
            this.page = parseInt(page, 10)
          }
        }).catch(res => {
          this.isCanCatch = true;
           this.isLast = false;
           this.page = parseInt(page, 10)
          console.log(res, 'resErr')
        })
      }).catch(err => {
        this.$base.toast('用户信息失效，请重新登录')
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      });
    },
    //删除订单
    onDelete(number){
      const _this = this;
       let params = {
        orderNumber : number
      }
      _this.$http.get('/orderForms/orderForm/delete', params).then((res = {}) => {
        _this.$base.toast('删除成功')
      }).catch(res => {
        console.log(res, 'resErr')
      })
    },
    //取消订单
    onCancel(number){
      const _this = this;
      let params = {
        orderNumber : number
      }
      this.$http.get('/orderForms/orderForm/cancel', params).then((res = {}) => {
        _this.$base.toast('取消成功');
      }).catch(res => {
        console.log(res, 'resErr')
      })
    },
    //再次预定
    onOrder(id){
      let _this = this;
      let inTime = _this.getDates(0);
      let outTime = _this.getDates(1);
      let params = {
        hotelId : id,
        checkInTime : inTime,
        checkOutTime : outTime //离店时间
      };
      // console.log(params);
       wx.navigateTo({
        url: `../reserve-list/index?item=${JSON.stringify(params)}` 
      });
    },
     detail(orderNumber) {
      const _this = this;
      wx.navigateTo({
        url: `../reserve/index?orderNumber=${orderNumber}`
      });
    },
    getDates(AddDayCount){
      let dd = new Date(); 
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
      let y = dd.getFullYear(); 
      let m = dd.getMonth()+1;//获取当前月份的日期 
      m =  m < 10 ? '0' + m : '' + m;
      let d = dd.getDate(); 
      d =  d < 10 ? '0' + d : '' + d;
      return y + "-"+ m + "-" + d; 
    }
  },
  onReachBottom() {
    const  { isLast, isCanCatch } = this.$data;
    if ( !isLast && isCanCatch ) this.getList();
    else this.$base.toast('已加载全部');
  },
  components: {
    Toast,
    countDown
  }
};
</script>
