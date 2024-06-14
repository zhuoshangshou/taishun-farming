<template>
	<view :class="['g-back-bar',dark?'dark':'']" :style="buttonStyle">
		<view class="icon-font iconfont-home" @click="handleHome" v-if="backHome"></view>
		<view class="icon-font iconfont-back" @click="handleBack" v-else></view>
	</view>
</template>

<script>

export default {
  name: 'general back',
  props: ['dialogType','dark'],
  data(){
  	return{
		buttonStyle:{},
		backHome:false
	}
  },
  mounted(){
	  this.btnType()
	  this.getMenuClientRect()
	  //console.log('tabs this',this.$props)
  },
  methods:{
	  //胶囊按钮位置
	  async getMenuClientRect(){
		  const {dialogType} = this.$props;
		  if(!dialogType){
			  var res = uni.getMenuButtonBoundingClientRect();
			  var buttonStyle = {top:`${res.top}px`}
			  
			  //console.log('getMenuClientRect',dialogType,buttonStyle,res)
			  this.$data.buttonStyle = buttonStyle
		  }
	  },
	  btnType(){
			var currentPages = getCurrentPages();
			var backHome = true;
			if(currentPages.length>1){
				backHome = false;
			}
			this.$data.backHome = backHome
			console.log('btnType currentPages',currentPages)  
	  },
	  handleHome(){
		uni.reLaunch({
			url: '/pages/index/index'
		});
	  },
	  handleBack(){
	  	uni.navigateBack()
	  },
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>