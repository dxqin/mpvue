<template>
  <div class="reserve-index">
    <div class="reserve-bg w-full h-full pos-re">
      <div class="bg-top bg-app"></div>
      <div class="bg-bottom pos-re">
        <div class="f14 integral-list  p2030 bsbb">
          <p class="integral-title cb2 br10">积分记录</p>
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
            <p class="tc f14 cb2 ptb10" v-show="listData.length <= 0">暂无数据</p>
          </ul>
        </div>
      </div>
      <div class="order-detial bgfff br10 c777 table-box">
        <!-- 头像 -->
        <div class="flex-row jc-str">
          <div class="nike-img-box dib">
            <img class="nike-img" :src="userDetial.headImageUrl || 'nikeHeader'"  alt="">
          </div>
          <div class="dib nike-name-box">
            <span class="c35 f14 nike-name-item plr15">{{userDetial.name || '未知'}}</span>
            <span class="ca3 f10 nike-name-item">{{sexArr[userDetial.sex || 0]}}</span>
          </div>
        </div>
        <!-- 积分数 -->
        <div class="flex-row jc-bet mt60">
          <div class="c-app">
            <p class="f26">{{userDetial.integral || '0'}}</p>
            <p class="f12">
              <span>可用积分</span>
              <span class="icon-content">
                <img :src="icon" class="icon-img" alt="">
              </span>
            </p>
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
      logo: '../../static/img/logo2.png',
      nikeHeader: 'http://pic22.nipic.com/20120621/1628220_155636709122_2.jpg',
      operates: {
        '0': '+',
        '1': '-'
      },
      icon: '../../static/img/nextIcon.png',
      sexArr: ['男', '女', '未知'],
      userDetial: {
        "name": "一杆梅子酒",  //用户名称
        "level": 1,  //用户vip等级
        "integral": 0, //用户剩余积分数
        "headImageUrl": "https://rudolph.com/2.jpeg", // 用户头像url
        "sex": 0,  //用户性别；0:男；1:女
        "birthday": null //用户生日（未填则为null）
      },
      listData: [],
      page: 1,
      size: 10,
      isLast: false,
      isCanCatch: false,
    }
  },
  created() {
    // this.getIntegralLIst()
  },
  onReachBottom() {
    const { isCanCatch, isLast } = this.$data;
    if ( isCanCatch && !isLast ) this.getIntegralList()
  },
  onLoad() {
    const _this = this;
    this.getIntegralList();
    this.getUserDetial()
  },
  methods: {
    getIntegralList() {// 获取积分列表
      this.isCanCatch = false;
      const userId = wx.getStorageSync('hoteltestUserId') || '24';
      let { page, size, listData } = this.$data;
      const params = {
        userId,
        page,
        size,
      };
      this.$http.get('/integral/record', params).then((res = {}) => {
        const { data = [] } = res;
        this.isCanCatch = true;
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item) => {
            listData.push(item);
          })
          page++;
          this.page = page;
          this.listData = listData;
        } else {
          this.isLast = true
        }
      }).catch(res => {
        this.listData = listData;
        this.page = page;
        this.isCanCatch = true;
      })
    },
    getUserDetial() {
      const { userDetial } = this.$data;
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/detail', params).then((res = {}) => {
          const { code = -1, data = {} } = res;
          if (code == 0) {
            let newUserDetial = {
              ...userDetial,
              name : data.name,  //用户名称
              integral: data.integral, //用户剩余积分数
              headImageUrl: data.headImageUrl, // 用户头像url
              sex: data.sex,  //用户性别；0:男；1:女
            }
            this.userDetial = newUserDetial;
          }
        }).catch((err = {}) => {
          this.$base.toast('用户信息失效，请重新登录')
          wx.navigateTo({
            url: `../../pages/register/index`
          })
        })
      });
    }
  }

}
</script>
