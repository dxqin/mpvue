<template>
  <div class="account-index w-full">
    <ul class="account-content mt44">
      <li class="content-list content-list-f f14 flex-row jc-bet">
        <span>头像</span>
        <span class="weui-cell__ft_in-access c3b">
          <img class="avatar" :src="user.headImageUrl" @click="chooseimage" />
        </span>
      </li>
      <li class="content-list f14 flex-row jc-bet">
        <span>姓名</span>
        <span class="weui-cell__ft_in-access c3b">{{user.name}}</span>
      </li>
      <li class="content-list f14 flex-row jc-bet">
        <span>性别</span>
        <span class="weui-cell__ft_in-access c3b" v-if="user.sex == 0">男</span>
        <span class="weui-cell__ft_in-access c3b" v-if="user.sex == 1">女</span>
      </li>
      <li class="content-list f14 flex-row jc-bet">
        <span>出生日期</span>
        <span class="weui-cell__ft_in-access c3b">{{user.birthday}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import './wxss/index.wxss'
export default {
  data() {
    return {
      user : this.user,
    }
  },
  onLoad() {
    const _this = this;
    _this.user = {
      headImageUrl : '',
      sex : 0,
      name : '',
      birthday : ''
    }
    this.getData()
  },
  methods: {
    navigateTo(){
      wx.navigateTo({
        url:'../index/index'
      })
    },
    navagate: function(code) {
      console.log(code)
    },
    getData(){
      let data = {
        userId : 24
      };
      this.$http.get('/users/user/detail', data).then((res = {}) => {
        const { data = [] } = res; 
        this.user = data;
      }).catch(res => {
        console.log(res, 'resErr')
      });
    },
    chooseimage: function () {  
      let _this = this;  
      wx.chooseImage({  
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], 
        sourceType: ['album', 'camera'],
        success: function (res) {
          _this.user.headImageUrl = res.tempFilePaths[0];
          wx.uploadFile({
            url: 'http://hoteltest.rudolph-ibs.com/api/hotel/files/headImg/upload', 
            filePath: res.tempFilePaths[0],
            name: 'headImg',
            header: {
              'token' : '3b0dd146c76d44c393f335426e606c13',
              'account': '13065730192'
            },
            formData: {
            },
            success (res){
              console.log("上传成功");
            }
          });
        }
      })  
    },
  },
 }
</script>