<template>
  <div class="seller-wrapper">
    <div class="seller">
      <div class="overview">
        <h1 class="sellerName">{{seller.name}}</h1>
        <div class="desc border-1px-y">
          <div class="inline-block star-wrapper">
            <star :size="36" :score="seller.score" :count="5"></star>
          </div>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="remark">
          <div class="item border-1px-x">
            <h2 class="title">起送价</h2>
            <p class="text">{{seller.minPrice}}<span class="unit">元</span></p>
          </div>
          <div class="item">
            <h2 class="title">商家配送</h2>
            <p class="text">{{seller.deliveryPrice}}<span class="unit">元</span></p>
          </div>
          <div class="item">
            <h2 class="title">平均配送时间</h2>
            <p class="text">{{seller.deliveryTime}}<span class="unit">分钟</span></p>
          </div>
        </div>
        <div class="favorite" @click="toggoleFavorite">
          <i class="icon-favorite" :class="{active:favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <splitline></splitline>
      <div class="bulletin-wrapper">
          <h1 class="title">公告与活动</h1>
          <p class="content border-1px-y">{{seller.bulletin}}</p>
          <ul>
            <li v-for="support in seller.supports" class="supportItem border-1px-y">
              <i :class="iconClass[support.type]" class="icon"></i>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
      </div>
      <splitline></splitline>
      <div class="seller-pics">
        <h1 class="title">商家实景</h1>
        <div ref="pics">
          <ul class="pics fix" ref="picContainer">
            <li class="pic" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
      <splitline></splitline>
      <div class="sellerInfo">
        <h1 class="title border-1px-y">商家信息</h1>
        <ul>
          <li class="info-item border-1px-y" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/components/stars/Stars';
  import Splitline from '@/components/splitline/Splitline';
  import {saveToLocalStore, getFromLocalStore} from '@/common/js/store';
  import BScroll from 'better-scroll';
  export default{
    props: {
        seller: Object
    },
    data() {
      return {
        iconClass: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        favorite: getFromLocalStore(this.seller.id, 'favorite', false)
      };
    },
    mounted() {
      this._initScroll();
      this._initPicScroll();
    },
    computed: {
      favoriteText() {
          return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
        _initScroll() {
          this.sellerScroll = new BScroll(this.$el, {
              click: true
          });
        },
        _initPicScroll() {
          let picWidth = 120;
          let picMargin = 6;
          let picCount = this.seller.pics.length;
          let width = (picWidth + picMargin) * picCount - picMargin;
          this.$refs.picContainer.style.width = `${width}px`;
          this.$nextTick(() => {
              if (!this.picScroll) {
                this.picSroll = new BScroll(this.$refs.pics, {
                  scrollX: true,
                  eventPassthrough: 'vertical'
                });
              } else {
                this.picSroll.refresh();
              }
          });
        },
      toggoleFavorite(event) {
        if (!event._constructed) {
            return;
        }
        this.favorite = !this.favorite;
        saveToLocalStore(this.seller.id, 'favorite', this.favorite);
      }
    },
    components: {
      Star,
      Splitline
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  @media (min-device-pixel-ratio: 1.5),(-webkit-min-device-pixel-ratio:1.5 )
    .border-1px-y
      &::after
        transform:scaleY(0.7)
  @media (min-device-pixel-ratio: 2),(-webkit-min-device-pixel-ratio:2)
    .border-1px-y
      &::after
        transform:scaleY(0.5)
  @media (min-device-pixel-ratio: 1.5),(-webkit-min-device-pixel-ratio:1.5 )
    .border-1px-x
      &::after
        transform:scaleX(0.7)
  @media (min-device-pixel-ratio: 2),(-webkit-min-device-pixel-ratio:2)
    .border-1px-x
      &::after
        transform:scaleX(0.5)

  .inline-block
    display:inline-block

  .seller-wrapper
    overflow:hidden
    position:absolute
    top:174px
    bottom:0
    width:100%
    .seller
      .overview
        position:relative
        padding:18px
        .sellerName
          font-size:14px
          color:rgb(7,17,27)
          line-height:14px
        .desc
          &::after
            position:absolute
            bottom:0
            left:0
            width:100%
            content:"\20"
            border-top:1px solid rgba(7,17,27,0.1)
          margin-top:8px
          color:rgb(77,85,93)
          font-size:0
          position:relative
          padding-bottom:18px
          .star-wrapper
            line-height:18px
            vertical-align:top
          .ratingCount
            line-height:18px
            vertical-align:top
            font-size:10px
            margin-left:8px
          .sellCount
            line-height:18px
            vertical-align:top
            font-size:10px
            margin-left:12px
        .remark
          padding-top:18px
          font-size:0
          .item
            position:relative
            &::after
              position:absolute
              content:'\20'
              right:0
              top:0
              height:100%
              border-right:1px solid rgba(7,17,27,0.1)
            width:33.3%
            display:inline-block
            text-align:center
            &:last-child
              &:after
                border:none
            .title
              font-size:10px
              color:rgb(147,153,159)
            .text
              margin-top:4px
              font-size:24px
              color:rgb(7,17,27)
              .unit
                font-size:10px
        .favorite
          position:absolute
          right:18px
          top:18px
          width:40px
          text-align:center
          .icon-favorite
            color:#d4d6d9
            font-size:24px
            display:block
            margin-bottom:4px
            &.active
              color: rgb(240, 20, 20)
          .text
            font-size:10px
            color:rgb(77,85,93)
      .bulletin-wrapper
        padding:18px 18px 0 18px
        .title
          font-size:14px
          color:rgb(7,17,27)
        .content
          padding:8px 12px 16px 12px
          font-size:12px
          color:rgb(240,20,20)
          line-height:24px
          border-1px(rgba(7,17,27,0.1))
        .supportItem
          padding:16px 12px
          position:relative
          font-size:0
          &::after
            position:absolute
            bottom:0
            left: 0
            width:100%
            border-top:1px solid rgba(7,17,27,0.1)
            content:'\20'
            display:block
          & .icon
            width:16px
            height:16px
            display:inline-block
            background-size:16px 16px
            margin-right:6px
            line-height:16px
            vertical-align:top
          & .decrease
            bg-image('images/decrease_4')
          & .discount
            bg-image('images/discount_4')
          & .guarantee
            bg-image('images/guarantee_4')
          & .invoice
            bg-image('images/invoice_4')
          & .special
            bg-image('images/special_4')
          .text
            font-size:12px
            line-height:16px
            vertical-align:top
            color:rgb(7,17,27)
      .seller-pics
        overflow:hidden
        padding:18px 0 18px 18px
        .title
          font-size:14px
          color:rgb(7,17,27)
        .pics
          white-space:nowrap
          margin-top:12px
          .pic
            display:inline-block
            margin-right:6px
            &:last-child
              margin-right:0
      .sellerInfo
        padding:18px 18px 18px 18px
        .title
          padding-bottom:18px
          border-1px(rgba(7,17,27,0.1))
          line-height:16px
          font-size:14px
          color:rgb(7,17,27)
        .info-item
          padding:16px 12px
          border-1px(rgba(7,17,27,0.1))
          font-size:12px
          color:rgb(7,17,27)
          line-height:16px
          &:last-child
            &::after
              border:none
</style>
