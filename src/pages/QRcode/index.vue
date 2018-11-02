<template>
  <div class="container-middle">
    <canvas canvas-id="myCanvas" style="width:750rpx;height:1000rpx">
      <div class="qrcode" >
        <img class="logo" src="./../../../static/img/logo2.png" />
        <div class="qrcode-img-s">
          <img class="qrcode-img" :src="datas" />
          <img class="avatar" :src="user.headImageUrl" />
        </div>
        <span>长按二维码扫码，可邀请好友获得红包奖励</span>
        <span>至酒店直接扫二维码，可直接录入个人信息</span>
      </div>
    </canvas>
    <button @click="getImg()">保存并分享图片</button>
  </div>
</template>
<script>
import './wxss/index.wxss' 
export default {
  data() {
    return {
      datas : {},
      user : {}
    }
  },
  onLoad() {
    const _this = this;
    this.getData();
  },
  methods: {
    getData(){
      this.$wxasync.getStorage('hoteltestUserId').then(res => {
        const { data:hoteltestUserId = '' } = res;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/QRCode', params).then((res = {}) => {
          this.datas = res.data;
          this.getUser();
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
    getUser(){
      this.$wxasync.getStorage('hoteltestUserId').then(response => {
        const { data:hoteltestUserId = '' } = response;
        const params = {
          userId: hoteltestUserId
        }
        this.$http.get('/users/user/detail', params).then((res = {}) => {
          this.user = res.data;
          // this.getImg();
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
    getImg(){
      console.log("下载")
      // const data = new Uint8ClampedArray([255, 0, 0, 1])
      // wx.canvasPutImageData({
      //   canvasId: 'myCanvas',
      //   x: 0,
      //   y: 0,
      //   width: 1,
      //   data: data,
      //   success(res) {}
      // });
      let _this = this;
      const ctx = wx.createCanvasContext('myCanvas', this);   
      ctx.draw(false, function () {
        _this.saveCanvasImage();
      });
      // wx.canvasToTempFilePath({
      //   x: 100,
      //   y: 200,
      //   width: 50,
      //   height: 50,
      //   destWidth: 100,
      //   destHeight: 100,
      //   canvasId: 'myCanvas',
      //   success(res) {
      //     _this.targetSharePath = res.tempFilePath;
      //     console.log(res.tempFilePath)
      //     _this.saveImageToPhotosAlbum()
      //   }
      // })
     
    //  this.drawImage()
    },
     saveImageToPhotosAlbum () {    
      var that = this;
      wx.saveImageToPhotosAlbum({      
        filePath: that.targetSharePath,      
        success: function () {
          wx.showModal({          
            title: '',          
            content: '图片保存成功，快去分享到朋友圈吧',          
            showCancel: false
          })
          // that.hideDialog();
        }
      })
    },
    drawImage () { 
      var that = this;  
      var windowWidth = '750rpx';
      var windowHeight = '900rpx';
      const temp = 0.01;//图片长宽比
      const scale = 1.78;//背景图高度
      const bgScale = 0.5;//头像和宽的比
      const avatarWidthScale = 0.368;
      const avatarHeightScale = 0.117;//头像白色圆形背景
      const avatarBgWidthScale = 0.38;
      const avatarStrokeWidth = 4;//昵称高度比
      const nicknameHeightScale = 0.34 + 5 * temp;//第一行文字高度
      const topTextScale = 0.515 + 3 * temp;//分享内容
      const contentScale = 0.585 + 3 * temp;
      const contentScale2 = 0.620 + 3 * temp;//二维码直径
      const qrCodeWidthScale = 0.341;//二维码高度
      const qrCodeHeightScale = 0.69;//极客文字
      const bpbScale = 0.91 + temp * 2;//识别文字
      const decodeScale = 0.935 + temp * 2;
      const ctx = wx.createCanvasContext('myCanvas', this);    
      var bgPath = '../../../static/img/timg.jpg';    //设置 canvas 背景，不然生成的图片背景会有黑色底
      // ctx.setFillStyle(WHITE);
      ctx.fillRect(0, 0, windowWidth, windowHeight);    //绘制背景图片
      ctx.drawImage(bgPath, 0, 0, windowWidth, windowHeight * bgScale);    //头像背景圆
      ctx.arc(windowWidth / 2, avatarWidthScale / 2 * windowWidth + avatarHeightScale * windowHeight, (avatarWidthScale / 2) * windowWidth + avatarStrokeWidth, 0, 2 * Math.PI);
      // ctx.setFillStyle(WHITE);
      ctx.fill();    //先绘制圆，裁剪成圆形图片
      ctx.save();
      ctx.beginPath();    //圆的原点x坐标，y坐标，半径，起始弧度，终止弧度
      ctx.arc(windowWidth / 2, avatarWidthScale / 2 * windowWidth + avatarHeightScale * windowHeight, (avatarWidthScale / 2) * windowWidth, 0, 2 * Math.PI);
      // ctx.setStrokeStyle(WHITE);
      ctx.stroke();
      ctx.clip();    //绘制头像
      //图片路径，左上角x坐标，左上角y坐标，宽，高
      var avatarWidth = avatarWidthScale * windowWidth;//头像半径
      ctx.drawImage(that.user.headImageUrl, windowWidth * (0.5 - avatarWidthScale / 2), avatarHeightScale * windowHeight, avatarWidth, avatarWidth);
      ctx.restore();    //绘制 content
      // ctx.setFillStyle(GRAY_COLOR);
      ctx.setFontSize(18);
      ctx.setTextAlign('center');
      // ctx.fillText(that.data.detailStr.content, windowWidth / 2, contentScale * windowHeight);
      // ctx.setFillStyle(GRAY_COLOR);
      ctx.setFontSize(18);
      ctx.setTextAlign('center');
      // ctx.fillText(that.data.detailStr.contentOther, windowWidth / 2, contentScale2 * windowHeight);    //绘制二维码
      ctx.drawImage(that.datas, windowWidth * (0.5 - qrCodeWidthScale / 2), qrCodeHeightScale * windowHeight, qrCodeWidthScale * windowWidth, qrCodeWidthScale * windowWidth);    
      console.log('font------------>' + wx.canIUse('canvasContext.font'));    //绘制 按压提示文字
      // ctx.setFillStyle(TINT_COLOR);
      ctx.setFontSize(14);
      ctx.setTextAlign('center');
      // ctx.fillText(that.data.detailStr.clickToMini, windowWidth / 2, decodeScale * windowHeight);    //绘制加粗文字--------------------------------------------------------------
      //绘制昵称
      // that.setFontStyle(ctx, 'bold');
      // ctx.setFillStyle(WHITE);
      ctx.setFontSize(20);
      ctx.setTextAlign('center');
      // ctx.fillText(stringUtil.substringStr(that.data.nickname), windowWidth / 2, nicknameHeightScale * windowHeight);    //绘制文字
      // ctx.setFillStyle(THEME_COLOR);
      ctx.setFontSize(24);
      ctx.setTextAlign('center');
      // ctx.fillText(that.data.detailStr.tip, windowWidth / 2, topTextScale * windowHeight);    //绘制 Geek小程序
      // ctx.setFillStyle(TINT_COLOR);
      ctx.setFontSize(16);
      ctx.setTextAlign('center');
      // ctx.fillText(that.data.detailStr.bpbMini, windowWidth / 2, bpbScale * windowHeight);    //绘制到 canvas 上
      ctx.draw(false, function () {      console.log('callback--------------->');
        that.saveCanvasImage();
      });
    },
    //转化为图片
  saveCanvasImage() {    
    var that = this;
    wx.canvasToTempFilePath({      
      canvasId: 'myCanvas',      
      success: function (res) {       
        console.log(res.tempFilePath,'000000000000000');
        that.targetSharePath = res.tempFilePath;
        that.saveImageTap();
        // that.setData({          
        //   targetSharePath: res.tempFilePath,          
        //   realShow: true
        // })
      },      
      complete: function () {
        // that.hideLoading();
      }
    }, this)
  },  /**
   * 保存到相册
   */
    saveImageTap: function () {    
      var that = this;
      that.requestAlbumScope();
    },  
    /**
   * 检测相册权限
   */
    requestAlbumScope() {    
      var that = this;    // 获取用户信息
      wx.getSetting({      
        success: res => {        
          if (res.authSetting['scope.writePhotosAlbum']) {          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            that.saveImageToPhotosAlbum();
          } else {
            wx.authorize({            
              scope: 'scope.writePhotosAlbum',
              success(res) {
                that.saveImageToPhotosAlbum();
              },
              fail() {
                wx.showModal({                
                  title: '提示',                
                  content: '你需要授权才能保存图片到相册',                
                  success: function (res) {                  
                    if (res.confirm) {
                      wx.openSetting({                      
                        success: function (res) {                        
                          if (res.authSetting['scope.writePhotosAlbum']) {
                            that.saveImageToPhotosAlbum();
                          } else {                          
                            console.log('用户未同意获取用户信息权限-------->success');
                          }
                        },                      
                        fail: function () {                        
                          console.log('用户未同意获取用户信息权限-------->fail');
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    },
    saveImageToPhotosAlbum () {    
      var that = this;
      wx.saveImageToPhotosAlbum({      
        filePath: that.targetSharePath,      
        success: function () {
          wx.showModal({          
            title: '',          
            content: '图片保存成功，快去分享到朋友圈吧',          
            showCancel: false
          })
          // that.hideDialog();
        }
      })
    }
  },

 }
</script>