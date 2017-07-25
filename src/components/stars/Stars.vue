<template>
  <div class="stars" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
export default{
    name: 'v-stars',
    props: {
        score: Number,
        size: Number,
        count: Number
    },
   computed: {
      starType() {
          return 'star-' + this.size;
      },
     itemClasses() {
            let ret = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasHalfStar = score % 1 !== 0;
            let onStarNum = parseInt(score);
            for (let i = 0; i < onStarNum; i++) {
              ret.push(CLS_ON);
            };
            if (hasHalfStar) {
                ret.push(CLS_HALF);
            };
            while (ret.length < this.count) {
                ret.push(CLS_OFF);
            };
            return ret;
     }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .stars
    font-size:0
  .star-24
    .star-item
      margin-right:3px
      display: inline-block
      background-size:10px 10px
      width:10px
      height:10px
      &:last-child
        margin-right:0
      &.on
        bg-image('images/star24_on')
      &.off
        bg-image('images/star24_off')
      &.half
        bg-image('images/star24_half')
  .star-36
    .star-item
      margin-right:6px
      display: inline-block
      background-size:15px 15px
      width:15px
      height:15px
      &:last-child
        margin-right:0
      &.on
        bg-image('images/star36_on')
      &.off
        bg-image('images/star36_off')
      &.half
        bg-image('images/star36_half')
  .star-48
    .star-item
      margin-right:22px
      display: inline-block
      background-size:20px 20px
      width:20px
      height:20px
      &:last-child
        margin-right:0
      &.on
        bg-image('images/star48_on')
      &.off
        bg-image('images/star48_off')
      &.half
        bg-image('images/star48_half')
</style>
