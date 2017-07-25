<template>
    <div class="food" ref="foodWrapper">
      <div class="food-image-wrapper">
        <span class="icon-arrow_lift" @click="backToGoods"></span>
        <img class="food-image" :src="food.image">
      </div>
      <div class="food-content">
        <div class="name">{{food.name}}</div>
        <div class="extra">
          <span class="sellCount" >月售{{food.sellCount}}分</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="food-price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cart-control :food="food" @increase="increase"></cart-control>
        </div>
        <transition name="firstAdd-fade">
          <div class="firstAdd" v-show="!food.count || food.cout===0" @click.stop="firstAdd">加入购物车</div>
        </transition>
      </div>
      <splitline></splitline>
      <div class="food-desc">
        <h1 class="title">商品介绍</h1>
        <p class="desc">{{food.info}}</p>
      </div>
      <splitline></splitline>
      <div class="ratingSelect-wrapper border-1px">
        <rating-select @toggleOnlyContent="toggleOnlyContent" @ratingTypeSelect="ratingTypeSelect"></rating-select>
      </div>
      <ul class="ratings-content">
        <li v-for="rating in ratings" class="rating border-1px">
          <div class="title">
            <span class="time">{{rating.rateTime | formatDate}}</span>
            <span class="user">{{rating.username}}<img class="img" width="12" height="12" :src="rating.avatar"/></span>
          </div>
          <div class="content">
            <i :class="{'icon-thumb_down':rating.rateType==1,'icon-thumb_up':rating.rateType===0}"></i>
            <span class="text">{{rating.text}}</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import CartControl from '@/components/cartcontrol/CartControl';
  import Splitline from '@/components/splitline/Splitline';
  import RatingSelect from '@/components/ratingselect/RatingSelect';
  import {formatDate} from '@/common/js/date.js';
  const ALL = 2;
  export default {
      name: 'v-food',
      props: {
          food: Object
      },
      data() {
          return {
            rateType: ALL,
            onlyContent: false
          };
      },
      components: {
        CartControl,
        Splitline,
        RatingSelect
      },
      methods: {
        firstAdd(event) {
            if (!event._constructed) {
                return;
            }
            if (this.food.count >= 0) {
                this.food.count++;
            } else {
                  Vue.set(this.food, 'count', 1);
            }
          this.$emit('increaseFn', event.target);
        },
        increase(el) {
          this.$emit('increaseFn', el);
        },
        backToGoods(event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('hideDetail');
        },
        toggleOnlyContent() {
            this.onlyContent = !this.onlyContent;
            this.ratings;
        },
        ratingTypeSelect(type) {
            this.rateType = type;
        }
      },
      computed: {
          ratings() {
            let ratings = [];
            if (!this.food.ratings) {
                return ratings;
            }
            for (let i = 0; i < this.food.ratings.length; i++) {
              let r = null;
              if (this.rateType === ALL) {
                  r = this.food.ratings[i];
              }
              if (this.rateType === this.food.ratings[i].rateType) {
                  r = this.food.ratings[i];
              }
              if (this.onlyContent && r && !r.text) {
                r = null;
              }
              if (r) {
                ratings.push(r);
              }
            }
            return ratings;
          }
      },
    filters: {
      formatDate (time) {
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.styl";
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .food
    position:relative
    .food-image-wrapper
      padding-bottom:100%;
      width:100%
      position:relative
      .icon-arrow_lift
        position:absolute
        top:15px
        left:10px
        color:#fff
        z-index:10
        font-size:16px
        padding:8px
      .food-image
        position:absolute
        top:0
        right:0
        width:100%
        height:100%
    .food-content
      padding:18px
      position:relative
      .name
        font-size:14px
        font-weight:700
        color:rgb(7,17,27)
        line-height:24px
      .extra
        margin-top:8px
        color:rgb(147,153,159)
        font-size:0
        .sellCount,.rating
          font-size:10px
        .sellCount
          margin-right:12px
      .food-price
        margin-top:18px
        line-height:24px
        .now
          color:rgb(240,20,20)
          font-weight:700
          font-size:14px
        .old
          font-size:10px
          font-weight:700
          color:rgb(147,153,159)
      .cartcontrol-wrapper
        position:absolute
        right:18px
        bottom:18px
      .firstAdd
        position:absolute
        bottom:13px
        right:20px
        z-index:10
        font-size:10px
        color:#fff
        width:74px
        height:24px
        border-radius:24px
        padding:6px 12px
        background:rgb(0,160,220)
        line-height:24px
        text-align:center
        transition:opacity .4s
        opacity:1
        &.firstAdd-fade-leave,&.firstAdd-fade-enter-active
          opacity:1
        &.firstAdd-fade-enter,&.firstAdd-fade-leave-active
          opacity:0

    .food-desc
      padding:18px
      .title
        color:rgb(7,17,27)
        font-size:14px
      .desc
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
        margin-top:6px
        line-height:24px
    .ratingSelect-wrapper
      border-1px(rgba(7,17,27,0.1))
    .ratings-content
      padding:18px
      .rating
        border-1px(rgba(7,17,27,0.1))
        padding-bottom:16px
        .title
          color:rgb(147,153,159)
          font-size:10px
          line-height:24px
          .user
            float:right
            .img
              margin-left:6px
              border-radius:50%
        .content
          font-size:0
          .icon-thumb_down
            color:rgb(147,153,159)
            font-size:12px
          .icon-thumb_up
            color:rgb(0,160,220)
            font-size:12px
          .text
            font-size:12px
            margin-left:4px
            line-height:24px
</style>
