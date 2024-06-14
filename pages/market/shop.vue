<template>
	<view class="content-box full">
		<view class="back-bar">
			<gBack :dark="true" />
		</view>
		<scroll-view class="g-page-scroll"  type="list"  :scroll-y="true" >
		<view class="box-wrap">
			
			<view class="shop-info">
				<view class="item">
					<text class="title">{{shopInfo.shopName}}</text>
				</view>
				<view class="item" @click="handleOenMap">
					<text class="icon-font iconfont-address"></text>
					<text class="text">{{shopInfo.address}}</text>
				</view>
				<view class="item" @click="handleMobile(shopInfo.shopMobile)">
					<text class="icon-font iconfont-mobile"></text>
					<text class="text">{{shopInfo.shopMobile}}</text>
				</view>
			</view>
			
			<view class="charts-wrap">
				<view class="title">收购量</view>
				<qiun-data-charts class="charts-box" type="column" :opts="columnopts" :chartData="columnChartData" />
			</view>
			
			<view class="now-tea-bay mtop" v-if="nowTeaBay.length">
				<view class="title">收购价格</view>
				<view class="tea-wrap">
					<view class="item" v-for="(item,index) in nowTeaBay" :key="index">
						<view class="price">{{item.price}}</view>
						<view class="tea">{{item.name}}/斤</view>
					</view>
				</view>
			</view>
			
			<view class="charts-wrap">
				<qiun-data-charts class="charts-box" type="line" :opts="opts" :chartData="chartData" />
			</view>
			
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import utils from '@/utils/index.js'
	import imgLoading from '@/components/imgLoading'
	import gBack from '@/components/gBack'
	export default {
		components: {
			imgLoading,gBack
		},
		data() {
			return {
				id:null,
				loading:true,
				chartData: {},
				columnChartData: {},
				shopInfo:{},
				nowTeaBay:[],
				opts: utils.chartsDefaultOpt,
				columnopts: utils.columnDefaultOpt
			}
		},
		onLoad(option) {
			const {id, dialog_type} = option;
			//console.log('onLoad option',option)
			this.$data.id = id;
		},
		mounted() {
			this.fetchCategory()
			//console.log('utils',utils)
		},
		methods: {
			//获取门店
			async fetchCategory(){
				try{
					const {id} = this.$data;
					const {data} = await apiCommon.getShopInfo({id});
					this.$data.shopInfo = data;
					this.pageFetch()
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			async pageFetch(){
				try{
					const {id} = this.$data;
					this.$data.loading = true;
					//return false;
					var params = {shop_id:id}
					const {data} = await apiCommon.getMarketTea(params);
					//console.log('pageFetch data',data)
					var now_tea_bay = []
					var charts_data = {}
					var columnChartData = {}
					if(data.length){
						let tea_buy = data[data.length-1].tea_buy;
						//console.log('pageFetch tea_buy',tea_buy)
						now_tea_bay = JSON.parse(tea_buy)
						charts_data = utils.resetChartsData(data)
						columnChartData = utils.resetColumnChartsData(now_tea_bay)
					}
					//console.log('pageFetch charts_data',charts_data)
					this.$data.chartData = charts_data;
					this.$data.columnChartData = columnChartData;
					this.$data.nowTeaBay = now_tea_bay;
					this.$data.loading = false;
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			//电话
			handleMobile(phoneNumber){
				uni.makePhoneCall({phoneNumber});
			},
			//打开地图
			handleOenMap(){
				const {shopInfo} = this.$data;
				if(!shopInfo.shop_coord){
					console.log('未填写坐标',shopInfo)
					return false;
				}
				var params = utils.resLocationParms(shopInfo)
				uni.openLocation(params)
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>