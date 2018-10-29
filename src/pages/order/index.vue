<template>
<div class="list">
  <ul class="list-tabs retinabb">
    <li class="list-tabs-tab" @click="changeTabs(index)" :class="{ active: select === index}" v-for="(tab,index) in tabs" :key="tab">{{tab}}</li>
  </ul>
  <scroll-view class="list-orders" :style="{'height': '1200rpx'}" :scroll-y="true" @scrolltolower="scrollLower()">
    <div class="list-orders-item-outer" v-for="(li,index) in orderList" :key="li">
      <div class="list-orders-item" @click="detail(index)">
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
            <v-button v-if="select == 0" class="count2 mr28">删除</v-button>
            <v-button v-if="select == 0" class="count2">再次预定</v-button>
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
import format from "../../utils/format";
import './wxss/index.wxss'
export default {
  data() {
    const _this = this;
    return {
      // dialogControl: _this.dialogControl,
      // toastShow: _this.toastShow,
      // toastShowAll: _this.toastShowAll,
      orderList: _this.orderList,
      statusArr: ['预定中', '预定成功', '预定取消','已入住','已完成'],
      tabs: _this.tabs,
      select: _this.select
    };
  }, 
   onLoad() {
    const _this = this;
    _this.select = 0;
    _this.tabs = ["全部"];
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        userId: 24,
        page : 1,
        size : 5
      };
      this.$http.get('/orderForms/orderForm/all', params).then((res = {}) => {
        const { data = [] } = res;
        this.orderList = data;
      }).catch(res => {
        console.log(res, 'resErr')
      })
    }
  },
  // methods: {
  //   init() {
  //     const _this = this;
  //     _this.type = 0;
  //     _this.toastShow = false;
  //     _this.toastShowAll = false;
  //     _this.currentPage = 1;
  //     _this.tabs = ["全部", "待付款", "待发货", "已发货"];
  //     _this.select = 0;
  //     //   _this.firstGetList();
  //   },
  //   showToast() {
  //     const _this = this;
  //     _this.toastShowAll = true;
  //     setTimeout(() => {
  //       _this.toastShowAll = false;
  //     }, 2000);
  //   },
  //   // processOrderList(orderList) {
  //   //   orderList.forEach((order) => {
  //   //     order.dateTime = format.formatDate(order.createTime, 'YYYY/MM/DD')
  //   //   })
  //   //   return orderList
  //   // },
  //   firstGetList() {
  //     const _this = this;
  //     _this.orderList2 = [];
  //     let orderType = _this.$root.$mp.query.type;
  //     if (orderType) {
  //       _this.type = Number(orderType);
  //       _this.select = Number(orderType);
  //     }
  //     let params = {
  //       status: _this.type,
  //       pageLimit: 6,
  //       page: _this.currentPage
  //     };
  //     _this.$http.get("/order/list", params).then(res => {
  //       if (res.code === 0) {
  //         _this.orderList = res.data;
  //         // _this.orderList.data = res.data.data
  //         res.data.data.forEach(order => {
  //           order.createTime = format.formatDate(
  //             order.createTime,
  //             "YYYY/MM/DD"
  //           );
  //           _this.orderList2.push(order);
  //         });
  //         //_this.scroll();
  //       }
  //     });
  //   },
  //   // getList() {
  //   //   const _this = this;
  //   //   let params = {
  //   //     status: _this.type,
  //   //     pageLimit: 6,
  //   //     page: _this.currentPage
  //   //   }
  //   //   _this.$http.get('/order/list', params).then((res) => {
  //   //     if (res.code === 0) {
  //   //       _this.orderList = res.data;
  //   //       _this.orderList.data = _this.processOrderList(res.data.data);
  //   //       //_this.scroll();
  //   //     }
  //   //   })
  //   // },
  //   changeTabs(type) {
  //     const _this = this;
  //     _this.type = type;
  //     _this.select = type;
  //     _this.currentPage = 1;
  //   //   _this.firstGetList();
  //   },
  //   detail(index) {
  //     const _this = this;
  //     // console.log(index);
  //     let order = _this.orderList2[index];
  //     if (order.status === 1000) {
  //       wx.navigateTo({
  //         url: "/pages/mine/detail?id=" + order.orderNo + "&type=multiple"
  //       });
  //     } else {
  //       wx.navigateTo({
  //         url: "/pages/mine/detail?id=" + order.orderNo + "&type=single"
  //       });
  //     }
  //   },
  //   formatDate(value, style) {
  //     let date = format.formatDate(value, style);
  //     return date;
  //   },
  //   scrollLower() {
  //     const _this = this;
  //     console.log(_this.currentPage);
  //     _this.showToast();
  //     if (
  //       _this.orderList.count / (_this.orderList.perPage * _this.currentPage) >
  //       1
  //     ) {
  //       // _this.toastShow = true;
  //       _this.currentPage += 1;
  //       let params = {
  //         status: _this.type,
  //         pageLimit: 6,
  //         page: _this.currentPage
  //       };
  //       _this.$http.get("/order/list", params).then(res => {
  //         if (res.code === 0) {
  //           // _this.toastShow = false;
  //           res.data.data.forEach(order => {
  //             order.createTime = format.formatDate(
  //               order.createTime,
  //               "YYYY/MM/DD"
  //             );
  //             _this.orderList2.push(order);
  //           });
  //         }
  //       });
  //     } else {
  //       _this.showToast();
  //     }
  //   }
  // },
  components: {
    Toast,
    countDown
  }
};
</script>
