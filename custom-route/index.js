
export function installRouteBuilder() {
	// 定义自定义效果 半屏 黑
	const slideRouteBuilder = (customRouteContext) => {
		const { primaryAnimation,secondaryAnimation,primaryAnimationStatus,secondaryAnimationStatus,userGestureInProgress } = customRouteContext
		const {windowWidth,screenHeight} = wx.getSystemInfoSync()
		console.log('customRouteContext',customRouteContext)

		
		//页面推入 控制页面的进入和退出动画
		const handlePrimaryAnimation = () => {
			'worklet'
			
			// 手势拖动
			let t = primaryAnimation.value
			let topRadius = 12
			
			// 默认采用曲线值
			if (!userGestureInProgress.value) {
			  t =  wx.worklet.Easing.bezier(0.35, 0.91, 0.33, 0.97).factory()(t)
			}
			
			var option = {
			  overflow: 'hidden',
			  borderRadius: `${topRadius}px ${topRadius}px 0px 0px`,
			  marginTop: '20vh',
			  height:'80vh',
			  transform: `translateY(${(1 - t) * 100}%) scale(${(t) * 100}%)`,
			  opacity:t
			}
			
			//console.log('option',option)
			return option
		}
		//页面推出 控制下一个页面进入时，当前页面的动画
		const handleSecondaryAnimation = () => {
			'worklet'
			let t = secondaryAnimation.value
	
			  // 非手势触发时，可以通过动画曲线 fastOutSlowIn 来改变动画的进度值
			//   if (!userGestureInProgress.value) {
			// 	t = wx.worklet.Easing.bezier(0.4, 0.0, 0.2, 1.0).factory()(t)
			//   }
			
			
			//   const top = 0.1 // 页面距离顶部的距离比例
			//   const scaleRatio = 0.08 // 缩放比例
			//   const translateY = screenHeight * (top - 0.5 * scaleRatio) * t // 页面动画过程中的纵向偏移值
			//   const scale = 1 - scaleRatio * t // 缩放过程中的比例
			//   const radius = 12 * t // 页面圆角
			
			// var option = {
			// 	borderRadius: `${radius}px`,
			// 	//transform: `translateY(${translateY}px) scale(${scale})`,
			// }
			
			console.log('handleSecondaryAnimation option',t)
			return {
				overflow: 'hidden',
			}
			
		}
		  
		return {
			handlePrimaryAnimation,
			handleSecondaryAnimation,
			barrierColor:'rgba(0,0,0,0.8)',
			opaque: false, // 半屏推入时栈顶可见
			fullscreenDrag: true, //右滑返回手势区域拓展到全屏范围
			popGestureDirection: 'multi', // 返回手势方向
			barrierDismissible: true, // 点击遮罩是否返回上一页
			transitionDuration: 400, // 页面推入动画时长
			reverseTransitionDuration: 400, // 页面退出动画时长
			//canTransitionTo: true, // 下一个页面推入时，当前页 secondaryAnimation 是否生效
			canTransitionFrom: false, // 当前页推入时，前一个页面 secondaryAnimation 是否生效
		}
	}
	
	// 定义自定义效果 半屏 透明
	const slideRouteBuilderLucency = (customRouteContext) => {
		const { primaryAnimation,secondaryAnimation,primaryAnimationStatus,secondaryAnimationStatus,userGestureInProgress } = customRouteContext
		const {windowWidth,screenHeight} = wx.getSystemInfoSync()
		console.log('customRouteContext',customRouteContext)
		
		//页面推入 控制页面的进入和退出动画
		const handlePrimaryAnimation = () => {
		'worklet'
			// 手势拖动
			let t = primaryAnimation.value
			let topRadius = 12
			
			// 默认采用曲线值
			if (!userGestureInProgress.value) {
			  t =  wx.worklet.Easing.bezier(0.35, 0.91, 0.33, 0.97).factory()(t)
			}
			
			var option = {
			  overflow: 'hidden',
			  borderRadius: `${topRadius}px ${topRadius}px 0px 0px`,
			  marginTop: '20vh',
			  height:'80vh',
			  transform: `translateY(${(1 - t) * 100}%) scale(${(t) * 100}%)`,
			  opacity:t
			}
			console.log('handlePrimaryAnimation option',t)
			return option
		}
		//页面推出 控制下一个页面进入时，当前页面的动画
		const handleSecondaryAnimation = () => {
			'worklet'
			let t = secondaryAnimation.value
	
			  // 非手势触发时，可以通过动画曲线 fastOutSlowIn 来改变动画的进度值
			//   if (!userGestureInProgress.value) {
			// 	t = wx.worklet.Easing.bezier(0.4, 0.0, 0.2, 1.0).factory()(t)
			//   }
			
			
			//   const top = 0.1 // 页面距离顶部的距离比例
			//   const scaleRatio = 0.08 // 缩放比例
			//   const translateY = screenHeight * (top - 0.5 * scaleRatio) * t // 页面动画过程中的纵向偏移值
			//   const scale = 1 - scaleRatio * t // 缩放过程中的比例
			//   const radius = 12 * t // 页面圆角
			
			// var option = {
			// 	borderRadius: `${radius}px`,
			// 	//transform: `translateY(${translateY}px) scale(${scale})`,
			// }
			
			console.log('handleSecondaryAnimation option',t)
			return {
				overflow: 'hidden',
			}
			
		}
		  
		return {
			handlePrimaryAnimation,
			handleSecondaryAnimation,
			opaque: false, // 半屏推入时栈顶可见
			fullscreenDrag: true, //右滑返回手势区域拓展到全屏范围
			popGestureDirection: 'multi', // 返回手势方向
			barrierDismissible: true, // 点击遮罩是否返回上一页
			transitionDuration: 400, // 页面推入动画时长
			reverseTransitionDuration: 400, // 页面退出动画时长
			//canTransitionTo: true, // 下一个页面推入时，当前页 secondaryAnimation 是否生效
			canTransitionFrom: false, // 当前页推入时，前一个页面 secondaryAnimation 是否生效
		}
	}
	
	wx.router.addRouteBuilder('HalfScreenDialog', slideRouteBuilder)
	wx.router.addRouteBuilder('HalfScreenDialogLucency', slideRouteBuilderLucency)
}

