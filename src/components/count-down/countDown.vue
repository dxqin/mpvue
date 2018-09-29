<template>
<p class="status">
  <span class="status_value">{{showStatus}}</span>
  <span class="fr status_discount" v-show="showStatus === 1000 ">
    {{countDown}}后订单将自动关闭
  </span>
</p>
</template>

<style lang="stylus" scoped>
@import "../../assets/variables.styl"
.status
  color $mainColor
  &_value
    padding-bottom .08rem
  &_discount
    font-size .24rem
    line-height .33rem
    color $subColor
</style>

<script>
'use strict';
import format from '../../utils/format'

export default {
  props: {
    time: {
      type: Number,
      required: false,
      default: 0
    },
    status: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    const _this = this;
    return {
      showTime: _this.showTime
    }
  },
  mounted() {
    const _this = this;
    _this.countDownF();
  },
  activated() {
    const _this = this;
    _this.countDownF();
  },
  deactivated() {
    const _this = this;
    clearInterval(_this.interval);
  },
  destroyed() {
    const _this = this;
    clearInterval(_this.interval);
  },
  computed: {
    'countDown': function() {
      const _this = this;
      return _this.showTime
    },
    'showStatus': function() {
      const _this = this;
      if (_this.showTime === '00分00秒') {
        return -1000
      } else {
        return format.orderStatus(_this.status)
      }
    }
  },
  methods: {
    countDownF() {
      const _this = this;
      _this.interval = setInterval(() => {
        let diff = this.$moment(this.$moment(_this.time * 1000 + 30 * 60 * 1000).diff(this.$moment())).utc();
        if (diff > 0) {
          _this.showTime = diff.format("mm分ss秒");
        } else {
          _this.showStatus = -1000;
        }
      }, 1000);
    }
  }
}
</script>
