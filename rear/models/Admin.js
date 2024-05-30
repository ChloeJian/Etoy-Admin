// rear/models/Admin.js
const mongoose = require('mongoose');

// 定义schema
const AdminSchema = new mongoose.Schema({
  admin_acc: { type: String },
  admin_pwd: { type: String },
  admin_name: { type: String },
  admin_sex: { type: String },
  admin_idcard: { type: String },
  admin_birth: { type: Date },
  admin_tel: { type: String },
  admin_email: { type: String },
});

// 使用定义的schema创建模型
const Admin = mongoose.model('Admin', AdminSchema,'Admin');
module.exports = Admin;