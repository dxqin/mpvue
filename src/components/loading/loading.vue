<template lang="">
<div class="loading" v-if="loadingstatus">
  <img width="100%" src="http://xmcdn2.oss-cn-shanghai.aliyuncs.com/images/common/loading.gif" alt="" />
</div>
</template>

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
