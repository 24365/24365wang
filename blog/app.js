/**
 * 应用程序启动文件(入口)
 * by 曾星旗 on 2016/10/18
 */
// 加载express模块
var express = require("express");
//加载模版处理模块
var swig = require("swig");
// 创建app应用 => nodejs http.createServer();
var app = express();
// 加载mongoose数据库模块
var mongoose = require('mongoose');
// 加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 加载cookies模块
var Cookies = require('Cookies');
var User = require('./models/User');
// 设置静态文件托管
// 当用户访问的url以public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));
// 配置应用模版
// 定义当前应用所使用的模版引擎
// 第一个参数，模版引擎的名称，同时也是模版文件的后缀，第二个参数表示用于解析处理模版内容的方法
app.engine('html',swig.renderFile);
// 设置模版文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
// 注册使用的模版引擎，第一个参数是view engine，第二个参数和app.engine这个方法中定义的模版引擎的名称是一致的（第一个参数）
app.set('view engine','html');
// 在开发过程中，需要取消模版缓存
swig.setDefaults({cache:false});

// bodyparser设置
app.use( bodyParser.urlencoded({extended:true}));

// cookies保存记录用户的登录状态
app.use(function (req, res, next) {
    req.cookies = new Cookies(req,res);
    req.userInfo = {};
    // 解析用户登录的cookies信息
    if(req.cookies.get('userInfo')){
        try {
            req.userInfo=JSON.parse(req.cookies.get('userInfo'));
            // 获取登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch (e){next()}
    }else {
        next();
    }
});
// 根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

// 监听http请求
mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if(err){
        console.log('数据库连接失败');
    }else {
        console.log('数据库连接成功');
        app.listen(8080);
    }
});