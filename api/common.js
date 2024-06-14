import req from './req';

//获取页面配置
function getPageSetting(data) {
  return req.GET(`/pagesetting`, data)
}

//获取茶叶行情
function getMarketTea(data) {
  return req.GET(`/getMarketTea`, data)
}

//获取分类
function getCategory(data) {
  return req.GET(`/getcategory`, data)
}

//获取产品
function getProductsList(data) {
  return req.GET(`/getproductlist`, data)
}

//获取产品详情
function getProduct(data) {
  return req.GET(`/product`, data)
}


//获取门店信息
function getShopList(data) {
  return req.GET('/getshoplist', data)
}


//获取门店信息
function getShopInfo(data) {
  return req.GET('/getshopinfo', data)
}

//微信登录
function wxappLogin(data){
	return req.GET('/login', data)
}

//获取用户信息
function getUserInfo(data){
	return req.GET('/getuserinfo', data)
}


//更新用户信息
function upUserInfo(data){
	return req.POST('/upuserinfo', data)
}
			
			
export default { 
	getPageSetting,
	getMarketTea,
    getCategory,
	getProductsList,
	getProduct,
	getShopList,
	getShopInfo,
	wxappLogin,
	getUserInfo,
	upUserInfo
}
