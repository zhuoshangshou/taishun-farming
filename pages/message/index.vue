<template>
	<view class="content-box">
		<scroll-view class="g-page-scroll" type="list" :scroll-y="true" :show-scrollbar="false">
			<view class="tips" v-if="!showFoot">{{tips}}</view>
			<view :class="['item',item.clientId?'side':'center',item.clientId==userInfo.id?'right':'']" v-for="(item,index) in dialogue" :key="index">
				<view class="portrait" v-if="item.userinfo">
					<image :src="item.userinfo.portrait" mode="widthFix" class="pic"></image>
				</view>
				<view class="wrap">{{item.msg}}</view>
			</view>
		</scroll-view>
		<view class="foot-wrap" v-if="showFoot">
			<input class="ipt" type="textarea" v-model="msg" placeholder="请输入" @confirm="handleSend" />
			<!-- <view class="btn-bar">
				<button class="g-btn" @click="handleSend">发送</button>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import {useStore} from 'vuex'
	import apiCommon from '@/api/common';
	import imgLoading from '@/components/imgLoading'
	
	export default {
		components: {
			imgLoading
		},
		data() {
			return {
				loading:true,
				showFoot:false,
				socketTask: null,
				userInfo:{},
				dialogue:[],
				tips:'~未登录~',
				msg:''
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.pageInit()
		},
		methods: {
			pageInit(){
				const store = useStore();
				var token = uni.getStorageSync('token');
				const store_user_info = store.getters.getUserInfo;
				
				if(!token){
					console.log('请登录')
					return false;
				}
				//console.log('store',store_user_info,store);
				if(store_user_info){
					this.$data.userInfo = store_user_info;
					//console.log('store',store_user_info);
				}
				this.pageFetch()
			},
			async pageFetch(){
				try{
					var that = this;
					var token = uni.getStorageSync('token');
					var option = {
						url: process.env.BASE_SOCKET_URL,
						header:{
							'content-type': 'application/json',
							'Authorization':'Bearer ' + token,
						},
						timeout:3000
					}
					
					const socketTask = wx.connectSocket(option);
					socketTask.onOpen((res)=>{
						console.log('onOpen',res)
						that.$data.showFoot = true;
					})
					socketTask.onMessage((res)=>{
						console.log('onMessage',res)
						if(res.data){
							let res_data = JSON.parse(res.data);
							this.$data.dialogue.unshift(res_data)
						}
					})
					socketTask.onClose((res)=>{
						console.log('onClose',res)
						that.$data.showFoot = false;
						that.$data.tips = '~已退出~';
					})
					socketTask.onError((res)=>{
						console.log('onError',res)
						that.$data.showFoot = false;
						that.$data.tips = res.errMsg || 'socketTask Error';
					})
					
					this.$data.socketTask = socketTask;
				}catch(err){
					console.log('pageFetch err',err)
					this.$data.loading = false;
				}
			},
			handleSend(){
				const {socketTask,msg} = this.$data;
				const that = this;
				//console.log('handleSend',socketTask)
				socketTask.send({
				    data: msg,
				    success(res) {
				        //console.log('send',JSON.stringify(res));
						that.$nextTick(()=>{
							that.$data.msg = '';
						})
				    },
				    fail(res) {
				        console.log(`send fail: ${JSON.stringify(res)}`);
				    }
				});
			},
			handleClose(){
				const {socketTask} = this.$data;
				console.log('handleClose',socketTask)
				socketTask.close({
				    code: 1000,
				    reason: "close socket",
				    success(res) {
				      console.log('close',JSON.stringify(res));
				    },
				    fail(res) {
				      console.log(`close fail: ${JSON.stringify(res)}`);
				    }
				});
			}
			
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>