<template>
	<view class="content-box">
		<gScrollView @fetchList="fetchList" @resetPageFetch="resetPageFetch">
			<block v-for="(item,index) in pageSetting" :key="index">
				<gBanner :list="item.data" v-if="item.type=='banner'" />
			</block>
			<gTabs :list="categoryList" @handleItem="handleItem" />
			<gProductsListHalf :list="productsList" />
			<imgLoading :isMore="paging.more" />
			<gTabsBar :current="0" />
		</gScrollView>
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import gBanner from '@/components/gBanner'
	import gTabs from '@/components/gTabs'
	import gProductsList from '@/components/gProductsList'
	import gProductsListHalf from '@/components/gProductsListHalf'
	import imgLoading from '@/components/imgLoading'
	import gTabsBar from '@/components/gTabsBar'
	import gScrollView from '@/components/gScrollView'
	export default {
		components: {
			gBanner,gTabs,gProductsList,gProductsListHalf,imgLoading,gTabsBar,gScrollView
		},
		data() {
			return {
				paging:{page:1,pageSize:10,more:true},
				tabsId:0,
				categoryList: [],
				productsList:[],
				pageSetting:[]
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.pageFetch()
			this.fetchCategory()
		},
		methods: {
			//页面配置
			async pageFetch(){
				try{
					const {list} = await apiCommon.getPageSetting({type:'home'})
					if(list && list.length){
						list.forEach(item=>{
							item.data = JSON.parse(item.data);
						})
					}
					//console.log('pageFetch list',list)
					this.$data.pageSetting = list
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			//页卡分类
			async fetchCategory(){
				try{
					const {list} = await apiCommon.getCategory({type:'wholesale'})
					if(list && list.length){
						this.$data.tabsId = list[0].id;
						this.fetchList()
					}else{
						this.$data.paging.more = false;
					}
					this.$data.categoryList = list;
				}catch(err){
					console.log('pageFetch err',err)
					this.$data.paging.more = false;
				}
			},
			//页卡分类
			async fetchList(){
				try{
					const {productsList,paging,tabsId}= this.$data
					var params = {type:'wholesale',cid:tabsId,...paging}
					if(!paging.more){
						console.log('pageFetch more',paging)
						return false;
					}
					const {list,more} = await apiCommon.getProductsList(params)
					var newlist = list;
					if(paging.page>1){
						newlist = [...productsList,...list];
					}
					this.$data.productsList = newlist;
					this.$data.paging.page = paging.page+1;
					this.$data.paging.more = more;
					//console.log('fetchList newlist',newlist)
					uni.stopPullDownRefresh();
				}catch(err){
					console.log('fetchList err',err)
				}
			},
			//分类点击回调
			handleItem(item){
				//console.log('handleItem',item)
				this.$data.tabsId = item.id; 
				this.resetPageFetch()
			},
			//重置
			resetPageFetch(){
				//console.log('resetPageFetch')
				this.$data.paging = {page:1,pageSize:10,more:true};
				this.$data.productsList = [];
				this.fetchList()
			}
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>