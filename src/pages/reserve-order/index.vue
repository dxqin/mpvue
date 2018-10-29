<template>
  <div class="reserve-index">
    <div class="reserve-bg w-full h-full pos-re">
      <div class="bg-top bg-app"></div>
      <!-- 预定信息 -->
      <div class="bg-bottom pos-re bsbb" style="padding-top: 90rpx;">
        <div class="f14 order-msg-input table-box">
          <div class="list-boxs c-app flex-row">
            <div class="">
              <span class="dib" style="width: 8px;height: 8px;border-radius: 50%; background: #00A4A2; margin-left: 30rpx"></span>
            </div>
            <div class="app-right">
              <span class="pl20">预订成功后讲立即锁定房源</span>
            </div>
          </div>
          <div class="cb4">
            <div class="flex-row jc-ar list-boxs border-top ptb14">
              <div class="app-label pl30">
                房间数
              </div>
              <div class="app-right pl30">
                <span class="c333">
                    <font>
                      <picker @change="bindPickerChange" :value="index" :range="aptNums">
                        <view class="picker">
                        {{aptNums[checkedIndex]}} <span class="pl20">间</span> <span class="cddd pl20" style="color: #ddd">每间最多住两人</span>
                        </view>
                      </picker>
                    </font>
                </span>
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb14">
              <div class="app-label pl30">
                入住人
              </div>
              <div class="app-right pl30">
               <input type="text" v-for="(item, index) in renterName" v-model="renterName[index]" placeholder="每间需填一人姓名" :key="index">
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb14">
              <div class="app-label pl30">
                手机
              </div>
              <div class="app-right pl30">
               <input type="number" v-model="renterPhone" placeholder="用于接受预订信息">
              </div>
            </div>
          </div>
        </div>
        <div class="mt20 mb10">
          <div class="f14 order-msg-input table-box">
            <div class="list-boxs  flex-row">
              <div style="width: 100px; margin-left: 30rpx">
                <span class="fb c3b">本单可享</span>
                <span class="dib c-app" style="width: 8px;height: 8px;border-radius: 50%; background: #00A4A2; margin-left: 30rpx"></span>
              </div>
              <div class="app-right c-app">
                <span class="pl20">已为您优选最优惠组合</span>
              </div>
            </div>
            <div class="cb4">
              <div class="flex-row jc-ar list-boxs border-top ptb14">
                <div class="app-label pl30">
                  特惠
                </div>
                <div class="app-right pl30">
                <span>
                  <font v-if="couponPrice > 0">天天特价立减¥{{couponPrice * hotelNum}}</font>
                  <font v-else>暂无优惠</font>
                </span>
                </div>
              </div>
              <div class="flex-row jc-ar list-boxs border-top ptb14">
                <div class="app-label pl30">
                  优惠券
                </div>
                <div class="app-right pl30">
                  <span v-if="discountPrice > 0">提前3天预定立减{{discountPrice}}元</span>
                  <span v-else>暂无可用优惠券</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 积分抵扣 -->
      
      <!-- 订单详情 -->
      <div class="order-detial bgfff br10 c777 table-box">
        <p class="f12">{{ newOptions.pickerLabelDefault || '暂无数据'}}</p>
        <p class="f16 c3b">{{ newOptions.roomPriceName || '暂无数据'}}</p>
        <p class="f12">
          <span>{{ newOptions.dateStart }}</span>
          <span class="tc plr15 bc7 br14 ml10 mr10" style="">1晚</span>
          <span>{{ newOptions.dateEnd }}</span>
        </p>
        <p class="f12"> <span>{{newOptions.bedType}}</span> <span>{{newOptions.roomPriceName}}</span></p>
      </div>
    </div>
    <div class="order-ensure w-full">
      <div class="flex-row f18">
        <div class="order-left pl30">
          <div style="line-height: 56rpx">
            到店支付： <span class="c-app">￥ <font>{{payPrice}}</font> </span> 元
          </div>
          <div class="f12 c999">
            已减￥<span>{{countPrice}}</span>
          </div>
        </div>
        <div class="send-order cfff bg-app tc" @click="sendOrder">
          提交订单
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './wxss/index.wxss'
import { parse } from 'semver';
export default {
  data() {
    return {
      // renterName: '',
      renterPhone: '',
      aptNum: ['1', '2', '3', '4', '5'],
      aptNums: ['1', '2', '3', '4', '5'],
      checkedIndex: 0,
      roomTypeId: '',
      hotelNum: 1,
      renterName: [''],
      couponPrice: 0, // 特惠优惠金额（预定几间房间就要乘几）
      discountPrice: 0, // discountPrice 优惠券优惠金额
      newOptions: '',
      dataOptions: {},
      price: 0,
      payPrice: 0,
      countPrice: 0 
    }
  },
  onLoad(options) {
    const { newDetial = '' } = options;
    const newOptions = JSON.parse(newDetial)
    const { roomTypeId = '' } = newOptions;
    console.log(newOptions, 'newOptions')
    this.roomTypeId = roomTypeId;
    this.newOptions = newOptions;
    this.price = newOptions.price;
    this.dataOptions = JSON.parse(newDetial);
    this.checkedData();
    this.checkDiscount()
  },
  methods: {
    bindPickerChange(even) {
      console.log(even, 'val')
      const { couponPrice, discountPrice, price } = this.$data;
      const { value: checked = 0 } = even.target;
      const checkedIndex = parseInt(checked, 10);
      const checkedNum = checkedIndex + 1;
      this.checkedIndex = checkedIndex;
      this.hotelNum = checkedIndex + 1;
      const countPrice = couponPrice * checkedNum + discountPrice;// 优惠的金额
      this.countPrice = countPrice;
      this.payPrice = checkedNum * price  - countPrice;
      console.log(checkedIndex, 'checkedIndex', checkedNum);
      let arr = [];
      for(var i = 0; i < checkedNum; i++) {
        arr.push('')
      }
      this.renterName = arr;
    },
    checkedData() {
      const { roomTypeId } = this.$data;
    },
    sendOrder() {
      const { renterName, renterPhone, checkedIndex, roomTypeId, dataOptions = {} } = this.$data;
      const hoteltestUserId = this.$wxasync.getStorage('hoteltestUserId');
      const orderCounts = this.aptNums[checkedIndex]
      console.log('renterName', renterName);
      let isNullRenterName = false;
      renterName.forEach(element => {
        console.log(element,'element', this.$base.isNull(element))
        if(this.$base.isNull(element)) {
          isNullRenterName = true
        }
      })
      console.log(isNullRenterName, 'isNullRenterName')
      if (isNullRenterName) {
        this.$base.toast('请填写入住人')
      } else if (! this.$base.isPhone(renterPhone)) {
        this.$base.toast('请填写正确的手机号')
      } else {
        this.$wxasync.getStorage('hoteltestUserId').then(res => {
          const { data:hoteltestUserId = '' } = res;
          console.log(res, 'res')
          const params = {
            checkInTime: dataOptions.dateStart,
            checkOutTime: dataOptions.dateEnd,
            mobile: renterPhone,
            name: renterName.join(','),
            orderCounts,
            roomPriceId: dataOptions.roomPriceId,
            userId: hoteltestUserId
          }
          this.$http.post('/orderForms/create/orderForm', params).then((res = {}) => {
            console.log(res, 'res1111');
            const { code = -1 } = res;
            if (code == 0) {
              this.$base.toast('预定成功，自动跳转到首页')
              wx.switchTab({
                url: '../../pages/index/index'
              })
            }
          }).catch((err = {}) => {
            console.log(err, 'err1111')
          })
        }).catch(err => {
          console.log('用户信息失效，请重新登录')
          this.$base.toast('用户信息失效，请重新登录')
          wx.navigateTo({
            url: `../../pages/register/index`
          })
        })
      }
    },
    checkDiscount() {// 获取优惠券
      const { roomPriceId = '', price } = this.$data;
      const userId = this.$wxasync.getStorage('hoteltestUserId') || ''
      const params = {
        userId,
        roomPriceId
      }
      this.$http.get('/orderForms/calculate/discount', params).then((res = {}) => {
        console.log(res, 'res');
        const { couponPrice = 0, discountPrice = 0 } = res;
        this.couponPrice = couponPrice;
        this.discountPrice = discountPrice;
        console.log()
        this.payPrice = price - couponPrice - discountPrice;
      }).catch((err = {}) => {
        console.log(err, 'err')
      })
    }
  }
}
</script>
