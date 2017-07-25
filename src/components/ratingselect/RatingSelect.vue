<template>
  <div class="ratingSelect">
    <div class="title">商品评价</div>
    <div class="btnDesc-wrapper border-1px">
      <span class="btn positive" @click="selectAll" :class="{active:rateType===2}">{{btnDesc.all}}</span>
      <span class="btn positive" @click="selectPositive" :class="{active:rateType===0}">{{btnDesc.positive}}</span>
      <span class="btn negative" @click="selectNegative" :class="{active:rateType===1}">{{btnDesc.negative}}</span>
    </div>
    <div class="filterRating-wrapper" @click="toggleContent" :class="{active:onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
      name: 'v-ratingSelect',
      props: {
          btnDesc: {
              type: Object,
              default() {
                  return {
                      all: '全部',
                      positive: '推荐',
                      negative: '吐槽'
                  };
              }
          }
      },
      data() {
          return {
            onlyContent: false,
            rateType: ALL
          };
      },
      methods: {
        toggleContent(event) {
          if (!event._constructed) {
            return;
          }
            this.$emit('toggleOnlyContent');
            this.onlyContent = !this.onlyContent;
        },
        selectAll(event) {
          if (!event._constructed) {
            return;
          }
            this.rateType = ALL;
            this.$emit('ratingTypeSelect', ALL);
        },
        selectPositive(event) {
          if (!event._constructed) {
            return;
          }
          this.rateType = POSITIVE;
          this.$emit('ratingTypeSelect', POSITIVE);
        },
        selectNegative(event) {
          if (!event._constructed) {
            return;
          }
          this.rateType = NEGATIVE;
          this.$emit('ratingTypeSelect', NEGATIVE);
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .ratingSelect
    padding:18px
    padding-bottom:5px
    .title
      font-size:14px
    .btnDesc-wrapper
      padding:18px 0 18px 0
      border-1px(rgba(7,17,27,0.1))
      .btn
        padding:8px 16px
        margin-right:8px
        color:rgb(77,85,93)
        font-size:12px
        &:last-child
          margin-right:0px
        &.active
          color:#fff
      .positive
        background:rgba(0,160,220,0.2)
        &.active
          background:rgb(0,160,220)
      .negative
        background:rgba(77,85,93,0.2)
        &.active
          background:rgb(77,85,93)
    .filterRating-wrapper
      .icon-check_circle
        color:rgb(147,153,159)
        font-size:24px
        vertical-align: middle
        line-height:38px
      &.active
        .icon-check_circle
          color: #00c850
      .text
        padding:12px
        font-size:12px
        color:rgb(147,153,159)
</style>
