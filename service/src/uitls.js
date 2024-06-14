const CryptoJS = require('crypto-js')
const MD5 = require('crypto-js/md5')
const keyStr = '11111'
const ivStr = CryptoJS.enc.Utf8.parse('farming'); //默认的key 偏移量

//注册
const register =(query,res,connection)=>{
	//console.log('uitls register',query)
	var {openid,mobile} = query;
	var sql =  `INSERT INTO users (openid,mobile,name)`;
	if(openid){
		sql =  `${sql} VALUES ('${openid}','','')`;
	}else if(mobile){
		sql = `${sql} VALUES ('','${mobile}','')`
	}else{
		res.send({errmsg:'注册失败，请填写正确信息',code:-1,query});
		return false;
	}
	console.log('register sql',sql)
	connection.query(sql, (error, results, fields) => {
		if (error) throw error;
		//console.log('register falt_results',results)
		getUserInfo(connection,res,openid,null,'注册成功')
	});
}

//获取用户信息
const getUserInfo = (connection,res,openid,mobile,msg)=>{
	var sql = `SELECT * FROM users WHERE openid = '${openid}'`;
	var wxres = {message:'会员信息'}
	connection.query(sql, (error, results, fields) => {
		if (error) throw error;
		if(results.length){
			var token = creationToken(results[0].openid+'&taishun&'+results[0].mobile);
			wxres = {message:msg?msg:'登录成功',code:200,data:{token}}
			console.log('connection wxres',wxres)
		}
		res.send(wxres);
	});
}

//创建token
const creationToken =(code)=>{
	var encrypted = CryptoJS.AES.encrypt(code, keyStr, {
	      iv: ivStr,
	      mode: CryptoJS.mode.CBC,
	      padding: CryptoJS.pad.Pkcs7
	  });
	var token = encrypted.toString()
	//console.log('加密 token',token)
	return token;
}

//解密token
const decodeToken =(token)=>{
	const encryptedStr = CryptoJS.AES.decrypt(token, keyStr, {
		iv: ivStr,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	var decode_token =  encryptedStr.toString(CryptoJS.enc.Utf8);
	var token_str = decode_token.split('&taishun&');
	//console.log('解密 decode token',token_str,decode_token)
	var openid = token_str[0]||null;
	//console.log('解密 decode openid',openid)
	return openid;
}

module.exports = {register,creationToken,decodeToken,getUserInfo}