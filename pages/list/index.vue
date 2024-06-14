<template>
	<view class="content-box">
		<gScrollView :keyword="keyword"  @fetchList="pageFetch" @resetPageFetch="resetPageFetch">
			<gProductsListHalf :list="productsList" numName='可售量' numKey='output' />
			<imgLoading :isMore="paging.more" />
		</gScrollView>
	</view>
</template>

<script>
	import apiCommon from '@/api/common';
	import gScrollView from '@/components/gScrollView'
	import gProductsListHalf from '@/components/gProductsListHalf'
	import imgLoading from '@/components/imgLoading'
	export default {
		components: {
			gScrollView,gProductsListHalf,imgLoading
		},
		data() {
			return {
				keyword: '',
				paging:{page:1,pageSize:10,more:true},
				productsList:[],
			}
		},
		onLoad(option) {
			const {key} = option;
			if(key){
				this.$data.keyword = key;
			}
			this.pageFetch()
		},
		methods: {
			//页面配置
			async pageFetch(){
				try{
					const {productsList,paging,keyword}= this.$data
					var params = {name:keyword,id:1,...paging}
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
				}catch(err){
					console.log('pageFetch err',err)
				}
			},
			//重置
			resetPageFetch(){
				//console.log('resetPageFetch')
				this.$data.paging = {page:1,pageSize:10,more:true};
				this.pageFetch()
			}
		}
	}
</script>

<style>
	
</style>
