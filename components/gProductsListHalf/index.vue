<template>
	<view class="g-products-list half">
		<view v-for="(item,index) in list" :key="index" @click="handleItem(item)">
			<gProducts :item="item" :numName="numName" :numKey="numKey"  /> 
		</view>
	</view>
</template>

<script>
import gProducts from '@/components/gProducts'
export default {
  name: 'general products list half',
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
	  		var url = `/pages/product/index?id=${item.id}&dialog_type=half`;
			uni.setStorageSync('productDetail',item)
	  		// 使用自定义路由
	  		wx.navigateTo({
	  		  url,
	  		  routeType: 'HalfScreenDialog'
	  		})
	  		//使用预置路由
	  		// uni.navigateTo({
	  		// 	url: `/pages/product/index?id=${item.id}`,
	  		// 	//routeType: 'wx://cupertino-modal-inside',
	  		// 	routeType: 'wx://zoom',
	  		// 	routeConfig: {
	  		// 	    fullscreenDrag: true,
	  		// 	    popGestureDirection: 'vertical'
	  		// 	}
	  		// });
	  },
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>