<template>
	<view :class="['content-box',dialog_type]">
		<view class="back-bar" v-if="dialog_type">
			<gBack :dialogType="dialog_type" :dark="true" />
		</view>
		<view class="page-content-box">
				<imgLoading :isMore="true" v-if="loading" />
				<view class="info-card" v-else>
					<view class="portrait">
						<image :src="shopInfo.shopPortrait" mode="widthFix" show-menu-by-longpress class="pic"></image>
					</view>
					<view class="title">{{shopInfo.shopName}}</view>
					<view class="mobile" v-if="shopInfo.shopMobile">
						<text class="icon-font iconfont-mobile"></text>
						<text class="text">{{shopInfo.shopMobile}}</text>
					</view>
					<view class="btn-bar" @click="handleMobile(shopInfo.shopMobile)" v-if="shopInfo.shopMobile">
						<button class="g-btn">联系我们</button>
					</view>
				</view>
			
		</view>
		<gTabsBar :current="3" />
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import gTabsBar from '@/components/gTabsBar'
	import imgLoading from '@/components/imgLoading'
	import gBack from '@/components/gBack'
	export default {
		components: {
			gTabsBar,imgLoading,gBack
		},
		data() {
			return {
				loading:true,
				shopInfo: {},
				dialog_type:null,
			}
		},
		onLoad(option) {
			const {dialog_type} = option;
			//console.log('onLoad option',option)
			this.$data.dialog_type = dialog_type;
		},
		mounted() {
			this.pageFetch()
		},
		methods: {
			async pageFetch(){
				try{
					this.$data.loading = true;
					//return false;
					const {data} = await apiCommon.getShopInfo();
					//console.log('pageFetch data',data)
					this.$data.shopInfo = data;
					this.$data.loading = false;
				}catch(err){
					console.log('pageFetch err',err)
					this.$data.loading = false;
				}
			},
			handleMobile(phoneNumber){
				uni.makePhoneCall({phoneNumber});
			},
			handlePan(){
				"worklet";
				console.log('handlePan');
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>