<template>
	<view class="sk-chase">
		<view class="sk-chase-wrap" v-if="isMore">
			<view class="dot dot1"></view>
			<view class="dot dot2"></view>
			<!-- <view class="dot dot3"></view> -->
			<!-- <view class="dot dot4"></view>
			<view class="dot dot5"></view>
			<view class="dot dot6"></view> -->
		</view>
		<view class="sk-text" v-else>
			<text>~ over ~</text>
		</view>
	</view>
</template>

<script>

export default {
  name: 'general tabs',
  props: ['isMore'],
  data(){
  	return{
		current:0
	}
  },
  mounted(){
	  //console.log('tabs this',this.$props)
  },
  methods:{
	  handleItem(item,index){
		this.$data.current = index;
		this.$emit('handleItem',item)
	  }
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>