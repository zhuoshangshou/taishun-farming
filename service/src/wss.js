const axios = require('axios');
const express = require('express');
const expressWs = require('express-ws');
const router = express.Router();

expressWs(router);

const userRouter = require("./router");

//uitls
const uitls = require('../src/uitls.js');


// 存储连接的客户端
const clients = new Set();
	
function generateClientId() {
	let clientId = Math.random().toString(36).substr(2, 9);
	//console.log('clientId',clientId)
	return clientId;
}
   
router.ws('/msg',async function (ws, req){
	var {authorization} = req.headers;
	var base_url = uitls.restEnvInit(process.env.NODE_ENV)
	//console.log('authorization',authorization)
	var getResData = await axios.get(base_url+'/getuserinfo',{headers:{authorization}});
	var userinfo = {}
	if(getResData.data && getResData.data.data){
		userinfo = getResData.data.data;
	}
	//console.log('userRouter2',userinfo)
	
	// 将新连接的客户端添加到集合中
	clients.add(ws);
	const clientId = userinfo.id?userinfo.id:generateClientId();
	// 返回给客户端
	let mas = {type: 0,  msg: `欢迎您${userinfo.name}`, userinfo}
	ws.send(JSON.stringify(mas))
	//console.log('clients00',clients)
	
	//监听消息事件	
    ws.on('message', function (msg) {
		//console.log('广播2',clientId)
        // 广播消息给所有客户端
		clients.forEach((client) => {
		  if (client.readyState === client.OPEN) {
			let mas = {type: 1,  msg: 'msg 广播', clientId,msg,userinfo}
			client.send(JSON.stringify(mas)) 
		  }else{
			//console.log('client !forEach',client.readyState,client.OPEN) 
		  }
		});
    })
	
	// close 事件表示客户端断开连接时执行的回调函数
	ws.on('close', function (e) {
		console.log('close code',e)
	})
})

module.exports = router;