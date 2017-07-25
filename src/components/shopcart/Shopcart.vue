<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="icon-wrapper">
            <div class="icon" :class="{highlight:totalCount > 0}">
              <span class="icon-shopping_cart" :class="{highlight:totalCount > 0}"></span>
            </div>
            <div class="count" v-show="getCount > 0">{{getCount}}</div>
          </div>
          <transition v-for="ball in ballArr" :key="ball" @before-enter="beforeEnter" @enter="enter"
                      @after-enter="afterEnter">
            <div class="ball" v-show="ball.isShow">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
          <div class="price">￥{{totalCount}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="shop-cart-right" :class="{highlight:payClass}">{{payDesc}}</div>
      </div>
      <transition name="fold">
        <div class="shopcartList" v-show="isShowFn">
          <div class="title">
            <span class="title-left">购物车</span>
            <span class="title-right" @click="clear">清空</span>
          </div>
          <div ref="shopcartList" class="listWrapper">
            <ul class="list">
              <li v-for="food in selectedFoods" class="item">
                <span class="name">{{food.name}}</span>
                <div class="item-right">
                  <span class="price">￥{{food.price}}</span>
                  <div class="cartControlWrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="shopcart-mask" v-show="isShowFn" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import CartControl from '@/components/cartcontrol/CartControl';
  import BScroll from 'better-scroll';
  export default {
    name: 'v-Shopcart',
    props: {
      selectedFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: Number,
      minPrice: Number
    },
    created() {
      this.$nextTick(() => {
        this.listScroll = new BScroll(this.$refs.shopcartList, {
          click: true,
          probeType: 3
        });
      });
    },
    data() {
      return {
        ballArr: [
          {
            isShow: false
          },
          {
            isShow: false
          },
          {
            isShow: false
          },
          {
            isShow: false
          },
          {
            isShow: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    methods: {
      _drop(el) {
        for (let i = 0; i < this.ballArr.length; i++) {
          let ball = this.ballArr[i];
          if (!ball.isShow) {
            ball.isShow = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        this.dropBalls.forEach(ball => {
          let rect = ball.el.getBoundingClientRect();
          let y = -(window.innerHeight - rect.top - 25);
          let x = rect.left - 26;
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        });
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.isShow = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        this.fold = !this.fold;
      },
      clear() {
        this.selectedFoods.forEach(food => {
          food.count = 0;
        });
        this.fold = true;
      }
    },
    computed: {
      totalCount() {
        let count = 0;
        this.selectedFoods.forEach(food => {
          count += (food.count * food.price);
        });
        return count;
      },
      payDesc() {
        let count = 0;
        this.selectedFoods.forEach(food => {
          count += (food.price * food.count);
        });
        let diff = this.minPrice - count;
        if (count === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (diff <= 0) {
          return '去结算';
        } else {
          return `还差￥${diff}`;
        }
      },
      payClass() {
        if (this.minPrice <= this.totalCount) {
          return true;
        } else {
          return false;
        }
      },
      isShowFn() {
        if (this.selectedFoods.length <= 0) {
          this.fold = true;
          return false;
        }
        if (!this.fold) {
          this.$nextTick(() => {
            this.listScroll.refresh();
          });
          return true;
        } else {
          return false;
        }
      },
      getCount() {
          let count = 0;
          this.selectedFoods.forEach(item => {
              count += item.count;
          });
        return count;
      }
    },
    components: {
      CartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  @import '../../common/stylus/base.styl';
  .shop-cart
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 11
    height: 56px
    font-size: 0
    .content
      background: #141d27;
      position: relative
      display: flex
      .content-left
        flex: 1
        .icon-wrapper
          display: inline-block
          border-radius: 50%
          background: #141d27
          width: 56px
          height: 56px
          position: relative
          top: -10px
          margin: 0 12px
          box-sizing: border-box
          padding: 6px
          .icon
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            font-size: 24px
            text-align: center;
            line-height: 44px
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              color: #80858a
              &.highlight
                color: #fff
          .count
            position: absolute;
            width: 18px;
            height: 18px;
            background: red;
            border-radius: 50%;
            top: -5px;
            right: 2px;
            color:#fff
            padding: 2px 0;
            text-align: center;
            box-sizing:border-box
            font-size:10px
    .price
      display: inline-block
      font-size: 16px
      font-weight: 700
      color: rgba(255, 255, 255, 0.4)
      padding-right: 12px
      box-sizing: border-box
      line-height: 34px
      top: -2px
      border-1px-right(rgba(255, 255, 255, 0.1))
    .desc
      font-size: 10px
      display: inline-block
      color: rgba(255, 255, 255, 0.4)
      margin: 12px 0 0 12px
      line-height: 40px;
      vertical-align: top;
    .shop-cart-right
      display: inline-block
      flex: 0 0 105px
      background: #2b333b
      font-size: 12px
      color: rgba(255, 255, 255, 0.4)
      font-weight: 700
      line-height: 56px
      text-align: center
      &.highlight
        background: #00b43c
        color: #fff
    .ball
      position: fixed
      left: 32px
      bottom: 20px
      transition: transform .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 20px
        height: 20px
        background: rgb(0, 160, 220)
        border-radius: 50%
        transition: transform .4s linear
    .shopcartList
      background: #fff
      position: absolute;
      top: 0;
      left: 0;
      width: 100%
      z-index: -1;
      transition: transform .4s linear
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave
        transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .title
        background: #f3f5f7
        line-height: 40px;
        height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        padding: 0 18px
        .title-left
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .title-right
          float: right
          color: rgb(0, 160, 220)
          font-size: 12px
      .listWrapper
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        .list
          overflow: hidden
          background: #fff
          .item
            border-1px(rgba(7, 17, 27, 0.1))
            padding: 12px 0
            &:last-child
              border-none()
            .name
              font-size: 14px
              color: rgb(7, 17, 27)
              line-height: 24px
            .item-right
              float: right
              .price
                font-size: 14px
                font-weight: 700
                color: rgb(240, 20, 20)
                line-height: 24px
                vertical-align: top
              .cartControlWrapper
                display: inline-block

  .shopcart-mask
    position: fixed
    top: 0;
    bottom: 0;
    left: 0
    right: 0
    z-index: 10
    transition: transform .5s
    filter: blur(10px)
    background: rgba(7, 17, 27, 0.6)
    &.mask-enter-active, &.mask-leave
      background: rgba(7, 17, 27, 0.6)
    &.mask-enter, &.mask-leave-active
      background: rgba(7, 17, 27, 0)
</style>
