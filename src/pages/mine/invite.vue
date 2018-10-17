<template>
<div>
  <div class="invite">
    <img class="invite-img" src="/static/img/invite.png" />
    <span class="invite-tit">邀请好友得现金奖励</span>
    <span class="invite-txt">为好友提供优惠链接，TA首次下单后您可获得该订单 实付金额的8%作为奖励。</span>
    <button class="invite-btn">立即分享邀请链接</button>
     <span sytle="font-weight:500" class="z-width-100-percent ub-box ub-ver z-font-size-18 z-color-000 z-lineHeight-36">—我的现金奖励—</span>      
    <span>0元</span>
    <span>已邀请的好友</span>

  </div>
</div>
</template>

<style scoped>
.invite{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.invite .invite-img{
  width: 352rpx;
  height: 248rpx;
  margin-top: 78rpx;
  margin-bottom: 26rpx;
}

.invite .invite-tit{
  font-weight:600;
  color:rgba(59,59,59,1);
  font-size: 32rpx;
  margin-bottom: 26rpx;
}

.invite .invite-txt{
  font-size: 24rpx;
  width: 602rpx;
  display: inline-block;
  color:rgba(178,178,178,1);
  margin-bottom: 40rpx;
  text-align: center;
}

.invite .invite-btn{
  border: 0;
  outline: none;
  width:678rpx;
  height:100rpx;
  line-height:100rpx;
  background-color:rgba(0,164,162,1);
  border-radius:10rpx;
  color:rgba(255,255,255,1);
  font-size:32rpx;
  letter-spacing:1rpx;
}

</style>


<script>
"use strict";
import Vue from "vue";
import format from "@/utils/format";
import tools from "@/utils/mp";

export default {
  data() {
    const _this = this;
    return {
      loadingstatus: _this.loadingstatus,
      dialogControl: _this.dialogControl,
      dialogCheckItem: _this.dialogCheckItem,
      toastShow: _this.toastShow,
      orderDetail: _this.orderDetail,
      discount: _this.discount,
      expressInfo: _this.expressInfo,
      localCancelOrder: _this.localCancelOrder,
      customService: _this.customService,
      payStauts: _this.payStauts,
      userRecommendFlag: _this.userRecommendFlag,
      channel: 4
    };
  },
  onShow() {
    const _this = this;
    _this.init();
  },
  methods: {
    init() {
      const _this = this;
      _this.discount = '22时23分13秒'
      _this.loadingstatus = true;
      _this.orderDetail = {
        orderNo: 22331122233,
        statusStr: "待分享...",
        timeStr: "2018年12月22日 12:55",
        address: {
          consigneeName: "王花臂",
          consigneeMobile: "15833338888",
          addressInfo: "仓溢东苑"
        },
        orderList: [
          {
            expressPrice: 45,
            subOrderTotalPrice: "555",
            itemList: [
              {
                skuImage: "/static/img/kn.png",
                name: "王花臂牌康娜抱枕",
                attributesList: "花臂 满背",
                limitDiscountPrice: "444",
                count: 2
              }
            ]
          },
          {
            expressPrice: 0,
            subOrderTotalPrice: "555",
            itemList: [
              {
                skuImage: "/static/img/kn.png",
                name: "王花臂牌康娜抱枕",
                attributesList: "花臂",
                limitDiscountPrice: "222",
                count: 3
              }
            ]
          }
        ],
        itemList: [
          {
            skuImage: "/static/img/kn.png",
            name: "王花臂牌康娜抱枕",
            attributesList: "花臂 满背",
            limitDiscountPrice: "444",
            count: 2
          },
          {
            skuImage: "/static/img/kn.png",
            name: "王花臂牌康娜抱枕",
            attributesList: "花臂",
            limitDiscountPrice: "222",
            count: 3
          }
        ],
        orderAmount: '888',
        expressAmount: 0,
        totalAmount: '888'
      };
      _this.expressInfo = {
        context: '[仓前]仓溢东苑 已发出',
        ftime: '2018-12-22 12:16:33'
      };
      _this.localCancelOrder = false;
      _this.toastShow = false;
      _this.dialogControl = false;
      _this.dialogCheckItem = false;
      _this.customService = false;
      _this.payStauts = false;
      _this.userRecommendFlag = 0;
      //   _this.getDetail();
    },
    showToast() {
      tools.showToast({ title: "操作成功", icon: "success" });
    },
    //点击商品图片链接
    goodsLink(id) {
      const _this = this;
      if (false) {
        _this.$router.push({
          name: "membership"
        });
      } else {
        _this.$router.push({
          name: "goodsDetail",
          params: {
            id
          }
        });
      }
    },
    //获取订单详情
    getDetail() {
      const _this = this;
      let orderNo = _this.$root.$mp.query.id;
      let type = _this.$root.$mp.query.type;
      let params = {
        orderNo
      };
      if (type === "multiple") {
        _this.$http.get("/order/orderDetail", params).then(res => {
          if (res.code === 0) {
            _this.orderDetail = res.data;
            _this.orderDetail.timeStr = format.formatDate(
              _this.orderDetail.createTime,
              "YYYY年MM月DD日 HH:mm"
            );
            _this.orderDetail.orderAmount =
              _this.orderDetail.activityOrderAmount;
            _this.orderDetail.statusStr = format.detailOrderStatus(
              _this.orderDetail.status
            );
            _this.userRecommendFlag =
              _this.orderDetail.orderList[0].itemList[0].userRecommendFlag;
            _this.timeDiscount(_this.orderDetail.createTime);
            _this.loadingstatus = false;
          }
        });
      } else {
        _this.$http.get("/order/subOrderDetail", params).then(res => {
          if (res.code === 0) {
            _this.orderDetail = res.data;
            _this.orderDetail.timeStr = format.formatDate(
              _this.orderDetail.createTime,
              "YYYY年MM月DD日 HH:mm"
            );
            _this.orderDetail.orderAmount =
              _this.orderDetail.activityOrderAmount;
            _this.orderDetail.statusStr = format.detailOrderStatus(
              _this.orderDetail.status
            );
            _this.userRecommendFlag =
              _this.orderDetail.itemList[0].userRecommendFlag;
            //待发货订单
            if (_this.orderDetail.status === 1000) {
              _this.timeDiscount(_this.orderDetail.createTime);
            }
            //已发货订单
            if (_this.orderDetail.status === 3000) {
              _this.timeDiscount(_this.orderDetail.expressUpdateTime);
            }
            //已发货&订单完成订单获取物流信息
            if (
              _this.orderDetail.status === 3000 ||
              _this.orderDetail.status === 4000
            ) {
              _this.getExpress(_this.orderDetail.orderNo);
            }
            if (
              _this.orderDetail.status !== 1000 &&
              _this.localCancelOrder === false
            ) {
              let itemList = _this.orderDetail.itemList;
              itemList.forEach((v, i, a) => {
                itemList[i].btn = {};
                itemList[i].info = {};
                switch (itemList[i].status) {
                  //用户申请退款
                  case 2001:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "已申请退款，等待平台确认";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = false;
                    itemList[i].btn.content = "";
                    break;
                  //退款驳回
                  case 2002:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "退款已驳回";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "联系客服";
                    break;
                  //退款驳回（平台发货）
                  case 2001:
                    itemList[i].info.show = false;
                    itemList[i].info.content = "";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = false;
                    itemList[i].btn.content = "";
                    break;
                  //用户申请退货
                  case 3001:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "已申请退货，等待平台确认";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = false;
                    itemList[i].btn.content = "";
                    break;
                  //平台同意退货并要求用户将商品寄回
                  case 3002:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "退货请求已批准，请将商品寄回";
                    itemList[i].info.warn = false;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "填写物流信息";
                    break;
                  //用户退回货品
                  case 3003:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "退货请求已批准，请将商品寄回";
                    itemList[i].info.warn = false;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "修改物流信息";
                    break;
                  //平台驳回退货
                  case 3004:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "退货已驳回";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "联系客服";
                    break;
                  //退货驳回后用户确认收货或者系统自动收货
                  case 3003:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "退货请求已批准，请将商品寄回";
                    itemList[i].info.warn = false;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "修改物流信息";
                    break;
                  //平台同意退货退款
                  // case -1004:
                  //   itemList[i].info.show = true;
                  //   itemList[i].info.content = "退货请求已批准，请将商品寄回";
                  //   itemList[i].info.warn = false;
                  //   itemList[i].btn.show = true;
                  //   itemList[i].btn.content = "修改物流信息";
                  //   break;
                  //用户申请售后
                  case 4001:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "已申请售后，等待平台确认";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = false;
                    itemList[i].btn.content = "";
                    break;
                  //平台同意售后并要求用户将商品寄回
                  case 4002:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "售后请求已批准，请将商品寄回";
                    itemList[i].info.warn = false;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "填写物流信息";
                    break;
                  //用户退回商品
                  case 4003:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "售后请求已批准，请将商品寄回";
                    itemList[i].info.warn = false;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "修改物流信息";
                    break;
                  //售后驳回
                  case 4004:
                    itemList[i].info.show = true;
                    itemList[i].info.content = "售后驳回";
                    itemList[i].info.warn = true;
                    itemList[i].btn.show = true;
                    itemList[i].btn.content = "联系客服";
                    break;
                  default:
                    itemList[i].info.show = false;
                    itemList[i].info.content = "";
                    itemList[i].info.warn = false;
                    itemList[i].btn.show = false;
                    itemList[i].btn.content = "";
                }
              });
              console.log(itemList);
            }
            _this.loadingstatus = false;
          }
        });
      }
    },
    //获取物流详情
    getExpress(id) {
      const _this = this;
      // console.log(id);
      // id = '1702071741162275288338';
      let params = {
        orderNo: id
      };
      return this.$http.get("/order/express", params).then(res => {
        if (res.code === 0) {
          let express = res.data;
          if (express.expressInfo.length > 0) {
            _this.expressInfo = express.expressInfo[0];
          } else {
            _this.expressInfo.context = "暂无";
          }
          sessionStorage.setItem("express", JSON.stringify(express));
        }
      });
    },
    //支付操作
    payNow() {
      const _this = this;
      let orderNo = _this.$root.$mp.query.id;
      let data = {
        orderNo,
        channel: _this.channel
      };
      _this.payStauts = true;
      _this.$http.get("/pay/orderPay", data).then(res => {
        if (res.code === 0) {
          _this.payInfo = res.data;
          _this.pay = _this.payInfo.pay;
          if (_this.channel == 2) {
            // 额度支付
            this.$http
              .post("/pay/creditCallback", { orderNo: _this.payInfo.orderNo })
              .then(res => {
                if (res.code === 0) {
                  // 支付成功
                  wx.showToast({
                    title: "支付成功",
                    icon: "none",
                    duration: 2000
                  });
                  setTimeout(function() {
                    wx.redirectTo({
                      url:
                        "/pages/order/list?result=success&id=" +
                        _this.payInfo.orderNo
                    });
                  }, 3000);
                } else {
                  // 支付失败
                  console.log(res.message);
                  wx.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 2000
                  });
                  setTimeout(function() {
                    wx.redirectTo({
                      url:
                        "/pages/order/list?result=success&id=" +
                        _this.payInfo.orderNo
                    });
                  }, 3000);
                }
              });
          } else {
            // 小程序支付
            wx.requestPayment({
              timeStamp: _this.pay.timestamp,
              nonceStr: _this.pay.nonceStr,
              package: _this.pay.package,
              signType: _this.pay.signType,
              paySign: _this.pay.paySign,
              success: function(res) {
                wx.redirectTo({
                  url:
                    "/pages/order/list?result=success&id=" +
                    _this.payInfo.orderNo
                });
              },
              fail: function(res) {
                wx.redirectTo({
                  url:
                    "/pages/order/list?result=failure&id=" +
                    _this.payInfo.orderNo
                });
              },
              complete: function(res) {}
            });
          }
        }
      });
    },
    //取消订单&自动确认收货倒计时
    timeDiscount(time) {
      const _this = this;
      let type = _this.$root.$mp.query.type;
      let timeLen = 0;
      if (type === "multiple") {
        timeLen = 30;
      } else {
        timeLen = 60 * 24 * 14;
      }
      setInterval(() => {
        let diff = this.$moment(
          this.$moment(time * 1000 + timeLen * 60 * 1000).diff(this.$moment())
        ).utc();
        if (diff > 0) {
          if (type === "multiple") {
            _this.discount = diff.format("mm分ss秒后");
          } else {
            let dd = (_this.discount = diff.format("DD") - 1);
            _this.discount = dd + diff.format("天HH小时mm分");
          }
        } else {
          if (type === "multiple") {
            _this.orderDetail.status = -1000;
          } else {
            //_this.orderDetail.status = 4000;
          }
        }
      }, 1000);
    },
    //退款退货售后操作
    operation(value, id, status) {
      const _this = this;
      //退款 type=refund
      if (value === 2000) {
        _this.$router.push({
          name: "afterSaleReason",
          params: {
            type: "refund",
            id: id
          }
        });
        return;
      }
      //退货 type=return
      if (value === 3000) {
        _this.$router.push({
          name: "afterSaleReason",
          params: {
            type: "return",
            id: id
          }
        });
        return;
      }
    },
    //填写&修改物流信息跳转
    editExpressInfo(value, id) {
      const _this = this;
      //填写物流信息 type=new
      if (value === 3002 || value === 4002) {
        _this.$router.push({
          name: "afterSaleExpress",
          params: {
            type: "new",
            id: id
          }
        });
        return;
      }
      //修改物流信息 type=edit
      if (value === 3003 || value === 4003) {
        _this.$router.push({
          name: "afterSaleExpress",
          params: {
            type: "edit",
            id: id
          }
        });
        return;
      }
    },
    //取消订单按钮
    cancelOrder() {
      const _this = this;
      _this.dialogControl = true;
    },
    //确认收货按钮
    checkedOrder() {
      const _this = this;
      _this.dialogCheckItem = true;
      _this.checkedItem("确定");
    },
    //取消订单操作
    handleDialogAction(action) {
      const _this = this;
      if (action === "确定") {
        let orderNo = _this.$route.params.id;
        let data = {
          orderNo
        };
        Vue.OneMallHttp()
          .PUT(data, Vue.OneMallUrl.cancelOrder)
          .then(res => {
            if (res.code === 0) {
              // this.$route.params.type = "single";
              _this.getDetail();
              _this.showToast();
              _this.localCancelOrder = true;
            }
          });
      }
      _this.dialogControl = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //确认收货操作
    checkedItem(action) {
      const _this = this;
      if (action === "确定") {
        let orderNo = _this.$root.$mp.query.id;
        let data = {
          orderNo
        };
        _this.$http.put("/order/orderConfirm", data).then(res => {
          if (res.code === 0) {
            _this.getDetail();
            _this.showToast();
          }
        });
      }
      _this.dialogCheckItem = false;
    },
    hideCustomService(action) {
      const _this = this;
      _this.customService = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //客服
    cs() {
      const _this = this;
      _this.customService = true;
      window.mallUtils.funs.unTouchMove();
    },
    payMethod(channel) {
      const _this = this;
      _this.channel = channel;
    }
  }
};
</script>
