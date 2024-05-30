// rear/controllers/Borrow_ReturnController.js
const Borrow_Return = require('../models/Borrow_Return');
const mongoose = require('mongoose');

exports.getBorrow_Returns1 = async (req, res) => {
  try {
    const brs = await Borrow_Return.find({ apply_brw: true });
    res.json(brs);
  } catch (error) {
    res.status(500).send('获取br数据失败');
  }
};

exports.getBorrow_Returns2 = async (req, res) => {
  try {
    const brs = await Borrow_Return.find({ apply_ret: true });
    res.json(brs);
  } catch (error) {
    res.status(500).send('获取br数据失败');
  }
};

exports.updateBorrow_Return = async (req, res) => {
  try {
    const updatedBorrow_Return = await Borrow_Return.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBorrow_Return) {
      return res.status(404).send('没有找到要更新的br');
    }
    res.json(updatedBorrow_Return);
  } catch (error) {
    res.status(500).send('修改br数据失败');
  }
};