// 未使用，留待查看
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '',
    }
  },

  attached() {
    
  },
  /**
   * 组件的方法列表
   */
  onLoad(){
	this.applyAnimatedStyle('.nav-bar', () => {
		'worklet'
		console.log('applyAnimatedStyle')
		return {
			width:'50%'
		}
	})
  },
  methods: {
	//下拉加载
	fetchList(item){
		//console.log('components fetchList',item)
	},
	//重置
	resetPageFetch(){
		//console.log('components resetPageFetch')
		
	},
	async handleSearch(){
		const offset = wx.worklet.shared(0)
		console.log('handleSearch',this)

		this.applyAnimatedStyle('.nav-bar-wrap', () => {
			'worklet'
			console.log('applyAnimatedStyle')
			return {
				width:'50%'
			}
		})

	},
	handleVerticalDrag(evt){
		'worklet'
		console.log('handleVerticalDrag',evt.state,evt.deltaY,evt)
		return {}
	},
	handleScroll(evt){
		
	}
  },
});
