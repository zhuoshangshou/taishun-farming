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
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import imgLoading from '@/components/imgLoading';
	import storeUtils from '@/utils/storeUtils';
	
	export default {
		components: {
			imgLoading
		},
		data() {
			return {
				loading:true,
				userInfo: {}
			}
		},
		onShow() {
			this.pageFetch()
		},
		mounted() {
			
		},
		methods: {
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
				this.upavatar()
			},
			upavatar(){
				const {portrait} = this.$data.userInfo;
				const filesManager = uni.getFileSystemManager();
				var item_format = portrait.split('.')[1];
				var format = 'image/'+item_format;//image/jpeg
				var filename = 'image-'+new Date().getTime()+'.'+item_format;
				//console.log('图片 format', format,filename);
				filesManager.readFile({
				  filePath: portrait, // 图片文件路径
				  encoding: 'base64', // 指定编码格式为base64
				  success: res => {
					//console.log('图片res', res);
					//var filebase = 'data:'+format+';base64,'+res.data;
					var filebase = res.data;
				    //console.log('图片的base64为:filebase', filebase); // 输出图片的base64字符串
					const uploadTask = uni.uploadFile({
					  url: process.env.BASE_API_URL+'/upcosfiles', // 你的上传API地址
					  filePath: portrait,
					  name: 'file_portrait', // 这里根据API的要求来定义
					  formData: {
					  	'filebase': filebase,
						'filename':filename
					  },
					  success: uploadRes => {
						const {data} = JSON.parse(uploadRes.data) ;
					    //console.log('res_portrait',data,uploadRes.data);
						this.$data.userInfo.portrait = data
					    // 处理上传成功的结果
					  },
					  fail: uploadError => {
					    // 处理上传失败的错误
					  }
					});
					// 可选：监听上传进度变化
					// uploadTask.onProgressUpdate(progressEvent => {
					//   console.log('上传进度' + progressEvent.progress);
					// });
				  },
				  fail: err => {
				    console.error('读取文件失败:', err);
				  }
				});    
				
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
				if(res.code==200){
					storeUtils.setStoreUserInfo(userInfo)
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
	@import "./info.scss";
</style>