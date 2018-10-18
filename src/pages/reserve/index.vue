<template>
  <div class="reserve-index">
    <div class="reserve-bg w-full h-full pos-re">
      <div class="bg-top bg-app"></div>
      <div class="bg-bottom pos-re">
        <div class="order-msg-input f14 table-box">
          <div class="list-boxs c-app flex-row">
            <div class="">
              <span class="dib" style="width: 8px;height: 8px;border-radius: 50%; background: #00A4A2;"></span>
            </div>
            <div class="app-right pl20">
              <span>预订成功后讲立即锁定房源</span>
            </div>
          </div>
          <div class="cb4">
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                房间数
              </div>
              <div class="app-right pl30">
                <span class="c333"> <font>1</font> 间</span>
                <span class="cddd">每间最多住两人</span>
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                入住人
              </div>
              <div class="app-right pl30">
               <input type="text" v-model="renterName" placeholder="每间需填一人姓名">
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                手机
              </div>
              <div class="app-right pl30">
               <input type="text" v-model="renterPhone" placeholder="用于接受预订信息">
              </div>
            </div>
            <div class="flex-row jc-ar list-boxs border-top ptb20">
              <div class="app-label pl30">
                优惠
              </div>
              <div class="app-right pl30">
               <span class="c333">积分已抵扣¥ <font>30</font></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-detial bgfff br10 c777 table-box">
        <p class="f12">忆泊城市艺术酒店(古墩路店)</p>
        <p class="f16 c3b">云舍大床房</p>
        <p class="f12">
          <span>8月7日今天</span>
          <span class="tc plr15 bc7 br14 ml10 mr10" style="">1晚</span>
          <span>8月8日周四</span>
        </p>
        <p class="f12"> <span>大床</span> <span>全部房间wifi、有线宽带免费双份早饭</span> <span>双份早饭</span></p>
      </div>
    </div>
    <div class="order-ensure w-full">
      <div class="flex-row f18">
        <div class="order-left pl30">
          <div style="line-height: 56rpx">
            到店支付： <span class="c-app">￥ <font>100</font> </span> 元
          </div>
          <div class="f12 c999">
            已减￥<span>22</span>
          </div>
        </div>
        <div class="send-order cfff bg-app tc">
          提交订单
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './wxss/index.wxss'
export default {
  data() {
    return {
      renterName: ''
    }
  }

}
</script>
