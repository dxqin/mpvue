<template>
  <div class="account-index w-full">
  
  </div>
</template>
<script>
import './wxss/index.wxss'
export default {
  data() {
    return {
      logo: '/static/img/group.png',
      header: '/static/img/kn.png',
      name: '张三张',
      sex: '先生',
      listData: [{
        text: '所有订单',
        code: 'all_order'
      }, {
        text: '积分',
        code: 'integral'
      }, {
        text: '卡券',
        code: 'coupon'
      }, {
        text: '余额',
        code: 'balance'
      }, {
        text: '我的邀请',
        code: 'invite'
      }, {
        text: '商业合作',
        code: 'cooperate'
      }]
    }
  },
  methods: {
    navigateTo(){
      wx.navigateTo({
        url:'../index/index'
      })
    },
    navagate: function(code) {
      console.log(code)
    }
  },
 }
</script>