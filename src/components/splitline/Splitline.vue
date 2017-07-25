<template>
  <div class="splitline border-1px">

  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/base.styl';
  .splitline
    position:relative
    &::before
      position:absolute
      top:0
      left:0
      right:0
      content:'\20'
      border-top:1px solid rgba(7,17,27,0.1)
    background:#f3f5f7
    position:relative
    z-index:-1
    height:16px
    &::after
      position:absolute
      bottom:0
      left:0
      right:0
      border-top:1px solid rgba(7,17,27,0.1)
      content:'\20'
</style>
