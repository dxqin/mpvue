<template>
<div class="update">
  <div class="update-con">
    <input class="username c3b f16" type="text" v-model="userName" />
    <sapn class="cb2 f12">4-20个字符，可由中英文、数字、“_”、“-”组成</sapn>
    <button class="btn f16" @click="onUpdate">确定</button>
  </div>
</div>
</template>
 
<script>
"use strict";
import Vue from "vue";  
import './wxss/update.wxss'
export default {
  data() {
    const _this = this;
    return {
     userName : _this.userName
    };
  },
  onLoad() {
    const _this = this;
    this.getUser();
  },
  methods: {
    getUser(){
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/detail', params).then((res = {}) => {
          const { data = [] } = res; 
          this.userName = data.name;
        }).catch(res => {
          console.log(res, 'resErr')
        });
      }).catch(err => {
        this.$base.toast('用户信息失效，请重新登录')
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      });
    },
    onUpdate(){
      const _this = this;
      let reg =  /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9-_]){4,20}$/;
      if(!reg.test(_this.userName)){
        _this.$base.toast('昵称由4-20个中英文、数字、“_”、“-”组成的字符');
        return;
      }
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId,
          name : _this.userName,
        }
         this.$http.post('/users/user/modify', params).then((res = {}) => {
          _this.$base.toast('修改成功');
          wx.navigateTo({
            url:'../user/index'
          });
        }).catch(res => {
          console.log(res, 'resErr')
        });
      }).catch(err => {
        this.$base.toast('用户信息失效，请重新登录')
        wx.navigateTo({
          url: `../../pages/register/index`
        })
      });
    }
  }
};
</script>
