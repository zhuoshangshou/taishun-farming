class API {
	constructor (options = {}) {
		this.baseURL = options.baseURL
		this.genMethods(['GET', 'POST', 'DELETE', 'PUT'])
		this.upload = (url,params) =>{
			return this.imageUpLoad({url,params})
		} 
	}
	
	genMethods(methods){
		methods.forEach(method=>{
			this[method] = (url,data) => {
				return this.makeReq({url,data,method})
			}
		})
	}

	makeReq(config){
		const { url,data} = config;
		let reqUrl = this.baseURL+url;
		if(/^http/.test(url)){
			reqUrl = url;
		}
		config.url  = reqUrl;
		config.header = {}
		
		var token = uni.getStorageSync('token');
		if(token){
			config.header['Authorization'] = 'Bearer ' + token;
		}
		
		if(config.method=='POST'){
			config.header['content-type'] = 'application/json;charset=utf-8' 
		}
		
		return new Promise((resolve,reject)=>{
			var request_config = {
			  ...config,
			  success: (res) => {
				//console.log('Promise',res)
				// 异步操作成功，调用resolve并传递结果
				if(res.data && res.data.code==200){
					resolve(res.data);
				}else{
					console.log('Promise resolve code!=200',{errmsg:res.data.errmsg,url:config.url,data:res.data})
					reject(res.data.errmsg);
				}
			  },
			  fail: (error) => {
				//console.log('Promise error',error)
				// 异步操作失败，调用reject并传递错误信息
				reject(error);
			  }
			}
			//console.log('config',config.url,config)
			//console.log('request_config',request_config)
			uni.request(request_config);
		})
	}

}


export default new API({
  baseURL:process.env.BASE_API_URL
})


