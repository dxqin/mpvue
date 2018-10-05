<template>
  <nav class="nav retinabt">

    <router-link :to="{name:'index'}">
      <div class="text-center" :class="{active: type === 'index'}">
        <div class="icon-home icon" v-show="type !== 'index'"></div>
        <div class="icon-home-o icon" v-show="type === 'index'">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </div>
        <div>首页</div>
      </div>
    </router-link>

    <router-link :to="{name:'category', params: {id: 'default'}}">
      <div class="text-center" :class="{active: type === 'category'}">
        <div class="icon-category icon" v-show="type !== 'category'"></div>
        <div class="icon-category-o icon" v-show="type === 'category'">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </div>
        <div>选购</div>
      </div>
    </router-link>

    <router-link :to="{name:'cart'}">
      <div class="text-center" :class="{active: type === 'cart'}">
        <div class="icon-cart icon" v-show="type !== 'cart'"></div>
        <div class="icon-cart-o icon" v-show="type === 'cart'"></div>
        <div>购物车</div>
      </div>
    </router-link>

    <router-link :to="{name:'AdvancedUsers'}">
      <div class="text-center" :class="{active: type === 'AdvancedUsers'}">
        <div class="icon-mine icon" v-show="type !== 'AdvancedUsers'"></div>
        <div class="icon-mine-o icon" v-show="type === 'AdvancedUsers'"></div>
        <div>我的</div>
      </div>
    </router-link>

  </nav>
</template>

<style lang="stylus" scoped>
@import '../../assets/variables.styl'
.active
  color $mainColor
.nav
  position fixed
  bottom 0
  width 100%
  box-sizing border-box
  display flex
  justify-content space-between
  padding 0.13rem 0.7rem 0.05rem 0.7rem
  font-size 0.18rem
  color $mainColor2
  background-color #fff
  z-index 3
  .icon
    font-size 0.48rem
    margin-bottom 0.08rem
</style>

<script>
export default {
  // Options / Data
  data() {
    return {};
  },
  props: {
    /**
     * 类型
     */
    type: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {},
  methods: {} // ,
  // watch: {},
  // Options / DOM
  // el () {},
  // replace: true,
  // template: '',
  // Options / Lifecycle Hooks
  // init () {},
  // crated () {},
  // beforeCompile () {},
  // compiled () {},
  // ready () {},
  // attached () {},
  // detached () {},
  // beforeDestroy () {},
  // destroyed () {},
  // Options / Assets
  // directives: {},
  // elementDirectives: {},
  // filters: {},
  // components: {},
  // transitions: {},
  // partials: {},
  // Options / Misc
  // parent: null,
  // events: {},
  // mixins: [],
  // name: ''
};
</script>
>
