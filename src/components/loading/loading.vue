<template lang="">
<div class="loading" v-if="loadingstatus">
  <img width="100%" src="https://static.paranoidsqd.com/images/common/loading.gif" alt="" />
</div>
</template>
<style lang="stylus" scoped>
.loading
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color #fff
  z-index 10
  img
    width 100%
    margin auto
    position absolute
    top 50%
    left 50%
    -webkit-transform translate(-50%,-50%)
    -ms-transform translate(-50%,-50%)
        transform translate(-50%,-50%)
</style>
<script lang="">
'use strict';
export default {
  // Options / Data
  data() {
    return {}
  },
  props: {
    /**
     * 类型
     */
    loadingstatus: {
      type: Boolean,
      default: true
    },
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
}
</script>
