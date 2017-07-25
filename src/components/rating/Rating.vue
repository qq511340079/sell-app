<template>
  <div class="rating" ref="rating">
    <div class="rating-wrapper">
      <div class="overview">
        <div class="overview-left border-1px-r">
          <p class="score">{{seller.score}}</p>
          <p class="text">综合评分</p>
          <p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star-wrapper">
              <star class="star" :score="seller.serviceScore" :size="36" :count="5"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">味道</span>
            <div class="star-wrapper">
              <star class="star" :score="seller.foodScore" :size="36" :count="5"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <splitline></splitline>
      <div class="ratingSelect-wrapper">
        <rating-select :btnDesc="btnDesc" @toggleOnlyContent="toggleOnlyContent" @ratingTypeSelect="ratingTypeSelect"></rating-select>
      </div>
      <ul class="ratingList">
        <li v-for="rating in ratingsComputed" class="rating-item border-1px">
          <div class="user-img">
            <img width="28" height="28" class="img" :src="rating.avatar"/>
          </div>
          <div class="content">
            <div class="userInfo">
              <span class="username">{{rating.username}}</span>
              <span class="time">{{rating.rateTime}}</span>
            </div>
            <div class="star-wrapper">
              <div class="ratingStar">
                <star :score="rating.score" :size="24" :count="5"></star>
              </div>
              <span class="time">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <div class="ratingText-wrapper">
              <p class="text">{{rating.text}}</p>
            </div>
            <div class="recommend-wrapper" v-if="rating.rateType === 0">
              <i class="icon-thumb_up"></i>
              <span v-for="recommend in rating.recommend" class="recommend">{{recommend}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/components/stars/Stars';
  import Splitline from '@/components/splitline/Splitline';
  import RatingSelect from '@/components/ratingselect/RatingSelect';
  import BScroll from 'better-scroll';

  const ALL = 2;
  export default {
      name: 'v-rating',
      props: {
        seller: Object
      },
      data() {
        return {
          btnDesc: {
              all: '全部',
              positive: '满意',
              negative: '不满意'
          },
          ratings: [],
          onlyContent: false,
          rateType: ALL
        };
      },
      created() {
        this.$http.get('/api/ratings').then((resp) => {
          let ret = resp.body;
          if (ret.errorNo === 0) {
            this.ratings = ret.data;
          };
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          });
        });
      },
      computed: {
        ratingsComputed() {
          let ratings = [];
          if (!this.ratings) {
            return ratings;
          }
          for (let i = 0; i < this.ratings.length; i++) {
            let r = null;
            if (this.rateType === ALL) {
              r = this.ratings[i];
            }
            if (this.rateType === this.ratings[i].rateType) {
              r = this.ratings[i];
            }
            if (this.onlyContent && r && !r.text) {
              r = null;
            }
            if (r) {
              ratings.push(r);
            }
          }
          if (this.scroll) {
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          }

          return ratings;
        }
      },
      methods: {
        toggleOnlyContent() {
          this.onlyContent = !this.onlyContent;
          this.ratings;
        },
        ratingTypeSelect(type) {
          this.rateType = type;
        }
      },
      components: {
        Star,
        RatingSelect,
        Splitline
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .border-1px-r
    &::after
      @media (min-device-pixel-ratio: 1.5),(-webkit-min-device-pixel-ratio:1.5)
        transform:scaleX(0.7)
      @media (min-device-pixel-ratio: 2),(-webkit-min-device-pixel-ratio:2)
        transform:scaleX(0.5)

 .rating
    overflow:hidden
    position:absolute
    top:174px
    bottom:0
    width:100%
  .rating-wrapper
    padding:18px 0
    .overview
      display:flex
      padding:0 0 18px 0
      .overview-left
        padding 6px 0
        position:relative
        text-align:center
        flex:0 0 142px
        width:142px
        display:inline-block
        box-sizing:border-box
        &::after
          position:absolute
          right:0
          top:0
          bottom:0
          content: '\20'
          display:block
          border-right:1px solid rgba(7,17,27,0.1)
        .score
          color:rgb(255,153,0)
          font-size:24px
         .text
            color:rgb(7,17,27)
            font-size:12px
            line-height:14px
            margin-top:6px
         .rankRate
            color:rgb(147,153,159)
            font-size:10px
            margin-top:8px
            line-height:14px
      .overview-right
        display:inline-block
        flex:1
        padding:6px 0 6px 24px
        .score-wrapper
          font-size:0
          .title
            font-size:12px
            line-height:18px
            color:rgb(7,17,27)
            width:48px
            display:inline-block
            vertical-align:top
          .star-wrapper
            display:inline-block
            margin:0 12px
            line-height:18px
          .score
            vertical-align:top
            font-size:12px
            line-height:18px
            color:rgb(255,153,0)
        .deliveryTime-wrapper
          font-size:0
          .title
            font-size:12px
            line-height:18px
            color:rgb(7,17,27)
            width:48px
            display:inline-block
            vertical-align:top
            margin-right:12px
          .deliveryTime
            vertical-align:top
            font-size:12px
            line-height:18px
            color:rgb(147,153,159)
    .ratingList
      padding:0 18px
      .rating-item
        display:flex
        position:relative
        padding:18px 0
        &::after
          position:absolute
          bottom:0
          left:0
          right:0
          content:'\20'
          border-bottom:1px solid rgba(7,17,27,0.1)
          display:block
      .user-img
        flex:0 0 28px
        margin-right:12px
        display:inline-block
        .img
          border-radius:50%
      .content
        display:inline-block
        flex:1
        .userInfo
          color:rgb(7,17,27)
          font-size:10px
          .username
            line-height:12px
            vertical-align:top
          .time
            vertical-align:top
            line-height:12px
            float:right
        .star-wrapper
          margin-top:4px
          .ratingStar
            display:inline-block
          .time
            font-size:10px
            margin-left:6px
            color:rgb(147,153,159)
        .ratingText-wrapper
          margin-top:6px
          .text
            font-size:12px
            line-height:18px
            color:rgb(7,17,27)
        .recommend-wrapper
          .icon-thumb_up
            font-size:12px
            color:rgb(0,160,220)
            line-height:18px
          .recommend
            font-size:9px
            border:1px solid rgba(7,17,27,0.1)
            line-height:18px
            display:inline-block
            padding:0 6px
            margin-right:8px
            &:last-child
              margin-right:0
</style>
