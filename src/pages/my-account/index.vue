<template>
  <div class="account-index w-full">
    <div class="index-header flex-row jc-bet">
      <div class="logo-show">
        <img :src="logo" class="index-logo" alt="">
      </div>
      <div class="header-right">
        <span class="f12 cb2 my-account-nav" @click="navigateToIndex()">EBO VIP</span>
        <div class="dib my-account-text">
          <div class="c-app f12">我的账户</div>
          <div class="my-account-border"></div>
        </div>
      </div>
    </div>
    <div class="accpunt-admin flex-row jc-bet">
      <div class="admin-left">
        <div v-if="!isNull">
          <p class="flex-row jc-str">
            <span class="c333 f20 pr20 text-overf-ell" style="max-width: 400rpx; display: inline-block">{{name}}</span>
            <span class="cc6 f12" style="line-height: 66rpx;">{{sexArr[sex]}}</span>
          </p>
          <p class="c-app f12 pt20"  @click="lookMain">查看及修改个人资料</p>
        </div>
        <div v-else>
          <p class="flex-row jc-str" style="font-size: 20px; color: #353535" @click="toLogin">
            登录/注册
          </p>
          <p class="c-app f12 pt20" @click="lookMain">查看及修改个人资料</p>
        </div>
      </div>
      <div class="admin-right" style="background: #fff; box-shadow: 0 0 10rpx #ddd;">
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
      logo: '/static/img/group.png',
      header: '',
      name: '',
      sex: 0,
      sexArr: ['男', '女'],
      isNull: false,
      listData: [{
        text: '所有订单',
        code: 'order'
      }, {
        text: '积分',
        code: 'integral'
      }, {
        text: '卡券',
        code: 'coupon'
      }
      // , {
      //   text: '余额',
      //   code: 'balance'
      // }
      , {
        text: '我的邀请',
        code: 'invite'
      }
      // , {
      //   text: '商业合作',
      //   code: 'cooperate'
      // }
      ]
    }
  },
  methods: {
    navigateToIndex(){
      wx.switchTab({
        url: '../../pages/index/index'
      })
    },
    lookMain() {
      wx.navigateTo({
        url: '../../pages/user/index'
      })
    },
    toLogin() {
      wx.redirectTo({
        url: '../../pages/register/index'
      })
    },
    navagate(url) {
      wx.navigateTo({
        url: `../../pages/${url}/index`
      })
    },
    userDetial() {
      // const hoteltestUserId = this.$wxasync.getStorage('hoteltestUserId')
      this.$wxasync.getStorage('hoteltestUserId').then((res = {}) => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/detail', params).then((res = {}) => {
          const { data = {}, code = 0 } = res;
          if (code == 0) {
            const { headImageUrl = '', name = '', sex = 0 } = data;
            this.header = headImageUrl;
            this.name = name;
            this.sex = sex;
            this.isNull = false
          } else {
            this.isNull = true
          }
        }).catch(res => {
          this.isNull = true
          console.log(res, 'resErr')
        });
      }).catch((res = {}) => {
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      })
    }
  },
  onShow() {
    this.userDetial() 
  }

}
</script>
