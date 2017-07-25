<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64px" height="64px">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="supports-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" v-if="seller.bulletin">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div class="show-detail " v-show="isShowDetail">
        <div class="show-detail-wrapper clearfix">
          <div class="detail-name">
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="starsWrapper">
            <v-star :count="5" :size="48" :score="seller.score"></v-star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports-detail">
            <li v-for="support in seller.supports" class="item">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
          <div class="title2">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin-detail">
            <p class="text">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/components/stars/Stars';
  export default{
    name: 'v-header',
    props: {
          seller: Object
    },
    data() {
      return {
        isShowDetail: false
      };
    },
    methods: {
      showDetail() {
          this.isShowDetail = true;
      },
      hideDetail() {
          this.isShowDetail = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/icon.styl";
  .header
    color:#fff;
    position:relative;
    font-size: 0px;
    .content-wrapper
      background: rgba(7,17,27,0.5);
      padding: 24px 12px 18px 24px;
      height:100%;
      position: relative
      .avatar
        display: inline-block;
        img
          border-radius :2px;
      .content
        display inline-block;
        margin-left:16px;
        vertical-align :top;
        .title
          vertical-align :top;
          margin-top:2px;
          .brand
            display :inline-block;
            width:30px;
            height:18px;
            bg-image('images/brand');
            background-repeat no-repeat;
            background-size 30px 18px;
            margin-right:6px
          .name
            font-size:16px;
            vertical-align :top;
            font-weight bold;
        .description
          margin-top:8px;
          font-size:12px
          line-height 12px
          vertical-align:top;
        .supports
          margin-top:8px;
          .icon
            display inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-repeat:no-repeat;
            background-size:12px 12px;
            &.decrease
              bg-image('images/decrease_1')
            &.discount
              bg-image('images/discount_1')
            &.guarantee
              bg-image('images/guarantee_1')
            &.invoice
              bg-image('images/invoice_1')
            &.special
              bg-image('images/special_1')
           .text
              vertical-align: top
              font-size: 10px;
              line-height 12px
        .supports-count
          height: 24px
          line-height: 24px
          display: inline-block;
          position: absolute;
          bottom: 14px;
          right: 12px;
          padding: 0 8px;
          background: rgba(0,0,0,0.2);
          border-radius: 14px;
          text-align: center;
          .count
            font-size 10px;
            vertical-align:top
          .icon-keyboard_arrow_right
            font-size 10px;
            margin-left:2px;
            line-height:24px;
    .bulletin-wrapper
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      background:rgba(7,17,27,0.2);
      line-height: 28px;
      padding: 0 22px 0 12px;
      font-size:10px;
      .bulletin-title
        bg-image('images/bulletin')
        display :inline-block
        width:22px;
        height:12px;
        background-size:22px 12px;
        vertical-align:top
        margin-top:8px
      .bulletin-text
        vertical-align top;
        margin:0 4px;
      .icon-keyboard_arrow_right
        font-size:14px
        position: absolute
        right: 12px
        top: 8px
    .background
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      z-index:-1;
      filter:blur(10px)
      -ms-filter blur(10px)
    .fade-enter-active,.fade-leave-active
      transition:opacity .5s
    .fade-enter, .fade-leave-active
      opacity 0
    .show-detail
      overflow:auto
      position: fixed
      top:0
      left:0
      height:100%
      width:100%
      z-index:2
      background:rgba(7,17,27,0.8)
      .show-detail-wrapper
        padding-bottom:90px
      .detail-close
        margin:-90px auto 0 auto
        clear:both
        height:32px
        width:32px
        position:relative
        font-size:32px
        color:rgba(255,255,255,0.5)
      .detail-name
        text-align:center
        margin-top:64px
        & .name
          font-size:16px
          font-weight :700
          line-height:16px
      .starsWrapper
        margin-top:16px
        margin-left:-8px
        text-align :center

      .title
        width:80%;
        display:flex
        margin:28px auto 24px auto
        text-align:center
        .line
          flex:1
          position:relative
          top:-6px
          border-1px(rgba(255,255,255,0.2))
        .text
          flex:1
          font-weight: 700
          font-size: 14px

      .supports-detail
        font-size: 12px
        line-height:12px
        padding:0 12px
        width:80%
        margin:0 auto
        .item
          margin-bottom:12px
          padding:0 12px
          .icon
            display: inline-block
            width:16px
            height:16px
            background-size:16px 16px
            vertical-align:top
            margin-right:6px
          .decrease
            bg-image('images/decrease_2')
          .discount
           bg-image('images/discount_2')
          .guarantee
           bg-image('images/guarantee_2')
          .invoice
           bg-image('images/invoice_2')
          .special
           bg-image('images/special_2')
           &:last-child
            margin-bottom:0

      .title2
        width:80%
        margin:28px auto 24px auto
        text-align:center
        display:flex
        .line
          position:relative
          top:-6px;
          border-1px(rgba(255,255,255,0.2))
          flex:1
          font-size:0
        .text
          font-size:14px
          font-weight:700
          line-height:14px
          flex:1
      .bulletin-detail
        width:80%
        margin:24px auto 0 auto
        line-height:14px
        .text
          font-size:12px
          padding:12px
</style>
