// rear/models/Toy.js
const mongoose = require('mongoose');

// 定义schema
const ToySchema = new mongoose.Schema({
  toy_name: { type: String },
  cate_id: { type: String },
  cate_name: { type: String },
  toy_des: { type: String },
  toy_picurl: { type: String },
  toy_total: { type: Number },
  toy_current: { type: Number },
  toy_maxT: { type: Number },
  toy_pub: { type: Date },
  toy_playacc: { type: Number }
});

// 使用定义的schema创建模型
const Toy = mongoose.model('Toy', ToySchema,'Toy');
module.exports = Toy;