<template>
  <me-navbar class="header">
    <meSearcbox 
      slot="center"
      placeholder="开学季有礼，全场5折起" 
      @query="getQuery"
      :fake="true"
      @click.native="goToSearch"
    />
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>
<script>
  import MeNavbar from 'base/navbar';
  import meSearcbox from 'base/search-box';
  export default {
    name: 'CategoryHeader',
    components: {
      MeNavbar,
      meSearcbox
    },
    methods: {
      getQuery(query){
        console.log(query)
      },
      goToSearch() {
        this.$router.push('./search');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
