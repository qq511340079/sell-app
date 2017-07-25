import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/Goods';
import Rating from '@/components/rating/Rating';
import Seller from '@/components/seller/Seller';
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/rating',
      name: 'rating',
      component: Rating
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
});
router.push('/goods');
export default router;
