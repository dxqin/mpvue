<template>
<div>
  <loading :loadingstatus="loadingstatus">
  </loading>
  <div class="confirm" v-if="confirm">
    <section v-if="confirm.address !== null">
      <div class="confirm_address">
        <div class="confirm_address_hd">
          <span>收货信息</span>
          <div @click="navigate('/pages/item/address')">
            <span class="fr edit">修改地址</span>
          </div>
        </div>
        <p class="confirm_address_bd">
          <span class="confirm_address_bd_title inline-block">收货人：</span>
          <span class="confirm_address_hd_content">{{confirm.address.consigneeName}}</span>
        </p>
        <p class="confirm_address_bd">
          <span class="confirm_address_bd_title inline-block">联系电话：</span>
          <span class="confirm_address_hd_content">{{confirm.address.consigneeMobile}}</span>
        </p>
        <p class="confirm_address_bd confirm_address_bb">
          <span class="confirm_address_bd_title inline-block">收货地址：</span>
          <span class="confirm_address_hd_content">{{confirm.address.address}}</span>
        </p>
      </div>
    </section>

    <section v-if="confirm.address === null">
      <div class="confirm_address">
        <p class="confirm_address_hd">
          <span>收货信息</span>
        </p>
        <div class="confirm_address_none">
          <div @click="navigate('/pages/item/address')">
            <p class="content">
              +添加收货地址
            </p>
          </div>
        </div>
      </div>
    </section>
    <section v-for="(li,index) in confirm.orderList" :key="index">
      <div class="confirm_goods">
        <p class="confirm_goods_header">订单{{index + 1}}:</p>
        <div class="confirm_goods_content retinabb" v-for="(item,index2) in li.itemsList" :key="index2">
          <img class="pic" :src="item.sku.imageUrl" @click="goodsLink(item.id)" />
          <div class="info">
            <p class="info_status">
              <span class="info_status_value">￥{{item.sku.limitDiscountPrice}}</span>
              <span class="info_status_count">x{{item.sku.count}}</span>
              <span class="info_status_discount" v-if="item.sku.privilegeName !== '' ">
                  <del>￥{{item.sku.price}}</del>
                  <!-- <span>{{item.sku.privilegeName}}</span> -->
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="confirm_order text-right">
        <p class="confirm_order_express">
          <span class="title">运费：</span>
          <span class="content" v-if="confirm.address !== null && li.expressPrice === 0">已包邮</span>
          <span class="content" v-if="confirm.address !== null && li.expressPrice !== 0">￥{{li.expressPrice}}</span>
          <span class="content" v-if="confirm.address === null">—</span>
        </p>
        <p class="confirm_order_count">
          <span class="title">总计：</span>
          <span class="content value">￥{{li.subOrderTotalPrice}}</span>
        </p>
      </div>
    </section>
    <div class="confirm_coupon">
      <div class="confirm_coupon_bd">
        <p class="confirm_coupon_title">优惠券</p>
        <div class="confirm_coupon_content">
          <div @click="navigate('/pages/item/wait')" class="confirm_coupon--used" v-if="ableCoupon === 1 && couponDetail">-￥{{couponDetail.coupon.amount}}</div>
          <div @click="navigate('/pages/item/wait')" class="confirm_coupon--able" v-if="ableCoupon === 2">未使用</div>
          <div @click="navigate('/pages/item/wait')" class="confirm_coupon--none" v-if="ableCoupon === 3">无可用</div>
          <i class="confirm_coupon_arrow"></i>
        </div>
      </div>
    </div>
    <div class="confirm_pay">
      <p class="inline-block confirm_pay_hd">
        <span class="title">合计:</span>
        <span class="value">￥{{count}}</span>
      </p>
      <a class="fr confirm_pay_btn text-center" :class="{disabled : !addInfo}" @click.stop.prevent="submit()">
        <div class="load3 inline-block" v-show="payStauts">
          <div class="loader"></div>
        </div>
        <span v-show="!payStauts">立即支付</span>
      </a>
    </div>

  </div>
  <user-analysis></user-analysis>
</div>
</template>


<style lang="stylus" scoped>
  @import "./styles/confirm.styl"
</style>


<script>
'use strict';
import Vue from 'vue';
import Modal from '../../components/dialog/dialog.vue';
import userAnalysis from '../../components/user-analysis/user-analysis';
import loading from '../../components/loading/loading';
export default {
  localStorage: {
    skuList: {
      type: Array,
      default: []
    }
  },
  data() {
    const _this = this;
    return {
      loadingstatus: _this.loadingstatus,
      count: _this.count,
      dialogControl: _this.dialogControl,
      confirm: _this.confirm,
      hasAbroadGoods: _this.hasAbroadGoods,
      useCommission: _this.useCommission,
      addInfo: _this.addInfo,
      payStauts: _this.payStauts,
      userRecommendFlag: _this.userRecommendFlag,
      couponListTotal: _this.couponListTotal,
      couponDetail: _this.couponDetail,
      skuList: _this.skuList,
      total: _this.total,
    }
  },
  activated() {
    const _this = this;
    _this.init();
  },
  computed: {
    ableCoupon() {
      const _this = this;
      switch (true) {
        case Boolean(_this.$route.query.userCouponId):
          return 1;
          break;
        case _this.couponListTotal !== 0:
          return 2;
          break;
        case _this.couponListTotal === 0:
          return 3;
          break;
        default:
          return 0;
      }
    },
    vipDiscout() {
      const _this = this;
      return (parseInt(_this.confirm.couponOfferAmount * 1000, 10) - parseInt(_this.confirm.memberOfferAmount * 1000, 10)) / 1000;
    }
  },
  methods: {
    init() {
      const _this = this;
      _this.loadingstatus = true;
      _this.count = 0;
      _this.dialogControl = false;
      _this.orderConfirm();
      _this.hasAbroadGoods = false;
      _this.addInfo = false;
      _this.payBtnActive = true;
      _this.useCommission = false;
      _this.payStauts = false;
      _this.userRecommendFlag = 0;
      _this.couponListTotal = 0;
    },
    handleDialogAction(action) {
      const _this = this;
      _this.dialogControl = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //点击商品图片链接
    goodsLink(id) {
      const _this = this;
      if (false) {
        _this.$router.push({
          name: 'membership',
        });
      } else {
        _this.$router.push({
          name: 'goodsDetail',
          params: {
            id
          },
        });
      }
    },
    //获取订单确认数据
    orderConfirm() {
      const _this = this;
      let data = {};
      let skuList = sessionStorage.getItem("skuList");
      skuList = JSON.parse(skuList);
      _this.skuList = encodeURIComponent(JSON.stringify(skuList));
      let addressId = sessionStorage.getItem('addressId');
      let userCouponId = _this.$route.query.userCouponId;
      if (addressId === '' || addressId === null || addressId === 'undefined') {
        data = {
          skuList
        }
      } else {
        data = {
          skuList,
          addressId
        }
      }
      if (userCouponId) {
        data.userCouponId = userCouponId;
      }
      Vue.OneMallHttp().POST(data, Vue.OneMallUrl.orderConfirm).then((res) => {
        if (res.code === 0) {
          _this.confirm = res.data;
          _this.userRecommendFlag = _this.confirm.orderList[0].itemsList[0].userRecommendFlag;
          if (_this.confirm.address !== null) {
            let addressId = _this.confirm.address.id
            sessionStorage.setItem("addressId", addressId);
            _this.addInfo = true;
          } else {
            _this.addInfo = false;
          }
          let orderList = _this.confirm.orderList;
          let orderPriceList = [];
          let itemIndex = 0;
          orderList.forEach((v, i, a) => {
            let orderPrice = 0;
            orderList[i].itemsList.forEach((v, j, a) => {
              let itemsList = orderList[i].itemsList[j];
              let sku = itemsList.sku;
              orderPrice += itemsList.memberTotalAmount * 100;
              //遍历数组查看是否有跨境商品，判断是否使用佣金抵扣时候用
              if (itemsList.warehouseType === 1) {
                _this.hasAbroadGoods = true;
              }
            });
            orderPriceList[itemIndex] = {};
            orderPriceList[itemIndex].orderPrice = orderPrice;
            orderPriceList[itemIndex].expressPrice = orderList[i].expressPrice;
            itemIndex += 1;
          });
          //每个订单的订单总计与订单运费存在orderPriceList中
          // console.log(orderPriceList);
          let total = {};
          total.price = 0;
          total.express = 0;
          orderPriceList.forEach((v, i, a) => {
            total.price += orderPriceList[i].orderPrice;
            total.express += orderPriceList[i].expressPrice * 100;
          });
          total.price = total.price / 100;
          total.express = total.express / 100;
          console.log(Boolean(userCouponId));
          _this.getPrice(total, Boolean(userCouponId), skuList);
          _this.loadingstatus = false;
        }
      })
    },
    getPrice(total, usecoupon, skuList) {
      const _this = this;
      let price = total.price;
      let expressPrice = total.express;
      if (usecoupon) {
        let userCouponId = _this.$route.query.userCouponId;
        let couponValue = 0;
        return Vue.OneMallHttp().GET('', `${Vue.OneMallUrl.coupon}${userCouponId}`).then((res) => {
          if (res.code === 0) {
            _this.couponDetail = res.data;
            setPrice(couponValue, total);
          }
        });
        setPrice(couponValue);
      } else {
        let data = {
          skuList,
          validFlag: true,
        }
        let couponValue = 0;
        return Vue.OneMallHttp().POST(data, Vue.OneMallUrl.couponList).then((res) => {
          if (res.code === 0) {
            _this.couponListTotal = res.data.count;
            setPrice(couponValue, total);
          }
        });
      }
      //所有订单的订单总计与运费总和存在total中
      console.log(total);

      function setPrice(couponValue, total) {
        _this.total = total;
        _this.count = (parseInt(price * 1000, 10) + parseInt(expressPrice * 1000, 10) - parseInt(couponValue * 1000, 10)) / 1000;
        _this.count = _this.count.toFixed(2);
        console.log(_this.count);
        const commission = _this.confirm.fundAvailable;
        const totalCount = _this.count;
        _this.commission = commission;
        _this.totalCount = totalCount;
      }
    },
    /**
     * 创建订单
     * @params
     * addressId:地址id
     * skuList:商品列表
     * totalPrice:商品总价（邮费+商品金额）
     * fundAvailable:使用的佣金金额
     * payAmount:支付金额
     * expressAmount:运费总计
     * totalAmountNotExpress:去除运费后的金额
     */
    submit() {
      const _this = this;
      // console.log(this.confirm.userCrossInfoFlag);
      if (_this.payBtnActive === false) {
        return;
      }
      if (_this.addInfo) {
        if (!_this.confirm.userCrossInfoFlag) {
          //不需要填写跨境信息
          let userCouponId = _this.$route.query.userCouponId;
          let addressId = _this.confirm.address.id;
          let skuList = sessionStorage.getItem("skuList");
          skuList = JSON.parse(skuList);
          let expressAmount = _this.total.express;
          let payAmount = Number(_this.count);
          let totalPrice = Number(_this.totalCount);
          let totalAmountNotExpress = _this.total.price;
          let fundAvailable = _this.commission - _this.confirm.fundAvailable;
          let data = {
            addressId,
            skuList,
            totalPrice,
            fundAvailable,
            payAmount,
            expressAmount,
            totalAmountNotExpress
          };
          if (userCouponId) {
            data.userCouponId = userCouponId;
          }
          _this.payBtnActive = false;
          _this.payStauts = true;
          Vue.OneMallHttp().POST(data, Vue.OneMallUrl.orderCreate).then((res) => {
            if (res.code === 0) {
              // 清除购物车信息
              let orderList = sessionStorage.getItem("skuList");
              orderList = JSON.parse(orderList);
              orderList.forEach((v, i, a) => {
                let id = orderList[i].skuId;
                let skuList = _this.$localStorage.get('skuList');
                skuList.forEach((v, j, a) => {
                  if (skuList[j].skuId === id) {
                    skuList.remove(j);
                  }
                });
                _this.$localStorage.set('skuList', skuList);
              });
              // 清除暂存的列表信息&地址信息
              sessionStorage.clear();
              _this.payInfo = res.data;
              // alert(_this.payInfo.orderNo);
              _this.pay = _this.payInfo.pay;
              // console.log(_this.pay);

              wx.ready(function() {
                wx.chooseWXPay({
                  timestamp: _this.pay.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符. easywechat改回了timestamp
                  nonceStr: _this.pay.nonceStr, // 支付签名随机串，不长于 32 位
                  package: _this.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  signType: _this.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: _this.pay.paySign, // 支付签名
                  success: function(res) {
                    if (false) {
                      _this.$router.push('/pages/item/payError');
                    } else {
                      _this.$router.push('/pages/item/paySuccess');
                    }
                  },
                });
              });
            }
          });
        } else {
          _this.$router.push('/pages/item/payError');
        }
      }
    },
    rule() {
      const _this = this;
      _this.dialogControl = true;
      window.mallUtils.funs.unTouchMove();
    },
    checked() {
      const _this = this;
      let fundAvailable = _this.confirm.fundAvailable;
      if (_this.useCommission) {
        if (fundAvailable >= _this.total.price) {
          if (_this.total.price < 1) {
            _this.confirm.fundAvailable = _this.commission;
            _this.count = _this.totalCount;
            _this.count = _this.count.toFixed(2);
          } else {
            _this.confirm.fundAvailable = (parseInt(fundAvailable * 1000, 10) - parseInt(_this.total.price * 1000, 10)) / 1000 + 1;
            _this.count = 1 + parseInt(_this.total.express * 1000, 10) / 1000;
            _this.count = _this.count.toFixed(2);
          }
        } else {
          if (fundAvailable <= (_this.total.price - 1)) {
            _this.confirm.fundAvailable = 0;
            _this.count = (parseInt(_this.count * 1000, 10) - parseInt(fundAvailable * 1000, 10)) / 1000;
            _this.count = _this.count.toFixed(2);
          } else {
            _this.confirm.fundAvailable = (1000 - (parseInt(_this.count * 1000, 10) - parseInt(fundAvailable * 1000, 10))) / 1000;
            _this.count = 1 + parseInt(_this.total.express * 1000, 10) / 1000;
            _this.count = _this.count.toFixed(2);
          }
        }
        console.log('checked');
      } else {
        _this.confirm.fundAvailable = _this.commission;
        _this.count = _this.totalCount;
        console.log('unchecked');
      }
    }
  },
  components: {
    Modal,
    userAnalysis,
    loading
  }
}
</script>

