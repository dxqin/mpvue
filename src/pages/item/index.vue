<template>
  <div>
    <loading :loadingstatus="loadingstatus">
    </loading>
    <div class="detail" v-if="detail" :class="{fixPb: activityStatus === 1  || activityStatus === 2 }">

      <section v-if="detail.itemsExtension.detailType === 1">
        <img class="detail_video_icon" src="https://static.paranoidsqd.com/images/goods/play.png" v-if="detail.itemsExtension.detailType === 1 && playIcon" @click="play" />
        <p class="detail_video dplayer-hide-controller dplayer-mobile">
        <d-player :video="video" ref="player" :hotkey="false" @pause="pause" v-if="detail.itemsExtension.detailType === 1 && video">
        </d-player>
        </p>
      </section>

      <section v-if="detail.itemsExtension.detailType === 1 && detail.currentActivity[0]">
        <div v-if="detail.currentActivity.length !== 0 && userInfo.memberLevel === 2" class="detail_activity text-center">{{detail.currentActivity[0].title}}</div>
      </section>

      <section class="detail_img" v-if="detail.itemsExtension.detailType === 2">
        <div class="detail_img_context">
          <p class="detail_img_context_name">{{detail.name}}</p>
        </div>
        <img class="detail_img_img block" :src="detail.itemsExtension.graphicUrl" />
      </section>

      <section v-if="detail.itemsExtension.detailType === 2 && detail.currentActivity[0]">
        <div v-if="detail.currentActivity.length !== 0 && userInfo.memberLevel === 2" class="detail_activity text-center">{{detail.currentActivity[0].title}}</div>
      </section>
      
      <section class="detail_banner swiper-container" v-if="detail.itemsExtension.detailType === 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(li,index) in detail.extraImageUri" :key="index"><img class="detail_banner_img" :src="li" /></div>
        </div>
        <div class="swiper-pagination"></div>
      </section>

      <section v-if="detail.itemsExtension.detailType === 0 && detail.currentActivity[0]">
        <div v-if="detail.currentActivity.length !== 0 && userInfo.memberLevel === 2" class="detail_activity text-center">{{detail.currentActivity[0].title}}</div>
      </section>

      <section class="detail_content">
        <div class="detail_content_td" v-if="detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 2">
          <img class="detail_content_td_header inline-block" :src="detail.itemsExtension.authorLogo " />
          <div class="detail_content_td_content">
            <p class="detail_content_td_content_title">{{detail.itemsExtension.authorName}}倾情推荐</p>
            <p class="detail_content_td_content_context">{{detail.itemsExtension.authorTime | formatDate('YYYY年MM月DD日 HH时mm分')}} {{detail.itemsExtension.authorAddress}}</p>
          </div>
        </div>

        <h2 class="detail_content_title" v-if="detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 0">{{detail.name}}</h2>
        <p class="detail_content_subtitle">{{detail.title}}</p>
        <div class="detail_content_share" v-if="detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 2">
          <p class="detail_content_share_context" v-show="userInfo.memberLevel === 2 && !promotion && detail.userRecommendFlag === 0">分享奖励最高达{{commissionPrice}}元</p>
          <p class="detail_content_share_context" v-show="userInfo.memberLevel !== 2">&nbsp;</p>
          <div class="detail_content_share_hd" v-show="!promotion">
            <span @click="copyLink()">
              <i class="detail_content_share_iconl icon-link"></i>
            </span>
            <div @click="navigate('/pages/order/list?id=' + id)">
              <i class="detail_content_share_icons icon-share"></i>
            </div>
          </div>
        </div>

        <div class="detail_content_cells" v-if="(detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 2) && detail.currentActivity[0]">
          <div class="weui_cells_access" v-if="detail.currentActivity.length !== 0 && userInfo.memberLevel === 2">
            <a class="weui_cell">
              <div class="weui_cell_ft" @click="doubleReward()">{{detail.currentActivity[0].subTitle}}</div>
            </a>
          </div>
        </div>
        <div class="detail_content_hd" v-if="detail.itemsExtension.detailType === 0">
          <p class="price">￥
            <span class="price--now_i">{{price.i}}</span>
            <span class="price--now_f">{{price.f}}</span>
          </p>
          <div class="detail_content_hd_btn" v-show="!promotion">
            <p @click="copyLink()">
              <i class="icon-link"></i>
            </p>
            <div>
              <div @click="navigate('/pages/order/list?id=' + id)">
                <i class="icon-share"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="detail_content_hd" v-if="detail.itemsExtension.detailType === 0">
          <p>
            <del class="price--discount">￥{{detail.originalPriceDesc}}</del>
          </p>
          <p class="share" v-show="userInfo.memberLevel === 2 && !promotion && detail.userRecommendFlag === 0">分享奖励最高达{{commissionPrice}}元</p>
        </div>

        <div class="detail_content_cell" v-if="detail.itemsExtension.detailType === 0 && detail.currentActivity[0]">
          <div class="weui_cells weui_cells_access" v-if="detail.currentActivity.length !== 0 && userInfo.memberLevel === 2">
            <a class="weui_cell">
              <div class="weui_cell_ft" @click="doubleReward()">{{detail.currentActivity[0].subTitle}}</div>
            </a>
          </div>
        </div>
      </section>

      <section class="detail_inner" v-if="detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 2">
        <ul class="detail_inner_hd" ref="tabnav">
          <li class="detail_inner_hd_tab" v-for="(li, key) in menuList" :key="key" @click="tab(key)" :class="[tabSelect === key ? 'active' : '']">{{li}}</li>
        </ul>
        <div class="detail_inner_bd" ref="detailInnerBd" v-show="tabSelect === 0" :class="[tabnavFixed ? 'detail_inner_bd_fixed' : '']">
          <wxParse :content="detail.itemsExtension.storyContent" />
        </div>
        <div class="detail_inner_bd" ref="detailInnerBd" v-show="tabSelect === 1" :class="[tabnavFixed ? 'detail_inner_bd_fixed' : '']">
          <wxParse :content="detail.itemsExtension.itemsContent" />
        </div>
      </section>

      <p class="text-center detail_change" v-if="detail.itemsExtension.detailType === 1 || detail.itemsExtension.detailType === 2" :class="[detailChangeShow ? 'detail_change_actived' : '']" @click="detailChange">
        <span class="detail_change_hd">{{detailChangeContext}}</span>
      </p>

      <section class="detail_details" v-if="detail.itemsExtension.detailType === 0">
        <h3 class="detail_details_title">商品详情</h3>
        <div class="detail_details_content">
          <wxParse :content="detail.itemsExtension.itemsContent" />
        </div>
      </section>

      <div class="detail_bar">
        <div class="text-center detail_bar_tips detail_bar_tips--over" v-if="activityStatus === 1">
          <span>{{discount}}后活动结束</span>
          <div class="detail_bar_tips--activity" v-if="detail.discountActivity.length > 0 && detail.discountActivity[0].type === 3" @click="navigate('/pages/order/list?id=' + id)">查看详情</div>
        </div>
        <div class="text-center detail_bar_tips detail_bar_tips--coming" v-if="activityStatus === 2">
          <span>{{discount}}后活动开始</span>
          <div class="detail_bar_tips--activity" v-if="detail.discountActivity.length > 0 && detail.discountActivity[0].type === 3" @click="navigate('/pages/order/list?id=' + id)">查看详情</div>
        </div>
        <div class="detail_bar_content">
              <p class="detail_bar_content_icon_context text-center">￥{{detail.originalPriceDesc}}</p>
          <p class="detail_bar_content_btn">
            <span>
              <a class="bought" v-show="detail.status === 1 && detail.stockTotal > 0 && detail.itemsExtension.detailType === 0" @click="showModal(1)">发起拼单</a>
            </span>
            <span>
              <a class="disabled" v-show="detail.status === 2">即将开始</a>
            </span>
            <span>
              <a class="disabled" v-show="detail.stockTotal === 0 && detail.status !== 0">已售罄</a>
            </span>
          </p>
        </div>
      </div>

      <div class="mask_bg" v-show="mask">
        <div class="mask_content">
          <div class="mask_content_hd">
            <div class="item_info">
              <img class="inline-block item_info_pic" :src="item.img" @click="scaleUp" />
              <div class="inline-block item_info_detail">
                <p class="price">
                  <span>￥{{item.price}}</span>
                </p>
                <p class="stock">库存：
                  <span>{{item.rest}}</span>件</p>
                <p v-show="detail.isSpecEnabled === 1 && (!specOneSelect.status || !specTwoSelect.status)">
                  <span>请选择</span>
                  <span v-for="(li, index) in specName" :key="index">&nbsp;{{li}}</span>
                </p>
                <p v-show="detail.isSpecEnabled === 1 && specOneSelect.status && specTwoSelect.status">
                  <span>规格：</span>
                  <span v-for="(li, index) in select" :key="index">&nbsp;{{li}}</span>
                </p>
              </div>
            </div>
            <div class="item_cancel" @click="cancel()">
              <i class="item_cancel_btn">&nbsp;</i>
            </div>
          </div>
          <div class="mask_content_bd">
            <div class="retinabt item_spec" v-if="detail.isSpecEnabled === 1" v-for="(li,grandParentIndex) in item.specs.name" :key="grandParentIndex">
              <p class="item_spec_title" v-for="(l,key,index) in li" :key="index">{{key}}:</p>
              <ul class="item_spec_li clearfix" v-for="(l,ParentKey,ParentIndex) in li" :key="ParentIndex">
                <li class="value inline-block fl" :class="{'sold-out' : s.rest === 0, 'active' : select[grandParentIndex] === key}" v-for="(s,key,index) in l" @click="showSth(key, grandParentIndex, ParentKey, s.rest)" :key="index">{{key}}</li>
              </ul>
            </div>
            <div class="retinabt count item_spec">
              <div class="item_spec_title">数量:</div>
              <div>
                <button type="button" name="button" class="count_reduce" :class="{ disabled: item.count === 1 }" @click="reduce">&nbsp;</button>
                <span class="count_count text-center">{{item.count}}</span>
                <button type="button" name="button" class="count_add" :class="{ disabled: !(specOneSelect.status && specTwoSelect.status) }" @click="add">&nbsp;</button>
              </div>
            </div>
          </div>
          <div class="mask_content_fd">
            <a class="weui_btn weui_btn_primary" v-show="maskType === 1" @click="bought()">确定</a>
          </div>
        </div>
      </div>
      <toast v-show="toastShow">操作成功</toast>
      <user-analysis></user-analysis>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import './styles/item.styl';
</style>

<script>
"use strict";
import Vue from "vue";
import VueDPlayer from "../../components/vue-player/vue-player.vue";
import Toast from "../../components/toast/toast.vue";
import Modal from "../../components/dialog/dialog.vue";
import userAnalysis from "../../components/user-analysis/user-analysis";
import loading from "../../components/loading/loading";
import wxParse from "mpvue-wxparse";
export default {
  components: {
    Toast,
    userAnalysis,
    loading,
    Modal,
    "d-player": VueDPlayer,
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
      loadingstatus: this.loadingstatus,
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
      price: this.price,
      cartCount: this.cartCount,
      userInfo: window.userInfo,
      dialogControl: this.dialogControl,
      dialogShow: this.dialogShow,
      copyLinkModalShow: this.copyLinkModalShow,
      menuList: this.menuList,
      tabSelect: this.tabSelect,
      video: this.video,
      scaleImg: this.scaleImg,
      detailChangeShow: this.detailChangeShow,
      detailChangeContext: this.detailChangeContext,
      tabnavFixed: this.tabnavFixed,
      activityStatus: this.activityStatus,
      promotion: this.promotion,
      autoplay: true,
      playIcon: true,
      memberUrl: this.memberUrl
    };
  },
  watch: {
    "$route.params.id": function() {
      const _this = this;
      if (_this.$route.name === "goodsDetail") {
        _this.detail = false;
        _this.pageDuration(window.location.reload());
        // if (this.mySwiper) {
        //   this.mySwiper.destroy(true);
        // }
        // _this.loadingstatus = true;
        // _this.init();
      }
    }
  },
  computed: {
    commissionPrice() {
      const _this = this;
      let price = `${_this.price.i}${_this.price.f}`;
      // 销售价*95%*总佣金比例*20%
      price = (
        parseFloat(price) *
        (_this.detail.commissionRate / 100) *
        (_this.detail.memberDiscount / 100) *
        (_this.detail.commissionRate1 / 100)
      ).toFixed(2);
      return price;
    },
    privilegePrice() {
      const _this = this;
      let price = `${_this.price.i}${_this.price.f}`;
      let priceStr = "";
      if (_this.detail.memberLevel < 2) {
        price = (
          parseFloat(price) *
          (1 - _this.detail.memberDiscount / 100)
        ).toFixed(2);
        priceStr = "该商品会员购买可省约" + price + "元";
      } else {
        price = (
          parseFloat(price) *
          (_this.detail.commissionRate / 100) *
          (_this.detail.memberPrivilegeDiscount / 100) *
          (_this.detail.memberDiscount / 100)
        ).toFixed(2);
        priceStr =
          "尊享会员" +
          _this.detail.memberDiscount +
          "折基础上，购买再省约" +
          price +
          "元";
      }
      return priceStr;
    }
  },
  mounted() {
    const _this = this;
    _this.init();
    _this.$router.beforeEach((to, from, next) => {
      if (_this.$route.name === "goodsDetail") {
        _this.pageDuration(next());
      } else {
        next();
      }
    });
  },
  deactivated() {
    const _this = this;
    _this.detail = false;
  },
  methods: {
    //初始化数据
    init() {
      this.detail = false;
      this.copyLinkModalShow = false;
      this.dialogShow = false;
      this.toastShow = false;
      this.dialogControl = false;
      this.mask = false;
      this.cartCount = 0;
      this.loadingstatus = true;
      this.scaleImg = false;
      this.detailChangeShow = false;
      this.detailChangeContext = "点击查看商品详情";
      this.spec = {
        name: [],
        length: 0
      };
      this.item = {
        img: "",
        price: "",
        id: 0,
        count: 0,
        rest: 0,
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
      this.price = {
        i: "",
        f: ""
      };
      this.menuList = ["我的故事", "商品详情"];
      this.tabSelect = 0;
      this.activityStatus = 0; //0表示没有活动，1表示活动中，2表示活动未开始，3表示活动已结束
      this.promotion = false;
      //   this.checkPromotion();
      //   this.showCartGoodsCount();
      //   this.getData();
      //   this.pageView();
    },
    //判断是否推广
    checkPromotion() {
      const _this = this;
      const has = Object.prototype.hasOwnProperty;
      if (has.call(_this.$route.query, "sourceType")) {
        if (_this.$route.query.sourceType === "4") {
          _this.promotion = true;
          console.log("广点通推广");
        } else {
          _this.promotion = false;
          console.log("!广点通推广");
        }
      } else {
        _this.promotion = false;
        console.log("!广点通推广");
      }
    },
    detailChange() {
      const _this = this;
      switch (true) {
        case _this.detailChangeContext === "点击查看商品详情":
          _this.tabSelect = 1;
          // console.log(_this.$refs.detailInnerBd.offsetTop);
          _this.detailChangeContext = "点击查看我的故事";
          _this.tabnavFixed = true;
          window.scrollTo(0, _this.detailInnerBdTop);
          break;
        case _this.detailChangeContext === "点击查看我的故事":
          _this.tabSelect = 0;
          _this.tabnavFixed = true;
          // console.log(_this.$refs.detailInnerBd.offsetTop);
          _this.detailChangeContext = "点击查看商品详情";
          window.scrollTo(0, _this.detailInnerBdTop);
          break;
      }
    },
    //切换详情菜单
    tab(index) {
      const _this = this;
      _this.tabSelect = index;
      if (index === 0) {
        _this.detailChangeContext = "点击查看商品详情";
        let scrollTop = sessionStorage.getItem(
          `goodsDetailTab0${_this.$route.params.id}`
        );
        if (scrollTop) {
          window.scrollTo(0, scrollTop);
        }
      }
      if (index === 1) {
        _this.detailChangeContext = "点击查看我的故事";
        let scrollTop = sessionStorage.getItem(
          `goodsDetailTab1${_this.$route.params.id}`
        );
        if (scrollTop) {
          window.scrollTo(0, scrollTop);
        }
      }
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
          sourceType: _this.$route.query.sourceType || "0",
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
      const tabnav = _this.$refs.tabnav.offsetTop;
      $(window).scroll(() => {
        if (_this.$route.name === "goodsDetail") {
          if (
            _this.detail.itemsExtension.detailType === 1 ||
            _this.detail.itemsExtension.detailType === 2
          ) {
            let scrollTop = $(window).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(window).height();
            if (scrollTop > tabnav) {
              _this.tabnavFixed = true;
              _this.$refs.tabnav.style.position = "fixed";
              _this.$refs.tabnav.style.top = "0";
            } else {
              _this.tabnavFixed = false;
              _this.$refs.tabnav.style.position = "static";
            }
            if (_this.tabSelect === 0) {
              sessionStorage.setItem(
                `goodsDetailTab0${_this.$route.params.id}`,
                scrollTop
              );
            }
            if (_this.tabSelect === 1) {
              sessionStorage.setItem(
                `goodsDetailTab1${_this.$route.params.id}`,
                scrollTop
              );
            }
            if (scrollTop + windowHeight - scrollHeight === 0) {
              // console.log(scrollTop + windowHeight - scrollHeight);
              _this.detailChangeShow = true;
            } else {
              _this.detailChangeShow = false;
            }
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
              // wx.hideMenuItems({
              //   menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
              // });
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
              //分享到QQ
              wx.onMenuShareQQ({
                title: _opts.title, // 分享标题
                desc: _opts.desc, // 分享描述
                link: _opts.link, // 分享链接
                imgUrl: _opts.icon, // 分享图标
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
              _this.copyLinkModalShow = true;
              window.mallUtils.funs.unTouchMove();
            }
          }
        });
    },
    //隐藏复制链接提示模态框
    copyLinkModal() {
      const _this = this;
      _this.copyLinkModalShow = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //成功加入购物车&购买的弹框
    showToast() {
      this.toastShow = true;
      setTimeout(() => {
        this.toastShow = false;
      }, 2000);
    },
    //客服
    cs() {
      this.dialogControl = true;
      window.mallUtils.funs.unTouchMove();
    },
    handleDialogAction(action) {
      this.dialogControl = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //双倍佣金说明
    doubleReward() {
      this.dialogShow = true;
      window.mallUtils.funs.unTouchMove();
    },
    handleDialog(action) {
      this.dialogShow = false;
      window.mallUtils.funs.activeTouchMove();
    },
    //商品图片轮播初始化
    initBanner() {
      this.mySwiper = new Swiper(".swiper-container", {
        autoplay: 5000,
        loop: true,
        // 如果需要分页器
        pagination: ".swiper-pagination",
        autoplayDisableOnInteraction: false
      });
      window.scrollTo(0, 0);
    },
    //获取商品数据
    getData() {
      const _this = this;
      let id = this.$route.params.id;
      let url = Vue.OneMallUrl.item + id;
      if (!window.userInfo.id) {
        url = `${url}/display`;
      }
      Vue.OneMallHttp()
        .GET("", url)
        .then(res => {
          if (res.code === 0) {
            this.detail = res.data;
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
            // if (this.promotion) {
            //   opts.link =
            //     `${window.location.protocol}//${window.location.hostname}/wx/goods/detail/${id}/display?sourceType=${this.$route.query.sourceType}&sourceId=${this.$route.query.sourceId}`;
            // }
            this.setShare(opts);
            if (this.detail.discountActivity) {
              this.checkActivityStatus();
            } else {
              this.activityStatus = 0;
              this.itemInfoShow();
            }
            this.sku();
            if (this.detail.itemsExtension.detailType === 0) {
              setTimeout(() => {
                this.initBanner();
              }, 200);
            } else {
              this.video = {
                url: this.detail.itemsExtension.videoUrl,
                pic: this.detail.itemsExtension.videoImgUrl
              };
              this.$nextTick(function() {
                $(".dplayer-setting").css("display", "none");
                // console.log($(".detail_inner_bd").offset());
                this.detailInnerBdTop = $(".detail_inner_bd").offset().top;
                this.watchScroll();
              });
            }
            this.memberUrl =
              window.location.protocol +
              "//" +
              window.location.hostname +
              "/wx/member/membership?inviteCode=" +
              window.userInfo.id;
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
      _this.itemInfoShow();
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
    //点击模态框的加入购物车按钮
    cart() {
      if (this.specTwoSelect.status && this.specOneSelect.status) {
        let item = {
          skuId: this.item.id,
          count: this.item.count,
          createTime: moment().unix()
        };
        let skuList = this.$localStorage.get("skuList");
        let haveSameGoods = false;
        skuList.forEach((ele, i, a) => {
          if (ele.skuId === item.skuId) {
            window.mallUtils.layer.alert("该商品已经存在购物车中");
            haveSameGoods = true;
          }
        });
        if (!haveSameGoods) {
          skuList.push(item);
          this.showToast();
        }
        this.$localStorage.set("skuList", skuList);
        this.showCartGoodsCount();
        this.mask = false;
        window.mallUtils.funs.activeTouchMove();
        this.restSpecOne();
        this.restSpecTwo();
        this.setGoodsStatus();
      } else {
        window.mallUtils.layer.alert("请选择" + this.specName);
      }
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
          if(pindan) {
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
            this.$router.push('/pages/item/pay');
          }, 1000);
          } else {
            this.$router.push('/pages/item/joinError');  
          }
        } else {
          window.mallUtils.layer.alert("请选择" + this.specName);
        }
      }
    },
    //模态框的增加商品数量
    add() {
      let item = this.item;
      if (this.specTwoSelect.status && this.specOneSelect.status) {
        if (item.count < item.rest) {
          this.item.count += 1;
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
        // console.log(specLen);
        // console.log(specName);
        // console.log(aaa);
        // console.log(bbb);
      }
      this.loadingstatus = false;
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
    },
    //显示购物车商品数量
    showCartGoodsCount() {
      const _this = this;
      let skuList = this.$localStorage.get("skuList");
      _this.cartCount = 0;
      skuList.forEach((ele, i, a) => {
        _this.cartCount += ele.count;
      });
    }
  },
}
</script>
