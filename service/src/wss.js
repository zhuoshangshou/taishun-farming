const axios = require('axios');
const express = require('express');
const expressWs = require('express-ws');
const router = express.Router();

expressWs(router);

const userRouter = require("./router");

// 存储连接的客户端
const clients = new Set();
	
function generateClientId() {
	let clientId = Math.random().toString(36).substr(2, 9);
	console.log('clientId',clientId)
	return clientId;
}
   
router.ws('/msg',async function (ws, req){
	var {authorization} = req.headers;
	
	console.log('authorization',authorization)
	var userinfo = await axios.get('http://127.0.0.1:3000/api/getmarkettea',{});
	console.log('userRouter2',userinfo)
	// 将新连接的客户端添加到集合中
	clients.add(ws);
	const clientId = generateClientId();
	// 返回给客户端
	let mas = {type: 0,  msg: 'msg 连接成功',  userId: clientId,}
	ws.send(JSON.stringify(mas))
	//console.log('clients00',clients)
	
	//监听消息事件	
    ws.on('message', function (msg) {
		//console.log('广播2',clientId)
        // 广播消息给所有客户端
		clients.forEach((client) => {
		  if (client.readyState === client.OPEN) {
			let mas = {type: 1,  msg: 'msg 广播',  userId: clientId,msg}
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