<template>
  <div>
    <div class="detail" v-if="detail">
      
        <section  v-if="detail.itemsExtension.detailType === 0">
          <swiper class="swiper" v-bind:indicator-dots="true" v-bind:autoplay="autoplay"
                  v-bind:interval="interval" v-bind:duration="duration">
            <block v-for="(li,index) in detail.extraImageUri" :key="index">
              <swiper-item>
                <image class="swiper-image" v-bind:mode="widthFix" :src="li" />
              </swiper-item>
            </block>
          </swiper>
        </section>

      <section class="detail_content">

        <h2 class="detail_content_title" v-if="detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 0">{{detail.name}}</h2>
        <p class="detail_content_subtitle">{{detail.title}}</p>
        
        <div class="detail_content_hd" v-if="detail.itemsExtension.detailType === 0">
          <p class="price">￥
            <span class="price--now_i">{{detail.unitPriceDesc}}</span>
          </p>
          <div class="detail_content_hd_btn" v-if="!promotion">
            <p @click="copyLink()">
              <img src="/static/img/sr.png" class="icon-link" />
            </p>
          </div>
        </div>
        <div class="detail_content_hd" v-if="detail.itemsExtension.detailType === 0">
          <div class="detail_content_hd_btn">
            <del class="price--discount1">￥{{detail.originalPriceDesc}}</del>
            <text class="price--discount2">拼团优惠</text>
          </div>
            <text class="price--text">已拼{{detail.count}}个·2人拼单</text>
        </div>
      </section>

      <div v-if="pinDialog" class="drawer">
      <div class="drawer_screen">
      <div class="title1">
          <text class="title2">正在拼单</text>
          <img @click="cancelDialog" src="/static/img/guanbi2.png" class="gbImg" />
      </div>
      <scroll-view class="drawer_content" scroll-y="true">
            <div v-if="index < 10" v-for="(item, index) of pinList" :key="index" class="pin2">
                <img :src="item.img" class="circle2"/>
                <div class="other2">
                  <text class="c">{{item.name}}</text>
                  <text class="d">剩余{{item.time}}</text>
                </div>
                <button class="btn2">去拼单</button>
            </div>
      </scroll-view>
      <div v-if="pinList.length > 10" class="btn_ok"><text class="botext">仅显示10个正在拼单的人</text></div>
      </div>
      </div>
        <div class="pinMain">
        <div class="pinMessage">
        <text class="pinCount">66人正在拼单,可直接参与</text>
        <div @click="openMore" class="pinLook">查看更多</div>
        </div>
        <div>
          <swiper class="pinTotal" v-bind:autoplay="autoplay" v-bind:circular="true" v-bind:vertical="true" v-bind:interval="interval" v-bind:duration="duration" v-bind:display-multiple-items="2">
            <block v-for="(item, index) in pinList" :key="index">
              <swiper-item class="pin">
                <img :src="item.img" class="circle"/>
                <text class="pinName">{{item.name}}</text>
                <div class="other">
                  <text class="a">还差1人拼成</text>
                  <text class="b">剩余{{item.time}}</text>
                </div>
                <button class="btn">去拼单</button>
              </swiper-item>
            </block>
          </swiper>
        </div>
        </div>

      <section class="detail_details" v-if="detail.itemsExtension.detailType === 0">
        <h3 class="detail_details_title">商品详情</h3>
        <div class="detail_details_content">
          <wxParse :content="detail.itemsExtension.itemsContent" />
        </div>
      </section>

      <div class="bar">
        <div class="bar-tips" v-if="activityStatus === 1">
          <span class="bar-text">{{discount}}后商品将结束拼团</span>
        </div>
        <div class="bar-tips" v-if="activityStatus === 2">
          <span class="bar-text">{{discount}}后商品将正式开拼</span>
        </div>
        <div class="bar-bottom">
            <div v-if="detail.status === 1 && detail.stockTotal > 0 && detail.itemsExtension.detailType === 0" class="bar-btn">
              <span class="bar-price">￥{{detail.unitPriceDesc}}</span>
            </div>
            <div v-if="detail.status === 2 || detail.stockTotal === 0" class="bar-btn">
              <span class="bar-price2">￥{{detail.unitPriceDesc}}</span>
            </div>
          <div v-if="detail.status === 1 && detail.stockTotal > 0 && detail.itemsExtension.detailType === 0" @click="showModal" class="bar-btn1">
              <span class="btn-bought">发起拼单</span>
          </div>
          <div v-if="detail.status === 2" class="bar-btn2">
              <span class="btn-disabled">即将开始</span>
          </div>
          <div v-if="detail.stockTotal === 0" class="bar-btn2">
              <span class="btn-disabled">已售罄</span>
          </div>
        </div>
      </div>

      <div class="mask_bg" v-if="mask">
        <div class="mask_content">
          <div class="mask_content_hd">
            <div class="item_info">
              <img class="inline-block item_info_pic" :src="item.img" />
              <div class="inline-block item_info_detail">
                <div class="price">
                  <span>￥{{item.price}}</span>
                </div>
                <p class="stock">库存：
                  <span>{{item.rest}}</span>件</p>
                <p v-if="detail.isSpecEnabled === 1 && (!specOneSelect.status || !specTwoSelect.status)">
                  <span>请选择: </span>
                  <span v-for="(li, index) in specName" :key="index">&nbsp;{{li}}</span>
                </p>
                <p v-if="detail.isSpecEnabled === 1 && specOneSelect.status && specTwoSelect.status">
                  <span>规格: </span>
                  <span v-for="(li, index) in select" :key="index">&nbsp;{{li}}</span>
                </p>
              </div>
            </div>
            <div class="item_cancel" @click="cancel()">
              <i class="item_cancel_btn">&nbsp;</i>
            </div>
          </div>
          <div class="mask_content_bd">
            <div class="item_spec" v-if="detail.isSpecEnabled === 1" v-for="(li,grandParentIndex) in item.specs.name" :key="grandParentIndex">
              <div class="item_spec_title" v-for="(l,key,index) in li" :key="index">{{key}}:</div>
              <div class="item_spec_li" v-for="(l,ParentKey,ParentIndex) in li" :key="ParentIndex">
                <div class="value" :class="{'sold-out' : s.rest === 0, 'active' : select[grandParentIndex] === key}" v-for="(s,key,index) in l" @click="showSth(key, grandParentIndex, ParentKey, s.rest)" :key="index">{{key}}</div>
              </div>
            </div>
            <div class="count item_spec">
              <div class="item_spec_title">数量:</div>
                <div class="item_spec_a">
                    <div class="item_spec_b" @click="reduce" :data-item-index="index">
                        -
                    </div>
                    <div class="item_spec_c">
                    <input :value="item.count"/>
                    </div>                           
                    <div class="item_spec_d" @click="add" :data-item-index="index">
                        +
                    </div>                                        
                </div>
            </div>
          <div class="mask_content_fd">
            <button class="weui_btn" @click="bought()">确定</button>
          </div>
        </div>
      </div>
      </div>
      <user-analysis></user-analysis>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import './styles/item.styl';

.bar {
    position: fixed;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 150rpx;
}

.bar-tips {
    height: 60rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(244, 107, 106, 1);
}

.bar-text {
    font-size: 24rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 33rpx;
}

.bar-bottom {
    height: 90rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
}

.bar-btn {
    width: 36%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bar-price {
    font-size: 48rpx;
    font-weight: 500;
    color: rgba(244, 107, 106, 1);
    line-height: 67rpx;
}

.bar-price2 {
    font-size: 48rpx;
    font-weight: 500;
    color: rgba(160, 160, 160, 1);
    line-height: 67rpx;
}

.bar-btn1 {
    width: 64%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 1);
}

.btn-bought {
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 45rpx;
}

.bar-btn2 {
    width: 64%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
}

.btn-disabled {
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 45rpx;
}

.swiper {
    height: 750rpx;
    background: rgba(190, 202, 202, 1);
}

.swiper-image {
    width: 100%;
    height: 100%;
}

.pinMain {
    height: 357rpx;
    background: rgba(255, 255, 255, 1);
    padding: 20rpx 32rpx 25rpx 32rpx;
}

.pinMain .pinMessage {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    line-height: 40rpx;
    font-weight: 400;
    color: rgba(35, 35, 35, 1);
    font-size: 28rpx;
    align-items: center;
    border-bottom: 1rpx solid rgba(234, 234, 234, 1);
}

.pinMain .pinMessage .pinLook {
    color: rgba(160, 160, 160, 1);
}

.pinMain .pinMessage .pinCount {
    color: rgba(244, 107, 106, 1);
}

.pinMain .pinTotal {
    height: 276rpx;
}

.pinMain .pinTotal .pin {
    height: 138rpx;
    display: flex;
    justify-content: space-between;
}

.pinMain .pinTotal .pin .circle {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    margin: 25rpx 0;
}

.pinMain .pinTotal .pin .pinName {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 32rpx;
    margin: 52rpx 0 52rpx 10rpx;
}

.pinMain .pinTotal .pin .other {
    display: flex;
    flex-direction: column;
    height: 67rpx;
    width: 170rpx;
    margin: 38rpx 0 33rpx 120rpx;
}

.pinMain .pinTotal .pin .other .a {
    font-size: 26rpx;
    font-weight: 400;
    color: rgba(244,107,106,1);
}

.pinMain .pinTotal .pin .other .b {
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(160, 160, 160, 1);
}

.pinMain .pinTotal .pin .btn {
    width: 120rpx;
    height: 60rpx;
    font-size: 26rpx;
    padding: 11rpx;
    line-height: 38rpx;
    text-align: center;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 1);
    margin: 39rpx 0 39rpx 33rpx;
}

.drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
}

.drawer_screen {
    width: 560rpx;
    height: 765rpx;
    margin: 157rpx 0 0 95rpx;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 8rpx;
    overflow: hidden;
}

.title1 {
    height: 85rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title2 {
    font-size: 32rpx;
    color: rgba(0, 0, 0, 1);
    line-height: 45rpx;
    margin: 0 0 0 216rpx;
}

.gbImg {
    width: 50rpx;
    height: 50rpx;
    margin: 0 28rpx 0 0;
}

.drawer_content {
    border-top: 1rpx solid rgba(234, 234, 234, 1);
    height: 620rpx;
}

.btn_ok {
    height: 59rpx;
    border-top: 1rpx solid rgba(234, 234, 234, 1);
    text-align: center;
}

.botext {
    line-height: 33rpx;
    color: rgba(81, 81, 81, 1);
    font-size: 24rpx;
    margin: 13rpx 0;
}

.pin2 {
    height: 109rpx;
    display: flex;
    padding: 0 28rpx 0 22rpx;
    justify-content: space-between;
    border-bottom: 1rpx solid rgba(234, 234, 234, 1);
}

.circle2 {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    margin: 11rpx 0 10rpx 0;
}

.other2 {
    display: flex;
    flex-direction: column;
    height: 64rpx;
    width: 160rpx;
    margin: 25rpx 0 20rpx 10rpx;
}

.c {
    font-size: 26rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 32rpx;
}

.d {
    font-size: 22rpx;
    font-weight: 400;
    color: rgba(160, 160, 160, 1);
    line-height: 32rpx;
}

.btn2 {
    width: 110rpx;
    height: 40rpx;
    font-size: 24rpx;
    padding: 4rpx 18rpx 4rpx 19rpx;
    line-height: 33rpx;
    text-align: center;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 1);
    margin: 41rpx 0 28rpx 120rpx;
}
</style>

<script>
"use strict";
import Vue from "vue";
import tools from "@/utils/mp";
import userAnalysis from "../../components/user-analysis/user-analysis";
import wxParse from "mpvue-wxparse";
export default {
  components: {
    userAnalysis,
    wxParse
  },
  localStorage: {
    skuList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      itemId: 3,
      pinList: this.pinList,
      interval: 5000,
      duration: 1000,
      autoplay: true,
      pinDialog: false,
      toastShow: this.toastShow,
      detail: this.detail,
      discount: this.discount,
      mask: this.mask,
      maskType: this.maskType,
      item: this.item,
      spec: this.spec,
      select: this.select,
      specName: this.specName,
      specOneSelect: this.specOneSelect,
      specTwoSelect: this.specTwoSelect,
      cartCount: this.cartCount,
      //   userInfo: window.userInfo,
      video: this.video,
      scaleImg: this.scaleImg,
      activityStatus: this.activityStatus,
      promotion: this.promotion,
      autoplay: true,
      playIcon: true,
    };
  },
  watch: {
    "$route.params.id": function() {
      const _this = this;
      if (_this.$route.name === "goodsDetail") {
        _this.detail = false;
        // _this.pageDuration(window.location.reload());
      }
    }
  },
  onShow() {
    const _this = this;
    _this.init();
    _this.getItem();
    _this.itemId = _this.$root.$mp.query.id;
  },
  deactivated() {
    const _this = this;
    _this.detail = false;
  },
  methods: {
    navigate(url, type) {
      tools.navigate(url, type);
    },
    //初始化数据
    init() {
      this.discount = "22时22分22秒";
      this.pinList = [
        {
          img: "/static/img/kn.png",
          name: "王花臂",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂2",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂3",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂4",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂5",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂6",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂7",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂8",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂9",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂10",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂11",
          time: "22:23:23.9"
        },
        {
          img: "/static/img/kn.png",
          name: "王花臂12",
          time: "22:23:23.9"
        }
      ];
      this.detail = {
        itemsExtension: {
          detailType: '',
          itemsContent: ""
        },
        extraImageUri: [],
        originalPriceDesc: "",
        unitPriceDesc: "",
        count: '',
        status: '',
        stockTotal: '',
        name: "",
        title: ""
      };
      this.toastShow = false;
      this.mask = false;
      this.cartCount = 0;
      this.scaleImg = false;
      this.spec = {
        name: [],
        length: 0
      };
      this.item = {
        img: "",
        pricei: "",
        pricef: "",
        id: '',
        count: '',
        rest: '',
        specs: this.spec
      };
      this.select = [];
      this.specName = [];
      this.specOne = {};
      this.specTwo = {};
      this.specOneSelect = {
        parentKey: "",
        key: "",
        status: false
      };
      this.specTwoSelect = {
        parentKey: "",
        key: "",
        status: false
      };
      this.activityStatus = 1; //0表示没有活动，1表示活动中，2表示活动未开始，3表示活动已结束
      this.promotion = false;
      this.getData();
      this.pageView();
    },
    openMore() {
      const _this = this;
      _this.pinDialog = true;
    },
    cancelDialog() {
      const _this = this;
      _this.pinDialog = false;
    },
    //video配置
    play() {
      const _this = this;
      const player = this.$refs.player.dp;
      player.play();
      _this.playIcon = false;
    },
    pause() {
      const _this = this;
      _this.playIcon = true;
    },
    pageView() {
      const _this = this;
      _this.enterTime = moment();
      let fingerprint;
      new Fingerprint2().get(function(result, components) {
        fingerprint = result;
        console.log(result); //a hash, representing your device fingerprint
        // console.log(components); // an array of FP components
        // console.log(_this.enterTime);
        let params = {
          fingerprint,
          userId: window.userInfo.id,
          platform: "wx",
          openId: window.userInfo.openId,
          version: "1.0.0",
          url: window.location.href,
          pageCode: "2",
          pageSubCode: _this.$route.params.id,
          sourceId: _this.$route.query.sourceId || "0",
          isShared: _this.$route.query.isShared
        };
        // console.log(params);
        Vue.OneMallHttp()
          .GET(params, Vue.OneMallUrl.pageView)
          .then(res => {
            if (res.code === 0) {
              _this.pageViewId = res.data.pageViewId;
            }
          });
      });
    },
    pageDuration(callback) {
      const _this = this;
      _this.leaveTime = moment();
      let duration = _this.leaveTime.diff(_this.enterTime, "seconds");
      // duration = duration.format("HH小时mm分ss秒")
      let params = {
        userId: window.userInfo.id,
        platform: "wx",
        openId: window.userInfo.openId,
        version: "1.0.0",
        url: window.location.href,
        pageCode: "2",
        pageSubCode: _this.$route.params.id,
        duration: duration,
        pageViewId: _this.pageViewId
      };
      Vue.OneMallHttp()
        .GET(params, Vue.OneMallUrl.pageDuration)
        .then(res => {
          console.log(params);
          !!callback && typeof callback === "function" && callback();
        });
    },
    watchScroll() {
      const _this = this;
      $(window).scroll(() => {
        if (_this.$route.name === "goodsDetail") {
          if (
            _this.detail.itemsExtension.detailType === 1 ||
            _this.detail.itemsExtension.detailType === 2
          ) {
            let scrollTop = $(window).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(window).height();
          }
        }
      });
    },
    //设置分享
    setShare(opts) {
      const _this = this;
      console.log("商品详情设置");
      let params = {
        url: window.location.href
      };
      return Vue.OneMallHttp()
        .GET(params, Vue.OneMallUrl.wxConfig)
        .then(res => {
          if (res.code === 0) {
            wx.config({
              debug: res.data.debug,
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: [
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "hideMenuItems",
                "showMenuItems",
                "chooseImage",
                "previewImage",
                "uploadImage",
                "downloadImage",
                "chooseWXPay"
              ]
            });
            wx.ready(function() {
              Raven.captureMessage("wx.ready 商品详情页成功");
              console.log("wx.ready 商品详情页");
              wx.showOptionMenu();
              let _opts = opts || {};
              _opts.icon =
                _opts.icon || "http://res2.caiguo.com/images/logo.jpg";
              _opts.link = _opts.link || "http://m.igapper.com";
              _opts.title = _opts.title || "间隔年，遇见真实的自己";
              _opts.desc =
                _opts.desc || "间隔年，闻见自由的味道，遇见真实的自己";
              console.log("分享：" + JSON.stringify(_opts));
              wx.onMenuShareTimeline({
                title: _opts.title, // 分享标题
                link: _opts.link, // 分享链接
                imgUrl: _opts.icon, // 分享图标
                success: function() {
                  // 用户确认分享后执行的回调函数
                  // mallUtils.layer.alert("分享成功");
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                  //mallUtils.layer.alert("分享已取消");
                }
              });
              //分享给朋友
              wx.onMenuShareAppMessage({
                title: _opts.title, // 分享标题
                desc: _opts.desc, // 分享描述
                link: _opts.link, // 分享链接
                imgUrl: _opts.icon, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                  // mallUtils.layer.alert("分享成功");
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                  //mallUtils.layer.alert("分享已取消");
                }
              });
            });

            wx.error(function(res) {
              Raven.captureMessage(
                "wx.ready 商品详情页失败：" + JSON.stringify(res)
              );
            });
          }
        });
    },
    //复制链接
    copyLink() {
      const _this = this;
      let id = this.$route.params.id;
      return Vue.OneMallHttp()
        .GET("", Vue.OneMallUrl.item + id + "/url")
        .then(res => {
          if (res.code === 0) {
            if (res.data === true) {
              window.mallUtils.layer.alert(
                "已为您发送商品链接，请留意公众号推送消息！"
              );
            } else {
              window.mallUtils.funs.unTouchMove();
            }
          }
        });
    },
    //获取商品数据
    getData(itemId) {
      const _this = this;
      itemId = _this.itemId
      _this.$http.get("/item/" + itemId)
        .then(res => {
          if (res.code === 0) {
            _this.detail = res.data;
            _this.sku();
            let inviteCode = window.userInfo.id || "0";
            let opts = {
              icon: this.detail.extraImageUri[0],
              link:
                window.location.protocol +
                "//" +
                window.location.hostname +
                "/wx/goods/detail/" +
                id +
                "?inviteCode=" +
                inviteCode,
              title: this.detail.name,
              desc: this.detail.title
            };
            this.setShare(opts);
            if (this.detail.discountActivity) {
              this.checkActivityStatus();
            } else {
              this.activityStatus = 0;
            }
          }
        });
    },
    // 判断商品是否处于活动
    checkActivityStatus() {
      const _this = this;
      const currentDate = moment().unix();
      if (_this.detail.discountActivity.length !== 0) {
        if (
          _this.detail.discountActivity[0].startTime < currentDate &&
          currentDate < _this.detail.discountActivity[0].endTime
        ) {
          console.log("活动中");
          _this.activityStatus = 1;
          _this.downDiscount(_this.detail.discountActivity[0].endTime);
        } else {
          if (currentDate < _this.detail.discountActivity[0].startTime) {
            console.log("活动前");
            _this.activityStatus = 2;
            _this.upDiscount(_this.detail.discountActivity[0].startTime);
          }
          if (currentDate > _this.detail.discountActivity[0].endTime) {
            console.log("活动后");
            _this.activityStatus = 3;
          }
        }
      } else {
        _this.activityStatus = 0;
      }
    },
    //对商品展示价格&数量进行处理
    itemInfoShow() {
      const _this = this;
      let priceDesc;
      if (_this.activityStatus === 1 || _this.activityStatus === 2) {
        priceDesc = this.detail.activityPrice.toString();
      } else {
        priceDesc = this.detail.unitPriceDesc;
      }
      let position = priceDesc.indexOf(".");
      if (position !== -1) {
        this.price.i = priceDesc.substring(0, position);
        this.price.f = priceDesc.substring(position);
      } else {
        this.price.i = priceDesc;
      }
      this.item.price = priceDesc;
      this.item.rest = this.detail.stockTotal;
      this.item.count = 1;
      this.item.img = this.detail.extraImageUri[0];
    },
    //判断活动开始
    judgeUp() {
      if (this.detail.status === 2) {
        if (this.detail.timingShelves !== 0) {
          let date = moment().unix();
          if (date < this.detail.timingShelves) {
            this.upDiscount(this.detail.timingShelves);
          } else {
            this.detail.status = 1;
          }
        }
      }
    },
    //判断活动结束
    judgeDown() {
      if (this.detail.status === 1) {
        if (this.detail.timingEnd !== 0) {
          let date = moment().unix();
          if (date < this.detail.timingEnd) {
            this.downDiscount(this.detail.timingEnd);
          } else {
            this.detail.status = 0;
          }
        }
      }
    },
    //下架倒计时
    downDiscount(time) {
      console.log("开启定时下架");
      setInterval(() => {
        let diff = moment(moment(time * 1000).diff(moment())).utc();
        if (diff > 0) {
          if (diff > 3600) {
            this.discount = diff.format("mm分ss秒");
          }
          if (diff > 3600000) {
            this.discount = diff.format("HH小时mm分ss秒");
          }
          if (diff > 86400000) {
            this.discount = diff.format("DD天HH小时mm分");
          }
        } else {
          // clearInterval(this.discountF);
          this.checkActivityStatus();
        }
      }, 1000);
    },
    //上架倒计时
    upDiscount(time) {
      console.log("开启定时上架");
      setInterval(() => {
        let diff = moment(moment(time * 1000).diff(moment())).utc();
        if (diff > 0) {
          if (diff > 3600) {
            this.discount = diff.format("mm分ss秒");
          }
          if (diff > 3600000) {
            this.discount = diff.format("HH小时mm分ss秒");
          }
          if (diff > 86400000) {
            this.discount = diff.format("DD天HH小时mm分");
          }
        } else {
          // clearInterval(this.discountF);
          this.checkActivityStatus();
        }
      }, 1000);
    },
    //显示模态框
    showModal(type) {
      if (type === 0) {
        this.mask = true;
        this.maskType = 0;
        // document.documentElement.scrollTop = document.body.scrollTop = 0;
        window.mallUtils.funs.unTouchMove();
      } else {
        this.mask = true;
        this.maskType = 1;
        // document.documentElement.scrollTop = document.body.scrollTop = 0;
        window.mallUtils.funs.unTouchMove();
      }
    },
    //关闭模态框
    cancel() {
      this.mask = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //点击模态框的购买按钮
    bought() {
      const _this = this;
      if (!window.userInfo.id) {
        window.mallUtils.layer.alert("用户登录后才能购买商品");
        setTimeout(() => {
          _this.getUserList();
        }, 1000);
      } else {
        if (this.specTwoSelect.status && this.specOneSelect.status) {
          if (pindan) {
            let item = {
              skuId: this.item.id,
              count: this.item.count
            };
            let skuList = [];
            skuList.push(item);
            sessionStorage.setItem("skuList", JSON.stringify(skuList));
            this.mask = false;
            window.mallUtils.funs.activeTouchMove();
            this.toastShow = true;
            setTimeout(() => {
              this.toastShow = false;
              this.$router.push("/pages/mine/detail");
            }, 1000);
          } else {
            this.$router.push("/pages/item/joinError");
          }
        } else {
          window.mallUtils.layer.alert("请选择" + this.specName);
        }
      }
    },
    //模态框的增加商品数量
    add() {
      const _this = this
      let item = _this.item;
      if (_this.specTwoSelect.status && _this.specOneSelect.status) {
        if (item.count < item.rest) {
          _this.item.count += 1;
        } else {
          window.mallUtils.layer.alert("库存已达上限");
        }
      }
    },
    //模态框的减少商品数量
    reduce() {
      let item = this.item;
      if (item.count > 1) {
        this.item.count -= 1;
      } else {
        window.mallUtils.layer.alert("不能再减少了");
      }
    },
    scaleUp() {
      const _this = this;
      _this.scaleImg = !_this.scaleImg;
    },
    //用户信息
    getUserList() {
      const _this = this;
      let id = this.$route.params.id;
      let data = {
        level: 1
      };
      Vue.OneMallHttp()
        .GET(data, Vue.OneMallUrl.userinfo)
        .then(res => {
          if (res.code === 0) {
          }
        });
    },
    //遍历出sku选择需要的数据
    sku() {
      if (this.detail.isSpecEnabled === 0) {
        //不启用规格
        //商品109不启用规格
        // console.log(this.item);
        let item = this.detail.itemsStock[0];
        let selectItem = {
          id: item.id,
          rest: item.number,
          price: item.price,
          img: item.itemsSkuImageUri
        };
        if (this.activityStatus === 1 || this.activityStatus === 2) {
          selectItem.price = item.activityPrice;
        }
        Object.assign(this.item, selectItem);
      } else {
        //启用规格
        //商品38双规格
        // console.log('遍历出sku选择需要的数据');
        let specName = [];
        let specLen = 0;
        let aaa = {};
        let bbb = {};
        let itemsStock = this.detail.itemsStock;
        // console.log('itemsStock' + itemsStock);
        itemsStock.forEach((v, i, a) => {
          specLen = v.itemsAttribute.length;
          if (specLen === 1) {
            aaa[v.itemsAttribute[0].attributesValue] = {};
          } else {
            aaa[v.itemsAttribute[0].attributesValue] = {};
            bbb[v.itemsAttribute[1].attributesValue] = {};
          }
        });
        itemsStock.forEach((v, i, a) => {
          if (specLen === 1) {
            //单规格
            if (this.activityStatus === 1 || this.activityStatus === 2) {
              aaa[v.itemsAttribute[0].attributesValue] = {
                price: v.activityPrice,
                id: v.id,
                rest: v.number,
                img: v.itemsSkuImageUri
              };
            } else {
              aaa[v.itemsAttribute[0].attributesValue] = {
                price: v.price,
                id: v.id,
                rest: v.number,
                img: v.itemsSkuImageUri
              };
            }
            specName[0] = {};
            specName[0][v.itemsAttribute[0].specName] = aaa;
          } else if (specLen === 2) {
            //双规格
            if (this.activityStatus === 1 || this.activityStatus === 2) {
              aaa[v.itemsAttribute[0].attributesValue][
                v.itemsAttribute[1].attributesValue
              ] = {
                price: v.activityPrice,
                id: v.id,
                rest: v.number,
                img: v.itemsSkuImageUri
              };
              bbb[v.itemsAttribute[1].attributesValue][
                v.itemsAttribute[0].attributesValue
              ] = {
                price: v.activityPrice,
                id: v.id,
                rest: v.number,
                img: v.itemsSkuImageUri
              };
            } else {
              aaa[v.itemsAttribute[0].attributesValue][
                v.itemsAttribute[1].attributesValue
              ] = {
                price: v.price,
                id: v.id,
                rest: v.number,
                img: v.itemsSkuImageUri
              };
              bbb[v.itemsAttribute[1].attributesValue][
                v.itemsAttribute[0].attributesValue
              ] = {
                price: v.price,
                id: v.id,
                rest: v.number,
                img: v.itemsSkuImageUri
              };
            }
            // console.log(aaa[v.itemsAttribute[0].attributesValue]);
            specName[0] = {};
            specName[0][v.itemsAttribute[0].specName] = aaa;
            specName[1] = {};
            specName[1][v.itemsAttribute[1].specName] = bbb;
          }
        });
        //对双规格商品数据进行二次处理
        if (specLen === 2) {
          for (let v of specName) {
            for (let item in v) {
              this.specName.push(item);
              for (var ddd in v[item]) {
                v[item][ddd].rest = 0;
                for (var eee in v[item][ddd]) {
                  if (v[item][ddd].hasOwnProperty(eee)) {
                    if (eee !== "rest") {
                      // console.log(v[item][ddd][eee].rest + '子的');
                      v[item][ddd].rest =
                        v[item][ddd].rest + v[item][ddd][eee].rest;
                      // console.log(v[item][ddd].rest + '母的');
                    }
                  }
                }
              }
            }
          }
        } else {
          //单规格商品数据处理将规格名字提取
          for (let v of specName) {
            for (let item in v) {
              this.specName.push(item);
            }
          }
        }
        this.spec.length = specLen;
        this.spec.name = specName;

        // console.log(this.spec.name[0]);
      }
      this.setGoodsStatus();
    },
    //预置商品选择状态
    setGoodsStatus() {
      sessionStorage.setItem("specName", JSON.stringify(this.specName));
      if (this.spec.length === 2) {
        const specOne = JSON.stringify(this.spec.name[0]);
        const specTwo = JSON.stringify(this.spec.name[1]);
        sessionStorage.setItem("specOne", specOne);
        sessionStorage.setItem("specTwo", specTwo);
        this.specOneSelect = {
          parentKey: "",
          key: "",
          status: false
        };
        this.specTwoSelect = {
          parentKey: "",
          key: "",
          status: false
        };
      } else if (this.spec.length === 1) {
        const specOne = JSON.stringify(this.spec.name[0]);
        sessionStorage.setItem("specOne", specOne);
        this.specOneSelect = {
          parentKey: "",
          key: "",
          status: false
        };
        this.specTwoSelect = {
          parentKey: "",
          key: "",
          status: true
        };
      } else {
        this.specOneSelect = {
          parentKey: "",
          key: "",
          status: true
        };
        this.specTwoSelect = {
          parentKey: "",
          key: "",
          status: true
        };
      }
    },

    //规格二回归未选择状态
    restSpecTwo() {
      this.$set(this.select, 1, "");
      this.specOne = JSON.parse(sessionStorage.getItem("specOne"));
      this.$set(this.item.specs.name, 0, this.specOne);
      this.specTwoSelect = {
        parentKey: "",
        key: "",
        status: false
      };
      if (this.specOneSelect.status) {
        let specName = JSON.parse(sessionStorage.getItem("specName"));
        this.specName = [specName[1]];
      } else {
        let specName = JSON.parse(sessionStorage.getItem("specName"));
        this.specName = specName;
      }
    },

    //规格一回归未选择状态
    restSpecOne() {
      this.$set(this.select, 0, "");
      this.specOneSelect = {
        parentKey: "",
        key: "",
        status: false
      };
      if (this.spec.length === 2) {
        this.specTwo = JSON.parse(sessionStorage.getItem("specTwo"));
        this.$set(this.item.specs.name, 1, this.specTwo);

        if (this.specTwoSelect.status) {
          let specName = JSON.parse(sessionStorage.getItem("specName"));
          this.specName = [specName[0]];
        } else {
          let specName = JSON.parse(sessionStorage.getItem("specName"));
          this.specName = specName;
        }
      } else {
        let specName = JSON.parse(sessionStorage.getItem("specName"));
        this.specName = specName;
      }
    },

    //选择操作
    showSth(key, grandParentIndex, parentKey, rest) {
      const _key = key;
      // console.log(_key);
      //判断总库存数量。若为0点击无效
      if (rest !== 0) {
        //再次点击取消选择
        if (this.select[grandParentIndex] === _key) {
          this.item.price = this.detail.unitPriceDesc;
          if (this.activityStatus === 1 || this.activityStatus === 2) {
            this.item.price = this.detail.activityPrice;
          }
          this.item.rest = this.detail.stockTotal;
          this.item.count = 1;
          this.item.img = this.detail.extraImageUri[0];
          if (grandParentIndex === 0) {
            this.restSpecOne();
          }
          if (grandParentIndex === 1) {
            this.restSpecTwo();
          }
        } else {
          //点击进行选择
          // console.log(grandParentIndex);
          // console.log(_key);
          this.$set(this.select, grandParentIndex, _key);
          // console.log(parentKey);
          // console.log(this.spec.name[grandParentIndex][parentKey][_key]);
          let select = this.spec.name[grandParentIndex][parentKey][_key];
          // console.log(select);
          this.item.count = 1;

          //双规格商品
          if (this.spec.length === 2) {
            let selectKey = [];
            let unSelectKey = [];
            for (let key in select) {
              if (select.hasOwnProperty(key)) {
                if (key !== "rest") {
                  // console.log(key);
                  selectKey.push(key);
                  //点击的是规格一
                  if (grandParentIndex === 0) {
                    this.specOneSelect = {
                      parentKey,
                      key: _key,
                      status: true
                    };
                    // console.log(this.spec.name[1][this.specName[1]]);
                    let specName = JSON.parse(
                      sessionStorage.getItem("specName")
                    );
                    let changeSpec = this.spec.name[1][specName[1]];
                    for (let k in changeSpec) {
                      if (changeSpec.hasOwnProperty(k)) {
                        if (key === k) {
                          //将规格一所对应的规格二中的产品数量赋值给规格二的对象
                          // console.log(select[key].rest);
                          changeSpec[k].rest = select[key].rest;
                        } else {
                          //生成一个unSelectKey数组，里面存放选择规格一中遍历后没有的对应项目
                          unSelectKey.push(k);
                        }
                      }
                    }

                    // console.log(selectKey);
                    // console.log(unSelectKey);
                    //从unSelectKey数组中去除当前所选规格的数组里面的项
                    for (let s of selectKey) {
                      unSelectKey.forEach((v, i, a) => {
                        if (s === v) {
                          unSelectKey.remove(i);
                        }
                      });
                    }
                    // console.log(unSelectKey);
                    //unSelectKey数组去重=>此数组为选择的规格所有不含有的规格项

                    unSelectKey = unSelectKey.unique();

                    // console.log(unSelectKey);
                    //将选择规格对应的不含有的所有规格项的余量改为0
                    for (let key of unSelectKey) {
                      for (let k in changeSpec) {
                        if (changeSpec.hasOwnProperty(k)) {
                          if (key === k) {
                            // console.log(k);
                            changeSpec[k].rest = 0;
                          }
                        }
                      }
                    }
                  } else {
                    //点击的是规格二
                    this.specTwoSelect = {
                      parentKey,
                      key: _key,
                      status: true
                    };
                    // console.log(this.spec.name[0][this.specName[0]]);
                    let specName = JSON.parse(
                      sessionStorage.getItem("specName")
                    );
                    let changeSpec = this.spec.name[0][specName[0]];
                    for (let k in changeSpec) {
                      if (changeSpec.hasOwnProperty(k)) {
                        if (key === k) {
                          //将规格一所对应的规格二中的产品数量赋值给规格二的对象
                          // console.log(select[key].rest);
                          changeSpec[k].rest = select[key].rest;
                        } else {
                          //生成一个unSelectKey数组，里面存放选择规格一中遍历后没有的对应项目
                          unSelectKey.push(k);
                        }
                      }
                    }
                    // console.log(selectKey);
                    // console.log(unSelectKey);
                    //从unSelectKey数组中去除当前所选规格的数组里面的项
                    for (let s of selectKey) {
                      unSelectKey.forEach((v, i, a) => {
                        if (s === v) {
                          unSelectKey.remove(i);
                        }
                      });
                    }
                    // console.log(unSelectKey);
                    //unSelectKey数组去重=>此数组为选择的规格所有不含有的规格项
                    unSelectKey = unSelectKey.unique();

                    // console.log(unSelectKey);
                    //将选择规格对应的不含有的所有规格项的余量改为0
                    for (let key of unSelectKey) {
                      for (let k in changeSpec) {
                        if (changeSpec.hasOwnProperty(k)) {
                          if (key === k) {
                            // console.log(k);
                            changeSpec[k].rest = 0;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            if (this.specTwoSelect.status && this.specOneSelect.status) {
              let item = {};
              if (grandParentIndex === 0) {
                item = this.item.specs.name[0];
                let selectItem =
                  item[this.specOneSelect.parentKey][this.specOneSelect.key][
                    this.specTwoSelect.key
                  ];
                Object.assign(this.item, selectItem);
              } else {
                item = this.item.specs.name[1];
                let selectItem =
                  item[this.specTwoSelect.parentKey][this.specTwoSelect.key][
                    this.specOneSelect.key
                  ];
                Object.assign(this.item, selectItem);
              }
              // console.log('全选');
            } else {
              if (grandParentIndex === 0) {
                // console.log('单选规格一');
                let specName = JSON.parse(sessionStorage.getItem("specName"));
                this.specName = [specName[1]];
              } else {
                // console.log('单选规格二');
                let specName = JSON.parse(sessionStorage.getItem("specName"));
                this.specName = [specName[0]];
              }
            }
          } else {
            //单规格商品
            this.specOneSelect = {
              parentKey,
              key: _key,
              status: true
            };
            let item = {};
            item = this.item.specs.name[0];
            let selectItem =
              item[this.specOneSelect.parentKey][this.specOneSelect.key];
            Object.assign(this.item, selectItem);
          }
        }
      }
    }
  }
};
</script>
