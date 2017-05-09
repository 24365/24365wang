/**
 * Created by zengxingqi on 2016/12/12.
 * Email: me@zengxingqi.com
 */
var mongoose = require('mongoose');

// 分类的表结构
module.exports=new mongoose.Schema({
    // 分类名称
    name:String
});