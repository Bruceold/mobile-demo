<template>
  <meNavbar class="header" v-show="visible">
	<i class="iconfont icon-scan" slot="left"></i>
	<meSearcbox 
	  slot="center" 
	  placeholder="开学季有礼，全场5折起" 
	  @query="getQuery"
	  :fake="true"
	  @click.native="goToSearch"
	/>
	<i class="iconfont icon-msg" slot="right"></i>
  </meNavbar>
</template>
<script>
  import meNavbar from 'base/navbar';
  import meSearcbox from 'base/search-box';
  export default{
	name: 'HomeHeader',
	components: {
	  meNavbar,
	  meSearcbox
	},
	data(){
	  return{
	  	visible: true
	  }
	},
	methods:{
	  show(){
	  	this.visible = true;
	  },
	  hide(){
	  	this.visible = false;
	  },
	  getQuery(query){
	  	console.log(query)
	  },
	  goToSearch() {
	  	this.$router.push('./search');
	  }
	}
  }
</script>
<style scoped lang="scss">
  @import '~assets/scss/mixins';
  .header{
	&.mine-navbar{
	  background-color: transparent;
	  transition: background-color 0.5s;
	}
	&.header-transition{
		background-color: $header-bgc-translucent;
	}
  }
  .iconfont{
	color: $icon-color-default;
	font-size: $icon-font-size;
  }
</style>