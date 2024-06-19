const express = require('express');
const expressWs = require('express-ws');
const app = express();
const port = 3000;

// 导入 body-parser中间件解析表单数据
const bodyParser = require("body-parser");

// 全局 中间件  解决所有路由的 跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
    res.header('Access-Control-Allow-Credentials', true);
    //res.header("Content-Type", "application/json;charset=utf-8"); //  加了index.html 就变成json了
    next()
})

// 默认
app.use(express.static(__dirname,{index:"index.html"}));
// 解析 url-encoded格式的表单数据
app.use(bodyParser.urlencoded({ extended: false }));
// 解析json格式的表单数据
app.use(bodyParser.json());

// 导入路由模块
const userRouter = require("./router");
// 注册路由模块 为路由模块添加前缀
app.use('/api',userRouter);

// 导入wss
expressWs(app);
const wss = require("./wss");
app.use(wss);

// 启动web服务器
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});



