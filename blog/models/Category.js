/**
 * Created by zengxingqi on 2016/12/12.
 * Email: me@zengxingqi.com
 */
var mongoose = require('mongoose');
var catagoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category',catagoriesSchema);