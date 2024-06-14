<template>
	<view class="g-products-list">
		<view v-for="(item,index) in list" :key="index">
			<open-container
			  closed-elevation="#000000"
			  :closed-border-radius="10"
			  :open-elevation="10"
			  :open-border-radius="10"
			  :transition-duration="500"
			  @tap="handleItem(item)"
			>
				<gProducts :item="item" :numName="numName" :numKey="numKey"  /> 
			</open-container>
		</view>
	</view>
</template>

<script>
import gProducts from '@/components/gProducts'
export default {
  name: 'general products list',
  props: ['list','numName','numKey'],
  components: {
  	gProducts
  },
  data(){
  	return{
	}
  },
  mounted(){
	//console.log('products this')
	
  },
  methods:{ 
	  handleItem(item){
	  		console.log('products handleItem',item)
			uni.setStorageSync('productDetail',item)
	  		// 使用自定义路由
	  		wx.navigateTo({
	  		  url:`/pages/product/index?id=${item.id}`
	  		})
	  },
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>