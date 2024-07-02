<template>
	<view class="content-box" @click="hideKeyboard">
		<view class="page-content-box">
			<view class="wrap">
				<view :class="['ipt',current==index?'act':'']" v-for="(item,index) in formData" :key="index" @click.stop="handleIpt(index)">{{item}}</view>
			</view>
			<view class="btn-bar">
				<button class="g-btn" @click.stop="handleSubmit">提交</button>
			</view>
		</view>
		<gVirtualKeyboard :keyboard="keyboard" :keysize="keysize" @handleKey="handleKey" v-if="showKeyboard" />
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import gVirtualKeyboard from '@/components/gVirtualKeyboard'
	export default {
		components: {
			gVirtualKeyboard
		},
		data() {
			return {
				showKeyboard:false,
				keysize:'max',
				firstKey:['京','津','沪','冀','豫','云','辽','黑','湘','皖','鲁','新','苏','浙','赣','鄂','桂','甘','晋','蒙','陕','吉','闽','贵','粤','青','藏','川','琼','渝'],
				commonKey:['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
				keyboard: [],
				formData:[null,null,null,null,null,null,null,null],
				current:null
			}
		},
		onLoad(option) {
			
		},
		mounted() {
			
		},
		methods: {
			handleKey(key){
				const {current,formData} = this.$data;
				let next = current+1;
				let max = 8;
				//console.log('handleKey',key,current,max)
				//console.log('handleKey next',next,formData[next])
				if(next==max){
					//next = null;
					this.$data.current= null;
					this.$data.showKeyboard = false;
				}else if(formData[next]==null){
					this.handleIpt(next)
				}
				
				this.$data.formData[current] = key;
			},
			handleIpt(index=0){
				const {firstKey,commonKey} = this.$data;
				let keyboard = commonKey
				let keysize = ''
				let showKeyboard = true;
				if(index==0){
					keyboard = firstKey
					keysize = 'max'
				}
				if(index==8){
					showKeyboard = false;
				}
				//console.log('index',index,this.$data.formData[index])
				this.$data.current= index;
				this.$data.keysize = keysize;
				this.$data.keyboard = keyboard;
				
				this.$data.showKeyboard = showKeyboard;
				this.$data.formData[index] = null;
			},
			hideKeyboard(){
				console.log('hideKeyboard')
				this.$data.showKeyboard = false;
				this.$data.current= null;
			},
			handleSubmit(){
				const {formData} = this.$data;
				var parasm = formData.toString().replace(/,/gi, '');
				console.log('handleSubmit',parasm)
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>