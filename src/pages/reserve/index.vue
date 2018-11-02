<template>
  <div class="reserve-index">
    <div class="reserve-bg w-full h-full pos-re">
      <div class="bg-top bg-app"></div>
      <div class="bg-bottom pos-re">
        <div class="order-msg-input f14 table-box">
          <div class="list-boxs c-app flex-row">
            <p class="f14 c3b pl30">订单信息</p>
          </div>
          <div class="cb4">
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                入住人
              </div>
              <div class="app-right pl30 c3b">
                {{renterDetial.name || '暂无数据'}}
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                手机
              </div>
              <div class="app-right pl30 c3b">
                {{renterDetial.mobile || '暂无数据'}}
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                订单号
              </div>
              <div class="app-right pl30 c3b">
                {{renterDetial.orderNumber || '暂无数据'}}
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                下单时间
              </div>
              <div class="app-right pl30 c3b">
                {{renterDetial.orderCreateTime || '暂无数据'}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-detial bgfff br10 c777 table-box">
        <div class="f12 dis-flex jc-bet">
          <span>{{hotelName || '暂无数据'}}<font class="icon-content dib"></font> </span>
          <span class="f14">￥{{price || '---'}}</span>
        </div>
        <p class="f16 c3b">{{roomTypeName || '暂无数据'}}</p>
        <p class="f12">
          <span>{{checkInTime || '暂无数据'}}</span>
          <span class="tc plr15 bc7 br14 ml10 mr10" style="">{{time || '-'}}晚</span>
          <span>{{checkOutTime || '暂无数据'}}</span>
        </p>
        <p class="f12"> <span>{{valueAddedService || ''}}</span></p>
      </div>
    </div>
    
  </div>
</template>
<script>
import './wxss/index.wxss'
export default {
  data() {
    return {
      renterName: '',
      orderNumber: '',
      renterDetial: {
        name: '',
        mobile: '',
        orderNumber: '',
        orderCreateTime: '',
      },
      hotelName: '',
      roomTypeName: '',
      price: '',
      checkInTime: '',
      checkOutTime: '',
      time: '',
      valueAddedService: ''
    }
  },
  onLoad(options = {}) {
    const { orderNumber = '201810211438013565' } = options;
    this.orderNumber = orderNumber;
    this.fetchDetial();
  },
  methods: {
    fetchDetial() {
      const { orderNumber = '', renterDetial } = this.$data;
      const params = {orderNumber}
      this.$http.get('/orderForms/orderForm/detail', params).then((res = {}) => {
        // console.log(res, 'res');
        const { data = {} } = res;
        const {
          name = '', mobile = '', orderNumber = '', orderCreateTime = '', hotelName = '', roomTypeName = '',
          checkInTime = '', checkOutTime = '', time = '', valueAddedService = '', price = ''
        } = data;
        const newRenterDetial = {
          ...renterDetial,
          name: name,
          mobile: mobile,
          orderNumber: orderNumber,
          orderCreateTime: orderCreateTime
        };
        this.renterDetial = newRenterDetial;
        this.hotelName = hotelName;
        this.roomTypeName = roomTypeName;
        this.checkInTime = this.$base.checkDate(checkInTime || new Date());
        this.checkOutTime = this.$base.checkDate(checkOutTime || new Date());
        this.time = time;
        this.price = price;
        this.valueAddedService = valueAddedService;
      }).catch((err = {}) => {
        console.log(err, 'err')
      })
    },
    
  }
}
</script>
