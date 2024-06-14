<template>
	<view :class="['content-box',dialog_type]">
		<scroll-view class="g-page-scroll" type="list" :scroll-y="true" :show-scrollbar="false" associative-container="pop-gesture">
			<view class="page-content-box">
				<imgLoading :isMore="true" v-if="loading" />
				<block v-else>
					<view class="back-bar">
						<gBack :dialogType="dialog_type" />
					</view>

					<view>
						<gSwiper :list="productInfo.imgs" />
					</view>
					<view class="base-info">
						<view class="num-bar">
							<view class="txt"></view>
							<view class="num">
								<text class="price">{{productInfo.unitPrice}}</text>
								<text class="unit">/斤</text>
							</view>
						</view>
						
						<view class="title">
							{{productInfo.title}}
						</view>
						<view class="subtitle" v-if="productInfo.period">
							{{productInfo.period}}：{{productInfo.type=='procure'?productInfo.purchase:productInfo.output}} kg
						</view>
						<view class="info">
							<view class="text">
								{{productInfo.shopName}}
							</view>
							<view class="text">
								{{productInfo.contactName}}
							</view>
							<view class="text" @click="handleMobile(productInfo.shopMobile)">
								<text class="icon-font iconfont-mobile"></text>
								<text>{{productInfo.shopMobile}}</text>
							</view>
						</view>
					</view>
					
					<view class="details">
						<view class="desc">{{productInfo.desc}}</view>
						<view class="video" v-if="productInfo.video">
							<video
							class="g-video"
							:src="productInfo.video"
							object-fit='cover'
							controls
							/>
						</view>
					</view>
					
				</block>
			</view>
		</scroll-view>
		<view class="btn-bar fixed" v-if="!loading" >
			<button class="g-btn" @click="handleCheckbox">联系我们</button>
		</view>
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import imgLoading from '@/components/imgLoading'
	import gSwiper from '@/components/gSwiper'
	import gBack from '@/components/gBack'
	import {installRouteBuilder} from "@/custom-route/index.js"
	export default {
		components: {
			imgLoading,gSwiper,gBack
		},
		data() {
			return {
				id:null,
				productInfo: {},
				loading:true,
				dialog_type:null
			}
		},
		onLoad(option) {
			const {id, dialog_type} = option;
			console.log('onLoad option',option)
			this.$data.id = id;
			this.$data.dialog_type = dialog_type;
			installRouteBuilder()
		},
		mounted() {
			this.pageFetch()
		},
		methods: {
			//页面配置
			async pageFetch(){
				try{
					const {id} = this.$data;
					var storageDetail = uni.getStorageSync('productDetail');
					var parasm = {id}
					var productInfo = storageDetail
					
					//return false;
					this.$data.loading = true;
					if(!productInfo.imgs){
						productInfo.imgs = [productInfo.img]
					}
					//const {data} = await apiCommon.getProduct(parasm);
					//console.log('pageFetch productInfo',!productInfo.imgs,productInfo)
					this.$data.productInfo = productInfo;
					this.$data.loading = false;
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			handleHorizontalDrag(){
				'worklet';
				const { startUserGesture } = this.customRouteContext;
				console.log('pageDragGesture evt')
				startUserGesture();
			},
			handleMobile(phoneNumber){
				uni.makePhoneCall({phoneNumber});
			},
			handleCheckbox(){
				// uni.redirectTo({
				// 	url: `/pages/checkbox/index`
				// });
				//使用预置路由
				uni.navigateTo({
					url: `/pages/contact/index?dialog_type=half`,
					//routeType: 'wx://cupertino-modal-inside',
					routeType: 'HalfScreenDialogLucency'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>
