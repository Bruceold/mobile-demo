<template>
  <div class="result">
  	<div class="loading-container" v-show="loading">
  	  <me-loading/>
  	</div>
  	<ul class="g-list" v-show="!loading && result.length">
  	  <li 
  	    class="g-list-item"
  	    v-for="(item,index) in result"
  	    :key="index"
  	    @click="$_selectItem(item[0])"
  	  >
  	    <span class="g-list-text">{{item[0]}}</span>
  	  </li>
  	</ul>
  	<div class="no-result" v-show="!loading && !result.length">没有结果</div>
  </div>
</template>
<script>
  import MeLoading from 'base/loading';
  import {getSearchResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';
  export default {
  	name: 'SearchResult',
  	data() {
  	  return {
  	    result: [],
  	    loading: false
  	  }
  	},
  	components: {
  	  MeLoading
  	},
  	mixins: [searchMixin],
  	created() {
  	  this.getResult();
  	},
  	methods: {
  	  getResult(keyword) {
  	    if (!keyword) {
  	      return;
  	    }
  	    this.loading = true;
  	    getSearchResult(keyword).then(data => {
  	      if (data) {
  	      	this.loading = false;
  	      	this.result = data;
  	      }
  	    });
  	  }
  	},
  	props: {
  	  query: {
  	  	type: String,
  	  	default: ''
  	  }
  	},
  	watch: {
  	  query(val) {
  	  	this.getResult(val);
  	  }
  	}
  }
</script>
<style lang="scss" scoped>
	
</style>