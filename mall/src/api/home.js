import axios from 'axios';
import {SUCC_CODE,TIMEOUT,HOME_RECOMMEND_PAGE_SIZE,jsonpOptions} from './config.js';
import jsonp from 'assets/js/jsonp.js';


// 获取轮播图后台数据
const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let rndNum;
  while(i--){
  	if(i !== (rndNum = Math.floor(Math.random()*arrLength))){
  	  [arr[i],arr[rndNum]] = [arr[rndNum],arr[i]]
  	}
  }
  return arr;
};
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider',{
	timeout: TIMEOUT
  }).then(res => {
	if(res.data.code === SUCC_CODE){
	  let sliders = res.data.slider;
	  const slider = [sliders[Math.floor(Math.random()*sliders.length)]];
	  sliders = shuffle(sliders.filter(() => Math.random() >= 0.5));
	  if(sliders.length === 0){
	  	sliders = slider;
	  }
	  return sliders;
	};
	  throw new Error('没有成功获取到数据')
	}).catch(err => {
	  if(err){
		console.log(err);
	  }
	  return [{
		linkUrl: 'http://www.imooc.com',
		picUrl: require('assets/img/404.png')
	  }]
	});
}


// 热门推荐获取数据
export const getHomeRecommend = (page = 1,psize = 20) =>{
  const url = 'http://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
	page,
	psize,
	type:0,
	frontCatId: ''
  };
  return jsonp(url,params,jsonpOptions).then(res => {
	if(res.code === '200'){
	  return res
	}
	throw new Error('没有成功获取到数据');
	}).catch(err => {
	  console.log(err)
	});
}







