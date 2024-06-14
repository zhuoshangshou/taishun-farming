<template>
	<view class="item">
		<view class="picture">
			<image :src="item.img" mode="widthFix" class="pic"></image>
		</view>
	
		<view class="info-bar">
			<view class="title">{{item.name}}</view>
			<view class="info">
				<view class="desc">{{item.shopName}}</view>
				<view class="desc">
					<text class="icon-font iconfont-mobile" @click.stop="handleMobile(item.shopMobile)">{{item.shopMobile}}</text>
					<text>{{resetItemDate(item.date)}}</text>
				</view>
			</view>
			<view class="num-bar">
				<view class="txt" v-if="item.period">{{item.period}}</view>
				<view class="num">{{item.type=='procure'?item.purchase:item.output}}kg</view>
			</view>
		</view>
	</view>
</template>

<script>
import {installRouteBuilder} from "@/custom-route/index.js"
export default {
  name: 'general products',
  props: ['item','numName','numKey','isHalf'],
  data(){
  	return{
	}
  },
  mounted(){
	//console.log('products this')
	installRouteBuilder()
  },
  computed:{
	resetItemDate(){
		return (time)=>{
			var date = new Date(time)
			var str = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
			return str;
		}
	} 
  },
  methods:{
	  handleMobile(phoneNumber){
		  uni.makePhoneCall({phoneNumber});
	  }
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>