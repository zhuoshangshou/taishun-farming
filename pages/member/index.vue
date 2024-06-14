<template>
	<view class="content-box">
		<view class="page-content-box" v-if="userInfo.id">
				<imgLoading :isMore="true" v-if="loading" />
				<view class="info-card" >
					<view class="portrait">
						<button open-type="chooseAvatar" class="pos-btn" @chooseavatar="handleAvatar">
							<image :src="userInfo.portrait" mode="widthFix" show-menu-by-longpress class="pic"></image>
						</button>
					</view>
					<view class="fitem">
						<input type="nickname" class="ipt" :value="userInfo.name" placeholder="请填写昵称" @blur="blurNickName" @nicknamereview="handleNicknamereview"> 
					</view>
					<view class="fitem">
						<input type="text" class="ipt" v-model="userInfo.mobile" placeholder="请填写手机号"> 
						<!-- <button open-type="getPhoneNumber" class="g-btn ipt-btn" @getPhoneNumber="handleGetMobile">获取手机号</button> -->
					</view>
					<view class="btn-bar">
						<button class="g-btn" @click="updataUser">更新信息</button>
					</view>
				</view>
		</view>
		<gTabsBar :current="4" />
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import gTabsBar from '@/components/gTabsBar'
	import imgLoading from '@/components/imgLoading'
	
	export default {
		components: {
			gTabsBar,imgLoading
		},
		data() {
			return {
				loading:true,
				userInfo: {}
			}
		},
		onLoad() {
			this.autoLogin()
		},
		mounted() {
			
		},
		methods: {
			autoLogin(){
				const that = this;
				const storage_token = uni.getStorageSync('token');
				if(storage_token){
					that.pageFetch()
					return false;
				}
				uni.login({
				  async success (res) {
				    if (res.code) {
					 const {data} = await apiCommon.wxappLogin({openid: res.code})
					 //console.log('登录 token！',data)
					 if(data.token){
						uni.setStorageSync('token',data.token)
						that.pageFetch()
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
				}catch(err){
					console.log('pageFetch err',err)
					this.$data.loading = false;
					//throw err;
				}
			},
			handleAvatar(e){
				const {avatarUrl} = e.detail;
				this.$data.userInfo.portrait = avatarUrl;
				console.log('handleAvatar',e)
			},
			blurNickName(e){
				console.log('blurNickName',e)
				const {value} = e.detail;
				this.$data.userInfo.name = value;
			},
			handleNicknamereview(e){
				console.log('handleNicknamereview',e)
			},
			handleGetMobile(e){
				console.log('handleGetMobile',e)
			},
			async updataUser(){
				const {userInfo} = this.$data;
				//console.log('updataUser userInfo',userInfo)
				const res = await apiCommon.upUserInfo(userInfo)
				//console.log('updataUser res',res)
				if(res.code==200){
					uni.showToast({
						title: '更新成功',
						icon:'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>