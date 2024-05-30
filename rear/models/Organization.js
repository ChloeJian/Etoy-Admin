// rear/models/Organization.js
const mongoose = require('mongoose');

// 定义schema
const OrganizationSchema = new mongoose.Schema({
  org_name: { type: String },
  org_des: { type: String },
  org_tel: { type: String },
  org_email: { type: String }
});

// 使用定义的schema创建模型
const Organization = mongoose.model('Organization', OrganizationSchema,'Organization');
module.exports = Organization;