<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/header/Header';
  export default {
    name: 'app',
    components: {'v-header': Header},
    data() {
        return {
            seller: {}
        };
    },
    created() {
        this.$http.get('/api/seller').then((resp) => {
            if (resp.body.errorNo === 0) {
              this.seller = resp.body.data;
            }
          });
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl";
  @import "common/stylus/base.styl";
  .tab{
    display: flex;
    width:100%;
    border-1px(rgba(7,17,27,0.1));
    .tab-item{
      flex: 1;
      height:40px;
      line-height: 40px;
      text-align:center;
      & .active{
        color: rgb(240,20,20);
      }
    }
  }

</style>
