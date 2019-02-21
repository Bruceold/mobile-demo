import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import 'assets/scss/index.scss';
import 'assets/js/rem.js';
import 'swiper/dist/css/swiper.css';
import VueLazyLoad from 'vue-lazyload';


fastclick.attach(document.body);

Vue.use(VueLazyLoad,{
	preLoad: 1,
	error: require('assets/img/error.png'),
	loading: require('assets/img/loading.gif'),
	attempt: 1
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
