<template>
	<view class="g-banner">
		<view class="wrap" v-if="list && list.length>1">
			<view class="swiper-bg">
				<image :src="list[0].img" mode="widthFix" class="pic"></image>
			</view>
			<swiper 
				class="swiperbar" 
				circular 
				:indicator-dots="indicatorDots" 
				:autoplay="autoplay" 
				:interval="interval"
				:duration="duration">
					<swiper-item v-for="(item,index) in list" :key="index">
						<image :src="item.img" mode="widthFix" class="pic"></image>
					</swiper-item>
			</swiper>
		</view>
		<view class="wrap" v-else-if="list && list.length==1">
			<image :src="list[0].img" mode="widthFix" class="pic"></image>
		</view>
		<view class="wrap default" v-else></view>
	</view>
</template>

<script>
export default {
  name: 'general banner',
  props: ['list'],
  data(){
  	return{
		indicatorDots:false,
		autoplay:true,
		interval:5000,
		duration:500
	}
  },
  mounted(){
	//console.log('banner this',this.$props)
  },
  methods:{
	  handleItem(item){
		console.log('banner handleItem',item)
	  },
	  handleMobile(phoneNumber){
		  uni.makePhoneCall({phoneNumber});
	  }
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>