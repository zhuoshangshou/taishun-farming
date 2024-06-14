<template>
	<view :class="['g-shop-bar',shopact?'active':'']">
		<view class="info">{{item.shopName}}</view>
	</view>
</template>

<script>

export default {
  name: 'general shop item',
  props: ['item','shopact'],
  data(){
  	return{
		buttonStyle:{},
		backHome:false
	}
  },
  mounted(){
	  //console.log('tabs this',this.$props)
  },
  methods:{
	
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>