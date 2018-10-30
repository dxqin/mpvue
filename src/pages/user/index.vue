<template>
  <div class="account-index w-full">
    <ul class="account-content mt44">
      <li class="content-list content-list-f f14 flex-row jc-bet">
        <span>头像</span>
        <span class="weui-cell__ft_in-access c3b">
          <img class="avatar" :src="user.headImageUrl" @click="chooseimage" />
        </span>
      </li>
      <li class="content-list f14 flex-row jc-bet" @click="toUpdate">
        <span>姓名</span>
        <span class="weui-cell__ft_in-access c3b">{{user.name}}</span>
      </li>
      <li class="content-list f14 flex-row jc-bet">
        <span>性别</span>
         <picker class="weui-cell__ft_in-access c3b"
            :range="sexArr"
            range-key="label"
            @change="changeSex">
          <span class="c3b">
            {{sexArr[user.sex].label}}
          </span>
         </picker>
      </li>
      <li class="content-list f14 flex-row jc-bet">
        <span>出生日期</span>
        <picker mode="date"
          :value="endDate"
          :start="pickerEnd" end="2217-09-01" @change="birthdayChange($event)">
            <div class="index_picker">
              <span class="weui-cell__ft_in-access c3b">{{user.birthday}}</span>
            </div>
        </picker>
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
      sexArr: [
        {
          value: 0,
          label: '男'
        }, {
          value: 1,
          label: '女'
        }
      ],
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
    this.getData();
  },
  methods: {
    toUpdate(){
      wx.navigateTo({
        url:'../user/update'
      })
    },
    changeSex(e) {
      const _this = this;
      const sexValue = e.target.value;
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId,
          sex : Number(sexValue)
        };
         this.$http.post('/users/user/modify', params).then((res = {}) => {
          _this.$base.toast('修改成功');
          _this.getData();
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
    birthdayChange(even) { 
      const _this = this;
      const bvalue = even.target.value;
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId,
          birthday : bvalue
        }
         this.$http.post('/users/user/modify', params).then((res = {}) => {
          _this.$base.toast('修改成功');
           _this.getData();
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
    getData(){
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/detail', params).then((res = {}) => {
          const { data = [] } = res; 
          this.user = data;
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
              _this.$base.toast('上传成功');
            }
          });
        }
      })  
    },
  },
 }
</script>