<template>
  <div class="cart-control" ref="cartControl">
    <transition name="move">
      <div class="decrease" v-show="food.count>0" @click.stop="decreaseCount($event)">
          <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>

    <span class="count" v-show="food.count>0">{{food.count}}</span>
    <div class="increase" @click.stop="increaseCount($event)">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    name: 'v-cartControl',
    props: {
        food: Object
    },
    methods: {
      increaseCount(event) {
        if (!event._constructed) {
            return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 0);
        }
        this.food.count++;
        this.$emit('increase', event.target);
      },
      decreaseCount(event) {
        if (!event._constructed) {
          return;
        }
          this.food.count--;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.styl";
  .cart-control
    font-size:0
    .decrease,.increase
      display:inline-block
      transition:all .4s linear
      &.move-enter-active,&move-leave
        opacity:1
        transform:translate3d(0,0,0) rotate(0deg)
      &.move-enter,&.move-leave-active
        opacity:0
        transform:translate3d(24px,0,0) rotate(180deg)
      .icon-remove_circle_outline,.icon-add_circle
        font-size:24px
        color:#00a0dc
        padding:4px
    .count
      padding 0 5px
      font-size:10px
      line-height:24px
      vertical-align:top
      color:rgb(147,153,159)
</style>
