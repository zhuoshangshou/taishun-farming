<template>
	<view class="g-virtual-Keyboard">
		<view :class="['keyboard',keysize]">
			<view class="key" v-for="(item,index) in keyboard" :key="index" @click.stop="handleKey(item)">
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>

export default {
  name: 'virtual Keyboard',
  props: ['keyboard','keysize'],
  data(){
  	return{
		buttonStyle:{},
		backHome:false
	}
  },
  mounted(){
	
	  console.log('Keyboard this',this.$props)
  },
  methods:{
	  handleKey(key){
	  	this.$emit('handleKey',key)
	  },
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>