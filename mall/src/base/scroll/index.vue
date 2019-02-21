<template>
  <swiper :options="swiperOptions" ref="swiper">
	<div class="mine-scroll-pull-down" v-if="pullDown">
	  <meLoading :text="pullDownText" inline ref="pullDownLoading"></meLoading>
	</div>
	<swiperSlide>
	  <slot></slot>
	</swiperSlide>
	<div class="mine-scroll-pull-up" v-if="pullUp">
	  <meLoading :text="pullUpText" inline ref="pullUpLoading"></meLoading>
	</div>
	<div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>
<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import meLoading from 'base/loading';
  import {
	PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END} from './config.js';
  export default{
	name: 'MeScroll',
	created(){
		this.init();
	},
	components:{
	  swiper,
	  swiperSlide,
	  meLoading
    },
	props:{
	  scrollbar: {
		type: Boolean,
		default: true
	  },
	  data: {
		type: [Array,Object]
	  },
	  pullDown: {
		type:Boolean,
		default: false
	  },
	  pullUp: {
	  	type: Boolean,
	  	default: false
	  }
	},
	watch: {
	  data(){
		this.update();
	  }
	},
	methods: {
	  init(){
	  	this.pulling = false;
		this.pullDownText = PULL_DOWN_TEXT_INIT;
		this.pullUpText = PULL_UP_TEXT_INIT;
		this.swiperOptions = {
		  direction: 'vertical',
		  slidesPerView: 'auto',
		  freeMode: true,
		  setWrapperSize: true,
		  scrollbar: {
			el: this.scrollbar?'.swiper-scrollbar':null,
			hide: true
		  },
		  on:{
		    sliderMove: this.scroll,
		    touchEnd: this.touchEnd,
		    transitionEnd: this.scrollEnd
		  }
		}
	  },
	  scrollToTop(){
	  	this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0);
	  },
	  update(){
	  	this.$nextTick(() => {
	  	  this.$refs.swiper && this.$refs.swiper.swiper.update();
	  	});
	  },
	  scrollEnd(){
	  	this.$emit('scroll-end',this.$refs.swiper.swiper.translate,this.$refs.swiper.swiper,this.pulling);
	  },
	  scroll(){
	    const swiper = this.$refs.swiper.swiper;
	    this.$emit('scroll',swiper.translate,this.$refs.swiper.swiper);
	    if(this.pulling){
	      return
	    };
	  	if(swiper.translate > 0){
	  	  if(!this.pullDown){
	  	    return;
	  	  };
	  	  if(swiper.translate > PULL_DOWN_HEIGHT){
	  	  	this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
	  	  }else{
	  	    this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
	  	  }
	  	}else if(swiper.isEnd){
	  	  if(!this.pullUp){
	  	  	return;
	  	  }
	  	  const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));
	  	  if(isPullUp){
	  	  	this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START)
	  	  }else{
	  	  	this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT)
	  	  }
	  	}
	  },
	  touchEnd(){
	  	if(this.pulling){
	      return
	    };
	  	const swiper = this.$refs.swiper.swiper;
	  	if(swiper.translate > PULL_DOWN_HEIGHT){
	  	  if(!this.pullDown){
	  	    return;
	  	  }
	  	  this.pulling = true;
	  	  swiper.allowTouchMove  = false; //禁止触摸
	  	  swiper.setTransition(swiper.params.speed);
	  	  swiper.setTranslate(PULL_DOWN_HEIGHT);
	  	  swiper.params.virtualTranslate = true; // 定住不回弹
	  	  this.$refs.pullDownLoading.setText( PULL_DOWN_TEXT_ING);
	  	  this.$emit('pull-down',this.pullDownEnd)
	  	}else if(swiper.isEnd){
	  	  const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
	  	  const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
	  	  if(isPullUp){
	  	  	if(!this.pullUp){
	  	  		return;
	  	  	}
	  	  	this.pulling = true;
	  	  	swiper.allowTouchMove = false;
	  	  	swiper.setTransition(swiper.params.speed);
	  	  	swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
	  	  	swiper.params.virtualTranslate = true;
	  	  	this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
	  	  	this.$emit('pull-up',this.pullUpEnd)
	  	  }
	  	}
	  },
	  pullDownEnd(){
	  	const swiper = this.$refs.swiper.swiper;
	  	this.pulling = false;
	  	this.$refs.pullDownLoading.setText( PULL_DOWN_TEXT_END);
	  	swiper.params.virtualTranslate = false;
	  	swiper.allowTouchMove  = true;
	  	swiper.setTransition(swiper.params.speed);
	  	swiper.setTranslate(0);
	  	setTimeout(() => {
	  		this.$emit('pull-down-transition-end');
	  	},swiper.params.speed);
	  },
	  pullUpEnd(){
	  	const swiper = this.$refs.swiper.swiper;
	  	this.pulling = false;
	  	this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
	  	swiper.params.virtualTranslate = false;
	  	swiper.allowTouchMove  = true;
	  }
	}
  }
</script>
<style lang="scss" scoped>
  .swiper-container{
	overflow: hidden;
	width: 100%;
	height: 100%;
  }
  .swiper-slide{
	height: auto;
  }
  .mine-scroll-pull-down,
  .mine-scroll-pull-up{
	position: absolute;
	left: 0;
	width: 100%;
	
  }
  .mine-scroll-pull-down{
  	bottom: 100%;
  	height: 80px;
  }
  .mine-scroll-pull-up{
  	top: 100%;
  	height: 30px;
  }
</style>