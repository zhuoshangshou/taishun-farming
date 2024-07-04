<template>
	<view class="content-box">
		<view class="page-content-box" v-if="userInfo.id">
				<imgLoading :isMore="true" v-if="loading" />
				<view class="info-card" >
					<view class="info">
						<view class="name">{{userInfo.name}}</view>
						<view class="mobile">{{userInfo.mobile}}</view>
					</view>
					<view class="portrait" v-if="userInfo.portrait">
						<image :src="userInfo.portrait" mode="widthFix" show-menu-by-longpress class="pic"></image>
					</view>
				</view>
				
				<view class="menu-wrap">
					<view class="item" v-for="(item,index) in menuList" :key="item" @click="handlePage(item.url)">
						<view class="bar">
							<text class="name">{{item.name}}</text>
							<view class="pic"></view>
						</view>
					</view>
				</view>
		</view>
		<gTabsBar :current="4" />
	</view>
</template>

<script>
	import {useStore} from 'vuex' 
	import apiCommon from '@/api/common';
	import gTabsBar from '@/components/gTabsBar'
	import imgLoading from '@/components/imgLoading'
	import storeUtils from '@/utils/storeUtils';
	export default {
		components: {
			gTabsBar,imgLoading
		},
		data() {
			return {
				loading:true,
				userInfo: {},
				menuList:[
					{name:'聊天室',url:'/pages/message/index'},
					{name:'个人中心',url:'/pages/member/info'},
					{name:'车牌登记',url:'/pages/licence/index'}
				]
			}
		},
		onLoad() {
		},
		onShow() {
			//console.log('App Show')
			this.autoLogin()
		},
		mounted() {
			
		},
		methods: {
			autoLogin(){
				const that = this;
				const store = useStore();
				const storage_token = uni.getStorageSync('token');
				const store_user_info = store.getters.getUserInfo;
				if(storage_token){
					if(store_user_info){
						this.$data.userInfo = store_user_info;
						//console.log('store',store_user_info);
					}
					this.$data.loading = false;
					console.log('已登录！');
					return false;
				}
				uni.login({
				  async success (res) {
				    if (res.code) {
					 const {data} = await apiCommon.wxappLogin({openid: res.code})
					 //console.log('登录 token！',data)
					 if(data.token){
						uni.setStorageSync('token',data.token)
						that.$nextTick(()=>{
							that.pageFetch()
						})
					 }
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
			},
			async pageFetch(){
				try{
					this.$data.loading = true;
					//return false;
					const {data} = await apiCommon.getUserInfo();
					//console.log('pageFetch data',data)
					this.$data.userInfo = data;
					this.$data.loading = false;
					storeUtils.setStoreUserInfo(data)
				}catch(err){
					console.log('pageFetch err',err)
					this.$data.loading = false;
					//throw err;
				}
			},
			handlePage(url){
				uni.navigateTo({
					url
				})
			}
			
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>