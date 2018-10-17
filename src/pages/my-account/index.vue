<template>
  <div class="account-index w-full">
    <div class="index-header flex-row jc-bet">
      <div>
        <img :src="logo" class="index-logo" alt="">
      </div>
      <div class="header-right">
        <span class="f12 cb2 my-account-nav">EBO VIP</span>
        <div class="dib my-account-text">
          <div class="c-app f12">我的账户</div>
          <div class="my-account-border"></div>
        </div>
      </div>
    </div>
    <div class="accpunt-admin flex-row jc-bet">
      <div class="admin-left">
        <p class="flex-row jc-str">
          <span class="c333 f20 pr20 text-overf-ell" style="max-width: 400rpx; display: inline-block">{{name}}</span>
          <span class="cc6 f12" style="line-height: 66rpx;">{{sex}}</span>
        </p>
        <p class="c-app f12 pt20">查看及修改个人资料</p>
      </div>
      <div class="admin-right" style="background: red">
        <img class="admin-nike-img" :src="header" alt="">
      </div>
    </div>
    <ul class="account-content mt44">
      <li v-for="item in listData" class="content-list f12 c3b flex-row jc-bet mb20" :key="item.code" @click="navagate(item.code)">
        <span>{{item.text}}</span>
        <span class="weui-cell__ft_in-access"></span>
      </li>
    </ul>
  </div>
</template>
<script>
import './wxss/index.wxss'
export default {
  data() {
    return {
      logo: 'http://pic22.nipic.com/20120621/1628220_155636709122_2.jpg',
      header: 'http://pic22.nipic.com/20120621/1628220_155636709122_2.jpg',
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
    navagate: function(code) {
      console.log(code)
    }
  },


}
</script>
