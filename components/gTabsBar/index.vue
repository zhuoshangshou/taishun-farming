<template>
	<view class="g-tabs-bar">
		<view :class="['item',current==index?'act':'']" v-for="(item,index) in list" :key="index" @click="handleItem(item,index)">
			<text :class="['icon-font',item.icon]" v-if="item.icon"></text>
			<text class="text">{{item.text}}</text>
		</view>
	</view>
</template>

<script>

export default {
  name: 'general tabs',
  props: ['current'],
  data(){
  	return{
		list:[
			{text:'批发服务',pagePath:'/pages/index/index',icon:'iconfont-wholesale'},
			{text:'收购信息',pagePath:'/pages/procure/index',icon:'iconfont-procure'},
			{text:'茶叶行情',pagePath:'/pages/market/index',icon:'iconfont-market'},
			{text:'联系我们',pagePath:'/pages/contact/index',icon:'iconfont-contact'},
			{text:'我的',pagePath:'/pages/member/index',icon:'iconfont-member'}
		]
	}
  },
  mounted(){
	  //console.log('tabs this',this.$props)
  },
  methods:{
	  handleItem(item){
		//console.log('handleItem',item)
		uni.reLaunch({
			url: item.pagePath
		});
	  }
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>