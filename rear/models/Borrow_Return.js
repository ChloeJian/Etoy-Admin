// rear/models/Borrow_Return.js
const mongoose = require('mongoose');

// 定义schema
const Borrow_ReturnSchema = new mongoose.Schema({
  _openid: { type: String },
  toy_id: { type: String },
  apply_brw: { type: Boolean },
  time_apply_brw: { type: Date },
  pass_brw: { type: Boolean },
  time_pass_brw: { type: Date },
  apply_ret: { type: Boolean },
  time_apply_ret: { type: Date },
  pass_ret: { type: Boolean },
  time_pass_ret: { type: Date },
  comment: { type: String },
  time_comment: { type: Date }
});

// 使用定义的schema创建模型
const Borrow_Return = mongoose.model('Borrow_Return', Borrow_ReturnSchema,'Borrow_Return');
module.exports = Borrow_Return;