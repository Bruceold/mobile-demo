import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('pages/home/index.vue'),
      children: [
        {
        	path: 'product/:id',
          name: 'home-product',
          component: () => import('pages/product/index.vue')
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('pages/cart/index.vue'),
    },
    {
      path: '/category',
      name: 'category',
       component: () => import('pages/category/index.vue'),
    },
    {
      path: '/personal',
      name: 'personal',
       component: () => import('pages/personal/index.vue'),
    },
    {
      path: '/search',
      name: 'search',
       component: () => import('pages/search/index.vue'),
    },
    {
    	path: '*',
    	redirect: '/home'
    }
  ]
});
