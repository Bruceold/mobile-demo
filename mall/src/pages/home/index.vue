<template>
  <div class="home">
	<header class="g-header-container">
	  <homeHeader :class="{'header-transition':isHeaderTransition}" ref="header"/>
	</header>
	<meScroll 
	  :data="recommends" 
	  pullDown 
	  pullUp 
	  @pull-down="pullToRefresh"
	  @pull-up="pullToLoadMore"
	  @scroll-end="scrollend" 
	  @scroll="scroll" 
	  @pull-down-transition-end="pullDownTransitionEnd"
	  ref="scroll"
	>
	  <homeSlider ref="slider"/>
	  <homeNav/>
	  <homeRecommend @loaded="getRecommeds" ref="recommends"/>
	</meScroll>	
	<div class="g-backtop-container">
		<meBacktop :visible="isBacktopVisible" @backtop="back"/>
	</div>
	<router-view/>
  </div>
</template>
<script>
  import homeHeader from './header.vue';
  import homeSlider from './slider.vue';
  import meScroll from 'base/scroll';
  import homeNav from './nav.vue';
  import homeRecommend from './recommend.vue';
  import meBacktop from 'base/backtop';
  import {HEADER_TRANSITION_HEIGHT} from './config.js';
   
  export default{
	name: 'home',
	data(){
	  return{
		recommends: [],
		isBacktopVisible: false,
		isHeaderTransition: true
	  }
	},
	created(){

	},
	components:{
	  homeHeader,
	  homeSlider,
	  meScroll,
	  homeNav,
	  homeRecommend,
	  meBacktop
	},
	methods: {
	  updateScroll(){
	  },
	  changeHeaderStatue(translate){ // 头部变化
	  	if(translate > 0){
	  	  this.$refs.header.hide();
	  	  return;
	  	}
	  	this.$refs.header.show();
	  	this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
	  },
	  scroll(translate){ // 头部变化
	  	this.changeHeaderStatue(translate)
	  },
	  scrollend(translate,scroll,pulling){ //头部变化
	  	if(!pulling){
	  	  this.changeHeaderStatue(translate)
	  	}
	  	this.isBacktopVisible = translate < 0 && -translate > scroll.height;
	  },
	  pullDownTransitionEnd(){
	  	this.$refs.header.show();
	  },
	  back(){ // 返回顶部
	  	this.$refs.scroll && this.$refs.scroll.scrollToTop();
	  },
	  getRecommeds(recommends){ // 加载推荐
		this.recommends = recommends;
	  },
	  pullToRefresh(end){ // 上啦刷新
	  	this.$refs.slider.update().then(end);
	  	// setTimeout(() => {
	  	//   console.log('aaaa')
	  	//   end()
	  	// },1000);
	  },
	  pullToLoadMore(end){ // 下拉加载
	  	this.$refs.recommends.update().then(end).catch(err => {
	  		if(err){
	  		  console.log(err);
	  		}
	  		end();
	  	});
	  }
	}
  }; 
</script>
<style scoped lang="scss">
  @import '~assets/scss/mixins';
  .home{
	overflow: hidden;
	width: 100%;
	height: 100%;
	background-color: $bgc-theme;
  }
</style>