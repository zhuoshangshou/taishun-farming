<template>
	<scroll-view 
		class="g-page-scroll" 
		type="custom" 
		:refresher-triggered="triggered"
		:scroll-y="true" 
		:refresher-enabled="true" 
		:show-scrollbar="false" 
		:lower-threshold="50" 
		@scrolltolower="fetchList" 
		@refresherrefresh="resetPageFetch" 
		@touchstart="scrollTouchStart"
		@touchmove="scrollTouchMove"
		@touchend="scrollTouchEnd">
		
		<sticky-header>
			<view :class="['nav-bar',showMInBar?'min':'']" :style="buttonBarStyle">
				<view class="title" :style="buttonStyle">
					<text class="icon-font iconfont-back" @click="handleBack" v-if="showBack"></text>
					<text class="tit">{{title}}</text>
				</view>
				<view class="nav-bar-wrap" id="nav-bar-wrap">
					<input class="ipt" v-model="searchText" @click="unfoldBar" type="text" placeholder="请输入搜索名称" />
					<button class="g-btn" @click="handleSearch">
						<text class="icon-font iconfont-search"></text>
					</button>
				</view>
			</view>
		</sticky-header>
		<sticky-section>
			  <slot></slot>
		</sticky-section>
	</scroll-view>
</template>

<script>

export default {
  name: 'general page scroll',
  props: ['keyword'],
  data(){
  	return{
		title:'墨云杂市',
		searchText:'',
		showMInBar:false,
		scrollUpward:false,
		scrollTouchY:null,
		triggered:false,
		showBack:false,
		buttonBarStyle:{},
		buttonStyle:{}
	}
  },
  mounted(){
	//console.log('view this',this.$props)
	if(this.$props.keyword){
		this.$data.searchText = this.$props.keyword
	}
	  // 改变搜索框宽度
	this.getMenuClientRect()  
	this.btnType()
  },
  methods:{
		//胶囊按钮位置
		async getMenuClientRect(){
			var res = uni.getMenuButtonBoundingClientRect();
			var buttonStyle = {height:`${res.height}px`}
			//console.log('getMenuClientRect',buttonStyle,res)
			this.$data.buttonBarStyle = {paddingTop:`${res.top}px`}
			this.$data.buttonStyle = buttonStyle
		},
		btnType(){
			var currentPages = getCurrentPages();
			var showBack = false;
			if(currentPages.length>1){
				showBack = true;
			}
			this.$data.showBack = showBack
			//console.log('btnType currentPages',currentPages)  
		},
		//下拉加载
		fetchList(item){
			//console.log('components fetchList',item)
			this.$emit('fetchList',item.id)
		},
		//重置
		resetPageFetch(){
			//console.log('components resetPageFetch')
			this.$data.triggered = true;
			this.$emit('resetPageFetch')
			this.$nextTick(()=>{
				this.$data.triggered = false;
			})
		},
		async handleSearch(){
			if(this.searchText){
				var url = `/pages/list/index?key=${this.searchText}`;
				//console.log('handleSearch')
				uni.navigateTo({url})
			}else{
				uni.showToast({
					title: '请输入搜索词',
					icon:'error',
					duration: 2000
				});
			}
			
		},
		unfoldBar(){
			console.log('unfoldBar')
			this.$data.showMInBar = false;
		},
		handleScroll(evt){
			const {scrollTop} = evt.detail;
			var showMInBar = scrollTop>0;
			//console.log('handleScroll',scrollTop,evt)
			//this.$data.showMInBar = showMInBar;
		},
		scrollTouchStart(evt){
			const {pageY} = evt.touches[0];
			this.$data.scrollTouchY = pageY
			//console.log('scrollTouchStart',pageY,evt)
		},
		scrollTouchMove(evt){
			const {pageY} = evt.touches[0];
			const {scrollTouchY,showMInBar} = this.$data;
			var upward = scrollTouchY>pageY;
			this.$data.scrollUpward = upward;
		},
		scrollTouchEnd(){
			const {scrollUpward,showMInBar} = this.$data;
			if(showMInBar!=scrollUpward){
				this.$data.showMInBar = scrollUpward;
			}
		},
		handleBack(){
			uni.navigateBack()
		}
  }
}
</script>

<style lang="scss">
	@import "./index.scss";
</style>