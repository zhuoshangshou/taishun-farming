const express = require('express');
const mysql = require('mysql');
const axios = require('axios');

// 导入 body-parser中间件解析表单数据
const bodyParser = require("body-parser");

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
const app = express();
const port = 3000;

// 全局 中间件  解决所有路由的 跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

// 默认
app.use(express.static(__dirname,{index:"index.html"}));

// 解析 url-encoded格式的表单数据
app.use(bodyParser.urlencoded({ extended: false }));
 
// 解析json格式的表单数据
app.use(bodyParser.json());

// API端点：页面配置
app.get('/api/pagesetting', (req, res) => {
  //console.log('req',req.query)
  var {type} = req.query;
  var sql = 'SELECT * FROM pagesetting';
  if(type){
	  sql = `${sql} WHERE page_type='${type}'`;
  }
  console.log('pagesetting sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
	var falt_results = {message:'页面配置',code:200,list:results}
    res.send(falt_results);
  });
});


// API端点：联系我们信息
app.get('/api/getshoplist', (req, res) => {
  //console.log('req',req.query)
  var {enabled} = req.query;
  var sql = 'SELECT * FROM shopinfo';
  if(enabled){
  	  sql = `${sql} WHERE enabled='${enabled}'`;
  }
  console.log('getshoplist sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
	var falt_results = {message:'门店信息',code:200,list:results}
    res.send(falt_results);
  });
});


// API端点：联系我们信息
app.get('/api/getshopinfo', (req, res) => {
  //console.log('req',req.query)
  var {id} = req.query;
  var sql = 'SELECT * FROM shopinfo';
  if(id){
	  sql = `${sql} WHERE id='${id}'`;
  }
  console.log('getshopinfo sql',sql)
  connection.query(sql, (error, results, fields) => {
	var res_data = {}
    if (error) throw error;
	if(results && results.length){
		res_data = results[0]
	}
	var falt_results = {message:'门店信息',code:200,data:res_data}
    res.send(falt_results);
  });
});


// API端点：获取分类
app.get('/api/getcategory', (req, res) => {
  //console.log('req',req.query)
  var {type} = req.query;
  var sql = 'SELECT * FROM category';
  if(type){
	  sql = `${sql} WHERE type='${type}'`;
  }
  console.log('getcategory sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
	var falt_results = {message:'获取分类',code:200,list:results}
    res.send(falt_results);
  });
});

// API端点：获取产品列表
app.get('/api/getproductlist', (req, res) => {
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
    if (error) throw error;
	var falt_results = {message:'获取产品列表',code:200,list:results}
    res.send(falt_results);
  });
}); 

// API端点：获取产品列表
app.get('/api/getproduct', (req, res) => {
  //console.log('req',req.query)
  var {id} = req.query;
  var sql = 'SELECT * FROM product';
  if(id){
	  sql = `${sql} WHERE id='${id}'`;
  }
  console.log('getproduct sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
	var falt_results = {message:'获取产品',code:200,data:results}
    res.send(falt_results);
  });
}); 

// API端点：获取茶叶行情
app.get('/api/getmarkettea', (req, res) => {
  //console.log('req',req.query)
  var {shop_id} = req.query;
  var sql = 'SELECT * FROM teamarket';
  if(shop_id){
	  sql = `${sql} WHERE shop_id='${shop_id}' ORDER BY date ASC`;
  }
  console.log('getproduct sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
	var falt_results = {message:'获取产品',code:200,data:results}
    res.send(falt_results);
  });
}); 


// API端点：登录
app.get('/api/login', async (req, res) => {
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
				if (error) throw error;
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
app.get('/api/register', (req, res) => {
  //console.log('req',req.query)
  uitls.register(req.query,res,connection)
}); 

// API端点：用户信息
app.get('/api/getuserinfo', (req, res) => {
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
    if (error) throw error;
    if(results && results.length){
    	res_data = results[0]
    }
	var falt_results = {message:'用户信息',code:200,data:res_data}
    res.send(falt_results);
  });
}); 


// API端点：更新用户信息
app.post('/api/upuserinfo', (req, res) => {
  //console.log('upuserinfo req',req)
  var {id,openid,mobile,name,portrait} = req.body;
  var sql = `UPDATE users SET name = '${name}', mobile = '${mobile}', portrait = '${portrait}' WHERE id ='${id}' AND openid = '${openid}'`;
  console.log('getproduct sql',sql)
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
  	var falt_results = {message:'更新用户信息',code:200,data:results}
    res.send(falt_results);
  });
}); 

// 
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});


