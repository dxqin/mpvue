<template>
  <div class="reserve-index">
    <div class="reserve-bg w-full h-full pos-re">
      <div class="bg-top bg-app"></div>
      <div class="bg-bottom pos-re">
        <div class="f14 integral-list pos-ab p2030 bsbb">
          <p class="integral-title cb2">积分记录</p>
          <ul>
            <li class="flex-col-xy-middle jc-bet ptb20 border-bottom-have" v-for="(item, index) in listData" :key="index">
              <p>
                <span class="c3b f16 db">{{item.Reason}}</span>
                <span class="cb2 f12 db">{{item.date}}</span>
              </p>
              <p class="c3b f16">
                {{item.change}}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="order-detial bgfff br10 c777 table-box">
        <!-- 头像 -->
        <div class="flex-row jc-str">
          <div class="nike-img-box dib">
            <img class="nike-img" :src="nikeHeader"  alt="">
          </div>
          <div class="dib nike-name-box">
            <span class="c35 f14 nike-name-item plr15">Gunner</span>
            <span class="ca3 f10 nike-name-item">先生</span>
          </div>
        </div>
        <!-- 积分数 -->
        <div class="flex-row jc-bet mt60">
          <div class="c-app">
            <p class="f26">135</p>
            <p class="f12">可用积分</p>
          </div>
          <div>
            <img class="logo-img" :src="logo" alt="">
          </div>
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
      logo: 'http://pic22.nipic.com/20120621/1628220_155636709122_2.jpg',
      nikeHeader: 'http://pic22.nipic.com/20120621/1628220_155636709122_2.jpg',
      listData: [{
        Reason: '几分钱到',
        date: '2818.10.10 20:00:00',
        change: '+5'
      }, {
        Reason: '几分钱到',
        date: '2818.10.10 20:00:00',
        change: '+5'
      }, {
        Reason: '几分钱到',
        date: '2818.10.10 20:00:00',
        change: '+5'
      }]
    }
  }

}
</script>
