<template>
	<view class="g-tabs">
		<view :class="['item',current==index?'act':'']" v-for="(item,index) in list" :key="index" @click="handleItem(item,index)">
			{{item.name}}
		</view>
		<slot></slot>
	</view>
</template>

<script>

export default {
  name: 'general tabs',
  props: ['list'],
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