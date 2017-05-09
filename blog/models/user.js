/**
 * Created by zengxingqi on 2016/12/11.
 * Email: me@zengxingqi.com
 */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);




