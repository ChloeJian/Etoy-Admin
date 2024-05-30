// rear/models/Cate.js
const mongoose = require('mongoose');

// 定义schema
const CateSchema = new mongoose.Schema({
  cate_name: { type: String },
  cate_des: { type: String }
});

// 使用定义的schema创建模型
const Cate = mongoose.model('Cate', CateSchema,'Cate');
module.exports = Cate;