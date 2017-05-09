/**
 * Created by zengxingqi on 2016/12/12.
 * Email: me@zengxingqi.com
 */
var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);