const axios = require('axios');
const mysql = require('mysql');
const express = require('express');
const COS = require('cos-nodejs-sdk-v5');
const multiparty = require('multiparty');

// 创建路由对象
const router = express.Router();

//uitls
const uitls = require('../src/uitls.js');

// 设置数据库连接
const connection = mysql.createConnection({
  host     : '36.111.172.157',
  user     : 'shang',
  password : 'dRZb5EBte37CWKpm',
  database : 'taishun',
  charset : 'utf8mb4' //设置字符集用于保存表情
});
// 连接数据库
connection.connect();

//储存到本地uploads 目录
//const multer  = require('multer');
// 设置存储配置
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
// 		//console.log('storage destination', file)
//         cb(null, 'uploads/') // 确保这个文件夹已经存在
//     },
//     filename: function (req, file, cb) {
// 		let mimetype= '.'+file.mimetype.split('/')[1];
// 		//console.log('storage filename', mimetype,file)
//         cb(null, file.fieldname + '-' + Date.now()+mimetype)
//     }
// })
// const upload = multer({ storage: storage });


// 
const commonUitls = {
	getUserInfo:(authorization)=>{
		var info = '';
		if(!authorization){
			return info
		}
		//console.log('authorization',authorization)
		let token_str = authorization.match(/Bearer (\S*)/)[1];
		let token_openid = uitls.decodeToken(token_str)
		
		var sql = `SELECT * FROM users WHERE openid='${token_openid}'`;
		console.log('getUserInfo sql',sql)
		connection.query(sql, (error, results, fields) => {
		  var res_data = {}
		  if (error) {
		  	var falt_results = {message:'用户信息',...error}
		  	res.send(falt_results);
		  	return falt_results;
		  }
		  //console.log('getUserInfo results',results)
		  if(results && results.length){
		  	res_data = results[0]
		  }
			var falt_results = {message:'用户信息',code:200,data:res_data}
			//console.log('getUserInfo falt_results',falt_results)
			return falt_results;
		});
	}
}


// 挂载具体的路由

// API端点：页面配置
router.get('/pagesetting', (req, res) => {
  //console.log('req',req.query)
  var {type} = req.query;
  var sql = 'SELECT * FROM pagesetting';
  if(type){
	  sql = `${sql} WHERE page_type='${type}'`;
  }
  console.log('pagesetting sql',sql)
  connection.query(sql, (error, results, fields) => {
    //if (error) throw error;
	if (error) {
		var falt_results = {message:'获取页面配置',...error}
		res.send(falt_results);
		return false;
	}
	var falt_results = {message:'页面配置',code:200,list:results}
    res.send(falt_results);
  });
});


// API端点：联系我们信息
router.get('/getshoplist', (req, res) => {
  //console.log('req',req.query)
  var {enabled} = req.query;
  var sql = 'SELECT * FROM shopinfo';
  if(enabled){
  	  sql = `${sql} WHERE enabled='${enabled}'`;
  }
  console.log('getshoplist sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
    	var falt_results = {message:'获取门店信息',...error}
    	res.send(falt_results);
    	return false;
    }
	var falt_results = {message:'门店信息',code:200,list:results}
    res.send(falt_results);
  });
});


// API端点：联系我们信息
router.get('/getshopinfo', (req, res) => {
  //console.log('req',req.query)
  var {id} = req.query;
  var sql = 'SELECT * FROM shopinfo';
  if(id){
	  sql = `${sql} WHERE id='${id}'`;
  }
  console.log('getshopinfo sql',sql)
  connection.query(sql, (error, results, fields) => {
	var res_data = {}
    if (error) {
    	var falt_results = {message:'获取联系我们信息',...error}
    	res.send(falt_results);
    	return false;
    }
	if(results && results.length){
		res_data = results[0]
	}
	var falt_results = {message:'获取联系我们信息',code:200,data:res_data}
    res.send(falt_results);
  });
});


// API端点：获取分类
router.get('/getcategory', (req, res) => {
  //console.log('req',req.query)
  var {type} = req.query;
  var sql = 'SELECT * FROM category';
  if(type){
	  sql = `${sql} WHERE type='${type}'`;
  }
  console.log('getcategory sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
    	var falt_results = {message:'获取分类',...error}
    	res.send(falt_results);
    	return false;
    }
	var falt_results = {message:'获取分类',code:200,list:results}
    res.send(falt_results);
  });
});

// API端点：获取产品列表
router.get('/getproductlist', (req, res) => {
  //console.log('req',req.query)
  var {type,cid,name} = req.query;
  var sql = 'SELECT *,shopinfo.shopName,shopinfo.shopMobile FROM product INNER JOIN shopinfo ON product.shop_id = shopinfo.id';
  if(type){
	  sql = `${sql} WHERE type='${type}' AND cid='${cid}' `;
  }
  if(name){
	sql = `${sql} WHERE name LIKE '%${name}%'`;  
  }
  console.log('getproductlist sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
    	var falt_results = {message:'获取产品列表',...error}
    	res.send(falt_results);
    	return false;
    }
	var falt_results = {message:'获取产品列表',code:200,list:results}
    res.send(falt_results);
  });
}); 

// API端点：获取产品列表
router.get('/getproduct', (req, res) => {
  //console.log('req',req.query)
  var {id} = req.query;
  var sql = 'SELECT * FROM product';
  if(id){
	  sql = `${sql} WHERE id='${id}'`;
  }
  console.log('getproduct sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
    	var falt_results = {message:'获取产品',...error}
    	res.send(falt_results);
    	return false;
    }
	var falt_results = {message:'获取产品',code:200,data:results}
    res.send(falt_results);
  });
}); 

// API端点：获取茶叶行情
router.get('/getmarkettea', (req, res) => {
  //console.log('req',req.query)
  var {shop_id} = req.query;
  var sql = 'SELECT * FROM teamarket';
  if(shop_id){
	  sql = `${sql} WHERE shop_id='${shop_id}' ORDER BY date ASC`;
  }
  console.log('getproduct sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
    	var falt_results = {message:'获取行情',...error}
    	res.send(falt_results);
    	return false;
    }
	var falt_results = {message:'获取产品',code:200,data:results}
    res.send(falt_results);
  });
}); 


// API端点：登录
router.get('/login', async (req, res) => {
  //console.log('login req',req.query)
  var {openid} = req.query;
  var showErrMsg = true;
  var wxres = {message:'登录'}
  var params = {appid:'wx6cbd176471f18cda',secret:'084d6f5eea0a72826f7eeee1d58db96c',js_code:openid,grant_type:'authorization_code'}
  //console.log('params',params)
  if(openid){
	try{
		var {data} = await axios.get('https://api.weixin.qq.com/sns/jscode2session',{params});
		//console.log('jscoderes',data)
		if(data.openid){
			var sql = `SELECT * FROM users WHERE openid = '${data.openid}'`;
			showErrMsg = false;
			console.log('login sql',sql)
			connection.query(sql, (error, results, fields) => {
				if (error) {
					var falt_results = {message:'登录成功',...error}
					res.send(falt_results);
					return false;
				}
				if(results.length){
					var token = uitls.creationToken(results[0].openid+'&taishun&'+results[0].mobile);
					wxres = {message:'登录成功',code:200,data:{token}}
					//console.log('connection wxres',wxres)
					res.send(wxres);
				}else{
					//注册
					uitls.register({openid:data.openid},res,connection)
				}
			});
		}else{
			wxres = {message:'登录失败',code:-1,errmsg:data.errmsg}
			//console.log('jscode2session err',data.errmsg)
		}
	}catch(err){
		wxres = {message:'登录失败',code:-1,err}
	}
  }
  if(showErrMsg){
	//console.log('login wxres',wxres)
	res.send(wxres); 
  }
  
}); 

// API端点：用户注册
router.get('/register', (req, res) => {
  //console.log('req',req.query)
  uitls.register(req.query,res,connection)
}); 

// API端点：用户信息
router.get('/getuserinfo', (req, res) => {
  //console.log('req',req.headers)
  var {openid} = req.query;
  var {authorization} = req.headers;
  var sql =  `SELECT * FROM users`;
  if(openid){
	  sql = `${sql} WHERE openid='${openid}'`;
  }else if(authorization){
	//console.log('authorization',authorization)
	let token_str = authorization.match(/Bearer (\S*)/)[1];
	let token_openid = uitls.decodeToken(token_str)
	//console.log('token_str',token_openid,token_str)
	sql = `${sql} WHERE openid='${token_openid}'`;
  }else{
	res.send({errmsg:'未登录',code:-1});  
	return false;
  }
  console.log('getuserinfo sql',sql)
  connection.query(sql, (error, results, fields) => {
    var res_data = {}
    if (error) {
    	var falt_results = {message:'用户信息',...error}
    	res.send(falt_results);
		console.log('getuserinfo destroy')
		connection.destroy();
    	return false;
    }
    if(results && results.length){
    	res_data = results[0]
    }
	var falt_results = {message:'用户信息',code:200,data:res_data}
    res.send(falt_results);
  });
}); 


// API端点：更新用户信息
router.post('/upuserinfo', (req, res) => {
  //console.log('upuserinfo req',req)
  var {authorization} = req.headers;
  var {id,openid,mobile,name,portrait} = req.body;
  var sql = `UPDATE users SET name = '${name}', mobile = '${mobile}', portrait = '${portrait}'`;
  if(authorization){
	//console.log('authorization',authorization)
	let token_str = authorization.match(/Bearer (\S*)/)[1];
	let token_openid = uitls.decodeToken(token_str)
	//console.log('token_str',token_openid,token_str)
	sql = `${sql} WHERE openid='${token_openid}'`;  
  }else{
	res.send({errmsg:'未登录',code:-1});
	return false;
  }
  
  console.log('upuserinfo sql',sql);
  try{
	  connection.query(sql, (error, results, fields) => {
	    if (error) {
			var falt_results = {message:'更新用户信息',...error}
			res.send(falt_results);
			return false;
		}
	  	var falt_results = {message:'更新用户信息',code:200,data:results}
	    res.send(falt_results);
	  });
  }catch(err){
	  var falt_results = {message:'更新用户信息',code:-1}
	  res.send(falt_results);
  }
  
}); 



//图片上传upload.single('file_portrait'),
router.post('/upcosfiles',(req, res) => {
  //console.log('upuserinfo req',req)
  //var {filepath,filename} = req.file;
  try{
	var sql = `SELECT * FROM third_information WHERE platform = 'tencent_cos'`;
	connection.query(sql, (error, results, fields) => {
		if (error) {
			var falt_results = {message:'未找到 tencent_cos 数据',...error}
			res.send(falt_results);
			return false;
		}
		
		const platforminfo = results[0];
		const Bucket = platforminfo.bucket;  /* 存储桶，必须字段 */
		const Region = platforminfo.region;     /* 存储桶所在地域，必须字段 */
		const form = new multiparty.Form()
		var filename = null;
		var filebase64 = null;
		// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
		var cos = new COS({
		    SecretId: platforminfo.SecretId,
		    SecretKey: platforminfo.SecretKey,
		});
		//console.log('platforminfo',platforminfo)
		//const fileObject = req.file;
		// if(!fileObject){
		// 	console.log('upuserinfo !fileObject',req)
		// 	return false;
		// }
		//console.log('upuserinfo req',fileObject)
		form.parse(req,(err,fields,file)=>{
			//console.log('formData',fields)
			filebase64 = fields.filebase[0];
			filename = fields.filename[0];
			
			//列出目录 / 的所有文件
			// cos.getBucket({
			//     Bucket: Bucket, /* 填入您自己的存储桶，必须字段 */
			//     Region: Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
			//     //Prefix: '/',           /* Prefix表示列出的object的key以prefix开始，非必须 */
			// }, function(err, data) {
			// 	var resdata = err || data.Contents
			//     console.log('resdata',resdata);
				
			// 	var falt_results = {message:'列出目录文件',code:200,data:resdata}
			// 	res.send(falt_results);
			// });
			var body_base = Buffer.from(filebase64, 'base64');
			var putoption = {
			    Bucket:Bucket, 
			    Region:Region,  
			    Key: 'images/'+filename, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
				StorageClass: 'STANDARD',/* 当 Body 为 stream 类型时，ContentLength 必传，否则 onProgress 不能返回正确的进度信息 */
			    Body: body_base, // 上传文件对象
			    // onProgress: function(progressData) { /*进度的回调函数*/
			    //     console.log('onProgress',JSON.stringify(progressData));
			    // }
			}
			//console.log('cos putoption',putoption);
			//上传对象
			cos.putObject(putoption, function(err, data) {
				//console.log('cos putObject data',err, data);
			    var resdata = err || 'https://'+data.Location
				var falt_results = {message:'putObject上传',code:200,data:resdata}
				res.send(falt_results);  
			});
		})
	});
	
	
  }catch(err){
	console.log('upcosfiles err',err)
	var falt_results = {message:'图片上传',code:-1,err}
	res.send(falt_results);  
  }
  
  
}); 

// 向外导出路由对象
module.exports = router;
module.exports.uitls = commonUitls;