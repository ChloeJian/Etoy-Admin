// rear/controllers/AdminController.js
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({ admin_acc: req.params.admin_acc });
    res.json(admin);
  } catch (error) {
    res.status(500).send('获取Admin数据失败');
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const admin = new Admin({
      admin_acc: req.body.account,
      admin_pwd: req.body.password,
      admin_name: null,
      admin_sex: null,
      admin_idcard: null,
      admin_birth: null,
      admin_tel: null,
      admin_email: null
    });
    // 保存新的admin到数据库
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).send('添加Admin数据失败');
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).send('没有找到要删除的Admin');
    }
    res.json(deletedAdmin);
  } catch (error) {
    res.status(500).send('删除Admin数据失败');
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmin) {
      return res.status(404).send('没有找到要更新的Admin');
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).send('修改Admin数据失败');
  }
};