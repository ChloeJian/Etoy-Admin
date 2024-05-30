// rear/controllers/CateController.js
const Cate = require('../models/Cate');
const mongoose = require('mongoose');

exports.getCates = async (req, res) => {
  try {
    const cates = await Cate.find();
    res.json(cates);
  } catch (error) {
    res.status(500).send('获取Cate数据失败');
  }
};

exports.addCate = async (req, res) => {
  try {
    const cate = new Cate({
      cate_name: req.body.cate_name,
      cate_des: req.body.cate_des
    });
    
    // 保存新的cate到数据库
    const newCate = await cate.save();
    res.status(201).json(newCate);
  } catch (error) {
    res.status(400).send('添加Cate数据失败');
  }
};

exports.deleteCate = async (req, res) => {
  try {
    const deletedCate = await Cate.findByIdAndDelete(req.params.id);
    if (!deletedCate) {
      return res.status(404).send('没有找到要删除的Cate');
    }
    res.json(deletedCate);
  } catch (error) {
    res.status(500).send('删除Cate数据失败');
  }
};

exports.updateCate = async (req, res) => {
  try {
    const updatedCate = await Cate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCate) {
      return res.status(404).send('没有找到要更新的Cate');
    }
    res.json(updatedCate);
  } catch (error) {
    res.status(500).send('修改Cate数据失败');
  }
};