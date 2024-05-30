// rear/models/User.js
const mongoose = require('mongoose');

// 定义schema
const UserSchema = new mongoose.Schema({
  _openid: { type: String },
  user_name: { type: String },
  user_sex: { type: String },
  user_idcard: { type: String },
  user_birth: { type: String },
  user_tel: { type: String },
  user_play: { type: Number }
});

// 使用定义的schema创建模型
const User = mongoose.model('User', UserSchema,'User');
module.exports = User;