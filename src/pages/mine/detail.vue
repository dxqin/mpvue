<template>
<div>
  <div class="detail">
    <section class="detail_status">
      <p class="order_status clearfix">
        <span class="status inline-block">{{orderDetail.statusStr}}</span>
      </p>
      <p class="order_num">
        <span class="title">订单号:  </span>
        <span class="content">{{orderDetail.orderNo}}</span>
      </p>
      <p class="order_time">
        <span class="title">订单时间:  </span>
        <span class="content">{{orderDetail.timeStr}}</span>
      </p>
    </section>

    <section class="detail_express">
      <div>
        <p class="detail_express_hd">
          <span>物流信息</span>
        </p>
        <div class="detail_express_bd">
          <div class="detail_express_bd_content">
            <i class="line inline-block">&nbsp;</i>
            <span class="inline-block circle"></span>
            <p class="context">{{expressInfo.context}}</p>
            <p class="time">{{expressInfo.ftime}}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="detail_address">
      <p class="detail_address_hd">
        <span>收货信息</span>
      </p>
      <p class="detail_address_bd">
        <span class="detail_address_bd_title inline-block">收货人：</span>
        <span class="detail_address_hd_content">{{orderDetail.address.consigneeName}}</span>
      </p>
      <p class="detail_address_bd">
        <span class="detail_address_bd_title inline-block">联系电话：</span>
        <span class="detail_address_hd_content">{{orderDetail.address.consigneeMobile}}</span>
      </p>
      <p class="detail_address_bd">
        <span class="detail_address_bd_title inline-block">收货地址：</span>
        <span class="detail_address_hd_content">{{orderDetail.address.addressInfo}}</span>
      </p>
    </section>

    <section v-for="(li,index) in orderDetail.orderList" :key="index">
      <div class="detail_goods">
        <p class="detail_goods_header">订单{{index + 1}}:</p>
        <div class="detail_goods_content retinabb" v-for="(item, itemIndex) in li.itemList" :key="itemIndex">
          <img class="pic" :src="item.skuImage" @click="goodsLink(item.itemId)" />
          <div class="info">
            <div>
              <p class="info_title">{{item.name}}</p>
              <p class="info_count">{{item.attributesList}}</p>
            </div>
            <div class="info_status">
              <p>
                <span class="info_status_value">￥{{item.limitDiscountPrice}}</span>
                <span class="info_status_count">x{{item.count}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="detail_order text-right">
        <p class="detail_order_express">
          <span class="title">运费： </span>
          <span class="value" v-if="li.expressPrice === 0">已包邮</span>
          <span class="value" v-if="li.expressPrice !== 0">￥{{li.expressPrice}}</span>
        </p>
        <p class="detail_order_count">
          <span class="title">总计： </span>
          <span class="value">￥{{li.subOrderTotalPrice}}</span>
        </p>
      </div>
    </section>

    <section v-if="wawad" class="detail_s">
      <div class="detail_goods">
        <p class="detail_goods_header">商品信息</p>
        <div class="" v-for="item in orderDetail.itemList" :key="item.id">
          <div class="detail_goods_content retinabb">
            <img class="pic" :src="item.skuImage" @click="goodsLink(item.itemId)" />
            <div class="info">
              <div>
                <p class="info_title">{{item.name}}</p>
                <p class="info_count">{{item.attributesList}}</p>
              </div>
              <div class="info_status">
                <p>
                  <span class="info_status_value">￥{{item.limitDiscountPrice}}</span>
                  <span class="info_status_count">x{{item.count}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="detail_count">
      <p class="detail_address_hd">
        <span>订单金额</span>
      </p>
      <p class="detail_address_bd">
        <span class="detail_address_bd_title inline-block">商品总价：</span>
        <span class="detail_address_hd_content">￥{{orderDetail.orderAmount}}</span>
      </p>
      <p class="detail_address_bd">
        <span class="detail_address_bd_title inline-block">运费(快递)：</span>
        <span class="detail_address_hd_content" v-if="orderDetail.expressAmount === 0">已包邮</span>
        <span class="detail_address_hd_content" v-if="orderDetail.expressAmount !== 0">￥{{orderDetail.expressAmount}}</span>
      </p>
      <p class="detail_address_bd">
        <span class="detail_address_bd_title inline-block">总计：</span>
        <span class="detail_address_hd_content2">￥{{orderDetail.totalAmount}}</span>
      </p>

    </section>     
    <section class="detail_cancel">
      <button class="detail_cancel_btn block" @click="cancelOrder()">取消订单</button>
    </section>
    <p>&nbsp;</p>


    <section class="detail_pay">
      <div class="detail_pay_hd">
        <p>
          <span class="title">合计:</span>
          <span class="value">￥{{orderDetail.totalAmount}}</span>
        </p>
        <p class="tips">{{discount}}后<br>无人拼单自动关闭</p>
      </div>
      <div class="detail_pay_hd" v-if="ddd">
        <div>
          <span class="title">合计:</span>
          <span class="value">￥{{orderDetail.totalAmount}}</span>
        </div>
      </div>
      <div class="detail_pay_hd" v-if="ddd">
        <span class="tips_check">{{discount}}后 自动确认收货</span>
      </div>
      <div class="detail_pay_btn" v-if="ddd" @click="payNow()">
        <span>立即支付</span>
      </div>
      <div class="detail_pay_btn" @click="checkedOrder2()">邀请好友拼单</div>
      <div class="detail_pay_btn" v-if="ddd" @click="checkedOrder()">确认收货</div>
    </section>
  </div>
</div>
</template>

<style lang="stylus" scoped>
@import './styles/detail.styl';

.pay_methods {
  background-color: #FFFFFF;
  margin-bottom: 20rpx;
}

.pay_methods_cell {
  margin: 20rpx 40rpx 0 40rpx;
}

.pay_methods_cell_title {
  margin-top: 20rpx;
}

.pay_methods_cell_content {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}

.pay_methods_cell_content {
  margin-top: 30rpx;
}

.pay_methods_cell_content.wx {
  border-bottom: 1rpx solid #d2d2d2;
}

.pay_methods_cell_content_left {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.pay_methods_cell_content_title .default {
  color: #000000;
  font-size: 28rpx;
}

.pay_methods_cell_content_title .sub {
  color: #8e97a1;
  font-size: 24rpx;
}

.pay_methods_cell_content_icon_wx {
  width: 68rpx;
  height: 68rpx;
}

.pay_methods_cell_content_icon {
  width: 68rpx;
  max-height: 68rpx;
}

.pay_methods_cell_content_title {
  margin-left: 30rpx;
  display: flex;
  flex-direction: column;
}

.pay_methods_cell_content_title.name {
  font-size: 28rpx;
}

.pay_methods_cell_content_title.sub {
  font-size: 24rpx;
  color: #8e97a1;
}

.pay_methods_cell_content_select {
  width: 40rpx;
  height: 40rpx;
  float: right;
  margin-right: 30rpx;
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
