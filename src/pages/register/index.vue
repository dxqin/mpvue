<template>
  <div class="register w-full h-full pos-re">
    <div class="index-bg bg-fff w-full h-full">
      <div class="bg-head">

      </div>
    </div>
    <div class="index-content bgfff">
      <div class="login-index" :hidden="isRegister">
        <div class="login-form br10">
          <div class="weui-celles weui-cell_input mobel bsbb mlr15" style="padding-bottom: 0">
            <div class="weui-cell__bd border-bottom-have" style="padding-bottom: 20rpx">
              <input class="weui-input f15" placeholder-style="color: #b2b2b2" placeholder="用户手机号" v-model="mobel"/>
            </div>
          </div>
          <div class="weui-celles weui-cell_input weui-cell_vcode code f14 bsbb plr15">
            <div class="weui-cell__bd">
              <input class="weui-input f15" placeholder-style="color: #b2b2b2" placeholder="短信验证码" v-model="code" />
            </div>
            <div class="weui-cell__ft">
              <div class="geeu-btn ptb10  f12 send-code-btn mb10 c-app" @click="handleSendCode">{{codeText}}</div>
            </div>
          </div>
        </div>
        <div class="login-submit app-btn mt30 f16 tc br10" @click="handleLoginByCode">
          登录
        </div>
        <div class="to-register mt60 cb2 f14 tc" @click="changeType(true)">
          <div class="to-register-text tc" style="align-items: center">
            <div class="dib">新用户注册</div>
            <div class="icon-content dib">
            </div>
          </div>
        </div>
      </div>
      <div class="register-index" :hidden="!isRegister">
        <div class="register-form br10 cb2">
          <div class="weui-celles weui-cell_input mobel bsbb mlr15" style="padding-bottom: 0">
            <div class="weui-cell__bd border-bottom-have" style="padding-bottom: 20rpx">
              <input class="weui-input f15" placeholder-style="color: #b2b2b2" placeholder="用户手机号" v-model="registerMobel"/>
            </div>
          </div>
          <div class="weui-celles weui-cell_input mobel bsbb mlr15" style="padding-bottom: 0">
            <div class="weui-cell__bd border-bottom-have" style="padding-bottom: 20rpx">
              <input class="weui-input f15" placeholder-style="color: #b2b2b2" placeholder="用户名" v-model="registerName"/>
            </div>
          </div>
          <div class="weui-celles weui-cell_input mobel bsbb mlr15" style="padding-bottom: 0">
            <div class="weui-cell__bd border-bottom-have f15 dis-flex jc-bet cb2" style="padding-bottom: 20rpx">
              <span>性别</span>
              <div class="sex-picker">
                <picker
                  :range="sexArr"
                  range-key="label"
                  @change="changeSex"
                >
                  <view class="picker tr">
                    {{sexLabel || '男'}}
                  </view>
                </picker>
              </div>
            </div>
          </div>
          <div class="weui-celles weui-cell_input weui-cell_vcode code f14 bsbb plr15">
            <div class="weui-cell__bd">
              <input class="weui-input f15" placeholder-style="color: #b2b2b2" placeholder="短信验证码" v-model="registerCode"/>
            </div>
            <div class="weui-cell__ft">
              <div class="geeu-btn ptb10  f12 send-code-btn mb10 c-app" @click="getRegisterCode">{{registerCodeText}}</div>
            </div>
          </div>
        </div>
        <div class="register-submit app-btn mt30 f16 tc br10" @click="registerSubmit">
          注册
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import './wxss/index.wxss'
import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
  data() {
    return {
      mobel: '',
      code: '',
      codeText: '发送验证码',
      registerCodeText: '发送验证码',
      sendCode: true,
      sexArr: [
        {
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }, {
          value: '2',
          label: '保密'
        }
      ],
      sexVal: '0',
      sexLabel: '男',
      isRegister: false,
      registerMobel: '',
      registerName: '',
      registerCode: ''
    }
  },
  methods: {
    changeSex(e) {
      console.log(e)
      const { value: sexVal = '1' } = e.target;
      const checkedLabel = this.sexArr.filter(item => item.value === sexVal)
      this.sexLabel = checkedLabel.length > 0 ? checkedLabel[0].label : '男';
      this.sexVal = sexVal;
    },
    changeType(val) {
      this.isRegister  = val;
    },
    handleSendCode() { // 登陆短信验证码
      const { mobel } = this.$data;
      if (!this.$base.isPhone(mobel)) {
        this.$base.toast('请输入正确的手机号')
      } else {
        const params = {
          mobile: mobel
        }
        this.$http.post('/sms/login/sms', params).then((res = {}) => {
          console.log(res, 'res')
          const { code = -1, msg = '操作失败' } = res;
          this.$base.toast(msg)
          if (code == 0) {
            let time = 60;
            var interval = setInterval(() => {
              this.codeText = `${time}s`
              time --;
            }, 1000)
            setTimeout(() => {
              clearInterval(interval);
              this.codeText = `发送验证码`
            }, 60000)
          }
        }).catch((err = {}) => {
          console.log(err, 'err')
        })
      }
    },
    handleLoginByCode () {// 登陆
      const { mobel, code } = this.$data;
      if (!this.$base.isPhone(mobel)) {
        this.$base.toast('请输入正确的手机号')
      } else if (!code || code.length < 4) {
        this.$base.toast('请输入正确的验证码')
      } else {
        const params = {
          account: mobel,
          code,
        }
        this.$http.post('/users/vip/codeLogin', params).then((res = {}) => {
          console.log(res, 'res');
          const { code = -1, msg = '操作失败', data: { id = '', token = '', expireTime = 0 } } = res;
          this.$wxasync.setStorage('hoteltestToken', token);
          this.$wxasync.setStorage('hoteltestExpireTime', expireTime);
          this.$wxasync.setStorage('account', mobel);
          this.$wxasync.setStorage('hoteltestUserId', id);
          this.$base.toast(msg);
          wx.redirectTo({
            url: '../../pages/reserve-list/index'
          })
        }).catch((err = {}) => {
          console.log(err, 'err')
        })
      }
    },
    getRegisterCode () { // 获取注册验证码
      console.log(1111)
      const { registerMobel } = this.$data;
      if (!this.$base.isPhone(registerMobel)) {
        this.$base.toast('请输入正确的手机号')
      } else {
        const params = {
          mobileNumber: registerMobel
        }
        this.$http.get('/sms/register/sms', params).then((res = {}) => {
          console.log(res, 'res')
          const { code = -1, msg = '操作失败' } = res;
          this.$base.toast(msg)
          if (code == 0) {
            let time = 60;
            var interval = setInterval(() => {
              this.registerCodeText = `${time}s`
              time --;
            }, 1000)
            setTimeout(() => {
              clearInterval(interval);
              this.registerCodeText = `发送验证码`
            }, 60000)
          }
        }).catch((err = {}) => {
          console.log(err, 'err')
        })
      }
    },
    registerSubmit() {
      const { registerMobel, registerCode, registerName, sexVal } = this.$data;
      if (!this.$base.isPhone(registerMobel)) {
        this.$base.toast('请输入正确的手机号')
      } else if (!registerCode || registerCode.length < 4) {
        this.$base.toast('请输入正确的验证码')
      } else if (!registerName) {
        this.$base.toast('请填写用户名')
      } else if (!sexVal) {
        this.$base.toast('请选择性别')
      } else {
        const params = {
          account: registerMobel,
          code: registerCode,
          nickname: registerName,
          sex: sexVal
        }
        this.$http.post('/users/user/register', params).then((res = {}) => {
          console.log(res, 'res');
          const { code = -1, msg = '操作失败' } = res;
          this.$base.toast(msg)
        }).catch((err = {}) => {
          console.log(err, 'err')
        })
      }
    }
  }
}
</script>

