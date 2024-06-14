<template>
	<view class="content-box">
		<scroll-view class="g-page-scroll"  type="list"  :scroll-y="true" >
		<view class="box-wrap">
			<view class="charts-wrap">
				<qiun-data-charts class="charts-box" type="line" :opts="opts" :chartData="chartData" />
			</view>
			<view class="shop-list-bar" v-if="shopList.length">
				<view class="now-tea-bay" v-if="nowTeaBay.length">
					<view class="title">收购价格</view>
					<view class="tea-wrap">
						<view class="item" v-for="(item,index) in nowTeaBay" :key="index">
							<view class="price">{{item.price}}</view>
							<view class="tea">{{item.name}}/斤</view>
						</view>
					</view>
				</view>
				
				<swiper class="swiperbar" :display-multiple-items="multipleNum" >
					<swiper-item class="shop-item" v-for="(item,index) in shopList" :key="index" @click="handleItem(item)">
						<gShopItem :shopact="item.id==tabsId"  :item="item"  />
					</swiper-item>
				</swiper>
				
				<view class="shop-info">
					<view class="item" @click="handleOenMap">
						<text class="icon-font iconfont-address"></text>
						<text class="text">{{shopInfo.address}}</text>
					</view>
					<view class="item" @click="handleMobile(shopInfo.shopMobile)">
						<text class="icon-font iconfont-mobile"></text>
						<text class="text">{{shopInfo.shopMobile}}</text>
					</view>
				</view>
				
				<view class="btn-bar" v-if="shopInfo.id">
					<button class="g-btn" @click="handleToUrl">了解更多</button>
				</view>
			</view>
		</view>
		</scroll-view>
		<gTabsBar :current="2" />
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import utils from '@/utils/index.js'
	import gTabsBar from '@/components/gTabsBar'
	import gShopItem from '@/components/gShopItem'
	import imgLoading from '@/components/imgLoading'
	import gTabs from '@/components/gTabs'
	export default {
		components: {
			gTabsBar,gShopItem,imgLoading,gTabs
		},
		data() {
			return {
				loading:true,
				shopList:[],
				multipleNum:1,
				tabsId:null,
				chartData: {},
				shopInfo:{},
				nowTeaBay:[],
				opts: utils.chartsDefaultOpt
			}
		},
		onLoad() {
		},
		mounted() {
			this.fetchCategory()
		},
		methods: {
			//获取门店
			async fetchCategory(){
				try{
					const {list} = await apiCommon.getShopList({enabled:1});
					var multipleNum = list.length;
					if(list && list.length){
						if(multipleNum>2){
							multipleNum = 2.2
						}
						this.$data.tabsId = list[0].id;
						this.$data.shopInfo = list[0];
						this.$data.multipleNum = multipleNum;
						//console.log('pageFetch multipleNum',multipleNum)
						this.pageFetch()
					}
					this.$data.shopList = list;
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			async pageFetch(){
				try{
					const {tabsId} = this.$data;
					this.$data.loading = true;
					//return false;
					var params = {shop_id:tabsId}
					const {data} = await apiCommon.getMarketTea(params);
					//console.log('pageFetch data',data)
					var now_tea_bay = []
					var charts_data = {}
					if(data.length){
						let tea_buy = data[data.length-1].tea_buy;
						//console.log('pageFetch tea_buy',tea_buy)
						now_tea_bay = JSON.parse(tea_buy)
						charts_data = utils.resetChartsData(data)
					}
					//console.log('pageFetch charts_data',charts_data)
					this.$data.chartData = charts_data;
					this.$data.nowTeaBay = now_tea_bay;
					this.$data.loading = false;
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			//分类点击回调
			handleItem(item){
				//console.log('handleItem',item)
				this.$data.tabsId = item.id; 
				this.$data.shopInfo = item;
				this.$data.nowTeaBay = []
				this.pageFetch()
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
			},
			//打开详情
			handleToUrl(){
				const {shopInfo} = this.$data;
				uni.navigateTo({
					url:'/pages/market/shop?id='+shopInfo.id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>