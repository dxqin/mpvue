<template>
  <div class="content">
    <img src="./../../../static/img/await.png" />
    <span>功能正在加紧赶来，敬请期待……</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'icon'
    }
  }
}
</script>

<style>
.content{
  width: 614rpx;
  height: 514rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content img{
  width: 426rpx;
  height: 318rpx;
  margin-bottom: 41rpx;
}
.content span{
  height:34rpx;
  font-size:24rpx;
  color:rgba(59,59,59,1);
  line-height:34rpx;
}
</style>

