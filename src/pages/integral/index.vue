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
                <span class="c3b f16 db">{{item.way}}</span>
                <span class="cb2 f12 db">{{item.time}}</span>
              </p>
              <p class="c3b f16">
                {{operates[item.operate]}}{{item.points}}
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
      operates: {
        '0': '+',
        '1': '-'
      },
      listData: [{
        Rway: '几分钱到',
        time: '2818.10.10 20:00:00',
        points: '5',
        operate: 1
      }, {
        way: '几分钱到',
        time: '2818.10.10 20:00:00',
        points: '5',
        operate: 0
      }, {
        way: '几分钱到',
        time: '2818.10.10 20:00:00',
        points: '5',
        operate: 0
      }]
    }
  },
  created() {
    // this.getIntegralLIst()
  },
  onLoad() {
    const _this = this;
    this.getIntegralLIst()
  },
  methods: {
    getIntegralLIst() {
      const params = {
        userId: 24
      };
      this.$http.get('/integral/record', params).then((res = {}) => {
        const { data = [] } = res;
        console.log(data)
        this.listData = data;
      }).catch(res => {
        console.log(res, 'resErr')
      })
    }
  }

}
</script>
