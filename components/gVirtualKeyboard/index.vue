<template>
	<view class="g-virtual-Keyboard">
		<view class="keyboard subkey" v-if="subKey.length">
			<view class="key" v-for="(item,index) in subKey" :key="index" @click="handleKey(item)">
				<text>{{item}}</text>
			</view>
		</view>
		<view :class="['keyboard',subKey.length?'notop':'']">
			<view class="key" v-for="(item,index) in keyboard" :key="index" @click="handleKey(item)">
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>

export default {
  name: 'virtual Keyboard',
  props: ['keyboard','subKey'],
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