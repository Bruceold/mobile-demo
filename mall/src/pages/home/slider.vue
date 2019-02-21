<template>
  <div class="slider-wraper">
	<meLoading v-if="!sliders.length"></meLoading>
	<meSlider :direction="direction" :loop="loop" :interval="interval" :pagination="pagination" :data="sliders" v-else>
      <swiperSlide v-for="(item,index) in sliders" :key="index">
		<a href="#" class="slider-link">
		  <img :src="item.picUrl" class="slider-img">
		</a>
	  </swiperSlide>
	</meSlider>
  </div>
</template>
<script>
  import meSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config.js';
  import {getHomeSlider} from 'api/home';
  import meLoading from 'base/loading'
  export default{
	name: 'HomeSlider',
	components: {
	  meSlider,
	  swiperSlide,
	  meLoading
	},
	created(){
	  this.getSliders()
	},
	methods:{
	  //API接口
	  update(){
	  	return this.getSliders();
	  },
	  getSliders(){
		return getHomeSlider().then(data => {
		  this.sliders = data
		})
	  }
	},
	data(){
	  return{
		direction: sliderOptions.direction,
	    loop: sliderOptions.loop,
	    interval: sliderOptions.interval,
	    pagination: sliderOptions.pagination,
	    sliders: []
	  }
	}
  }
</script>
<style lang="scss" scoped>
  .slider-wraper{
	height: 183px;
  }
  .slider-link{
	display: block;
  }
  .slider-link,.slider-img{
	width: 100%;
	height: 100%;
  }	
</style>