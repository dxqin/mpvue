<template>
<section class="detail_more" v-if="similar">
  <h3 class="detail_more_title">相似商品</h3>
  <div class="swiper-container-more">
    <ul class="detail_more_content swiper-wrapper">
      <li class="item swiper-slide" v-for="li in similar">
        <router-link :to="{ name: 'goodsDetail' , params : { id : li.id}}">
          <img class="item_pic" v-lazy="resizeImg(li.showImageUri, 350)" alt="商品图片">
          <div v-lazy:background-image="resizeImg(li.showImageUri, 350)"></div>
          <p class="item_desc">{{li.name}}</p>
          <p><span class="item_price" :class="li.stockTotal === 0 ? 'sold-out' : ''">￥{{li.unitPriceDesc}}</span><span class="item_status" v-show="li.stockTotal === 0">已售罄</span></p>
        </router-link>
      </li>
    </ul>
  </div>
</section>
</template>
<style lang="stylus" scoped>
@import "../../assets/variables.styl"
.detail_more
  background-color #fff
  padding 0 .32rem .24rem .32rem
  margin-bottom .2rem
  &_title
    padding .32rem 0
    font-size .28rem
    color $mainColor2
    line-height .4rem
  &_content
    .item
      width 2.4rem
      &:last-child
        margin-right 0
      &_pic
        width 2.4rem
        height 2.4rem
        object-fit cover
      &_desc
        font-size .24rem
        color $mainColor0
        line-height .33rem
        height .65rem
        overflow hidden
      &_price
        font-size .24rem
        color $subColor
        line-height .33rem
        margin-right .07rem
      &_status
        font-size .2rem
        padding .015rem .065rem
        border-radius .05rem
        color #fff
        background-color $mainColor1
        margin-right .05rem
        vertical-align middle
      .sold-out
        color $mainColor2
</style>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: 0
    }
  },
  data() {
    const _this = this;
    return {
      similar: _this.similar
    }
  },
  mounted() {
    const _this = this;
    _this.getSimilar();
  },
  activated() {
    const _this = this;
  },
  deactivated() {
    const _this = this;
  },
  destroyed() {
    const _this = this;
  },
  watch: {
    'id': function() {
      const _this = this;
      if (_this.mySwiper2) {
        _this.mySwiper2.destroy(true);
      }
      _this.similar = false;
      _this.getSimilar();
    }
  },
  methods: {
    //相似商品轮播初始化
    initSimilarBanner() {
      const _this = this;
      let fz = $('html').css('font-size');
      fz = parseInt(fz) * 0.24;
      _this.mySwiper2 = new Swiper('.swiper-container-more', {
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: fz,
      });
    },
    //获取相似商品数据
    getSimilar() {
      const _this = this;
      let limit = 6;
      let id = _this.id;
      let params = {
        limit
      };
      Vue.OneMallHttp().GET(params, Vue.OneMallUrl.item + id + '/similar').then((res) => {
        if (res.code === 0) {
          _this.similar = res.data;
          setTimeout(() => {
            _this.initSimilarBanner();
          }, 200);
        }
      });
    }
  }
}
</script>
