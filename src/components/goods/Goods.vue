<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :class="{active:_calcActive===index || menuIndex === index }" @click="selectMenu(index,$event)">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li class="goods-list" v-for="item in goods" ref="itemList">
          <div class="good-type">{{item.name}}</div>
          <ul class="food-list">
            <li v-for="food in item.foods" class="food-item" @click="showDeatil(food)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <p class="name">{{food.name}}</p>
                <p class="desc">{{food.description}}</p>
                <p class="extra">
                  <span>月销{{food.sellCount}}份</span>
                  <span>{{food.rating}}%好评</span>
                </p>
                <div class="bot fix">
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControlWrapper">
                    <cart-control :food="food" @increase="increaseFn"></cart-control>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="shopcart-wrapper" >
      <shopcart ref="shopcart" :selectedFoods="selectFoods" :delivery-price="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <transition name="fade-foodDeatail">
      <div class="foodDtailWrapper" v-show="showDetail" ref="foodDetail">
        <food :food="selectedFood" @hideDetail="hideDetail" @increaseFn="increaseFn"></food>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import CartControl from '@/components/cartcontrol/CartControl';
  import Shopcart from '@/components/shopcart/Shopcart';
  import Food from '@/components/food/Food';
  export default{
      name: 'v-gods',
      data() {
          return {
              goods: [],
              scrollY: 0,
              heightArr: [],
              menuIndex: 0,
              showDetail: false,
              selectedFood: {}
          };
      },
      props: {
          seller: Object
      },
      created() {
        this.$http.get('/api/goods').then((resp) => {
            if (resp.body.errorNo === 0) {
                this.goods = resp.body.data;
                this.$nextTick(() => {
                  this._initScroll();
                  this._calcHeight();
              });
            }
        });
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      },
      methods: {
          _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
                click: true,
                probeType: 3
            });
            this.goodsScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y));
            });
          },
          _calcHeight() {
            let itemList = this.$refs.itemList;
            let height = 0;
            this.heightArr.push(height);
            for (let i = 0; i < itemList.length; i++) {
              this.heightArr.push(height += itemList[i].clientHeight);
            }
          },
        selectMenu(index, event) {
          this.goodsScroll.scrollToElement(this.$refs.itemList[index], 300);
          this.menuIndex = index;
        },
        increaseFn(el) {
          this.$refs.shopcart._drop(el);
        },
        showDeatil(food) {
          this.selectedFood = food;
          this.showDetail = true;
          if (!this.detailScroll) {
            this.$nextTick(() => {
              this.detailScroll = new BScroll(this.$refs.foodDetail, {
                click: true
              });
            });
          } else {
            this.$nextTick(() => {
              this.detailScroll.refresh();
            });
          }
        },
        hideDetail() {
            this.showDetail = false;
        }
      },
      computed: {
        _calcActive() {
          for (let i = 0; i < this.heightArr.length; i++) {
            let prevHeight = this.heightArr[i];
            let nextHeight = this.heightArr[i + 1];
            if (!nextHeight || (this.scrollY >= prevHeight && this.scrollY <= nextHeight)) {
              this.menuIndex = i;
              return i;
            }
          }
          this.menuIndex = 0;
          return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach(item => {
                item.foods.forEach(food => {
                   if (food.count) {
                     foods.push(food);
                   } ;
                });
            });
            return foods;
        }
      },
      components: {
        CartControl,
        Shopcart,
        Food
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .goods
    position: absolute
    left:0
    right:0
    top:175px
    bottom:58px
    display:flex
    .menu-wrapper
      flex:0 0 80px
      overflow:hidden
      background:#f3f5f7
      .menu-item
        line-height:54px
        display:table
        width:56px
        height:54px
        padding:0 12px
        &.active
          background:#fff
        .icon
          width:12px
          height:12px
          margin-right:2px
          display:inline-block
          background-size:12px 12px
          &.decrease
            bg-image('images/decrease_3')
          &.discount
            bg-image('images/discount_3')
          &.guarantee
            bg-image('images/guarantee_3')
          &.invoice
            bg-image('images/invoice_3')
          &.special
            bg-image('images/special_3')
        .text
          font-size:12px
          line-height 12px
          width:56px
          display:table-cell
          vertical-align:middle
    .goods-wrapper
      flex:1
      overflow:hidden
      .good-type
        background:#f3f5f7
        height:26px
        line-height:26px
        padding-left:14px
        font-size: 12px
        color: rgb(147, 153, 159)
        border-left:2px solid #d9dde1
      .food-item
        display:flex
        margin:18px
        padding-bottom:18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .icon
          width:57px
          height:57px
          margin-right:10px
        .content
          flex:1
          .name
            font-size: 14px
            color:rgb(7,17,27)
            line-height:14px
          .desc
            font-size:10px
            color:#d2d2d2
            line-height:10px
            margin-top:8px
            line-height:14px
          .extra
            font-size:10px
            color:#d2d2d2
            line-height:10px
            margin-top:8px
          .bot
            margin-top:8px
          .price
            color:red
            font-weight:700
            display:inline-block;
            .now
              font-size:14px
            .old
              font-size:10px
              color:#d2d2d2
              margin-left:4px
              text-decoration:line-through
          .cartControlWrapper
            float:right
            margin-top:-5px
    .foodDtailWrapper
      position:fixed
      top:0
      left:0
      bottom:56px
      width:100%
      background:#fff
      overflow:hidden
      transition:transform .4s linear
      &.fade-foodDeatail-enter-active,&.fade-foodDeatail-leave
        transform:translate3d(0,0,0)
      &.fade-foodDeatail-enter,&.fade-foodDeatail-leave-active
        transform:translate3d(100%,0,0)

</style>
