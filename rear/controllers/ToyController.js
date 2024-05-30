// rear/controllers/ToyController.js
const Toy = require('../models/Toy');

exports.getToys = async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (error) {
    res.status(500).send('获取Toy数据失败');
  }
};

exports.addToy = async (req, res) => {
  const toy = new Toy({
    toy_name: req.body.toy_name,
    cate_id: req.body.cate_id,
    cate_name: req.body.cate_name,
    toy_des: req.body.toy_des,
    toy_picurl: req.body.toy_picurl,
    toy_total: req.body.toy_total,
    toy_current: req.body.toy_current,
    toy_maxT: req.body.toy_maxT,
    toy_pub: req.body.toy_pub,
    toy_playacc: req.body.toy_playacc
  });

  try {
    const newToy = await toy.save();
    res.status(201).json(newToy);
  } catch (error) {
    res.status(400).send('添加Toy数据失败');
  }
};

exports.deleteToy = async (req, res) => {
  try {
    const deletedToy = await Toy.findByIdAndDelete(req.params.id);
    if (!deletedToy) {
      return res.status(404).send('没有找到要删除的Toy');
    }
    res.json(deletedToy);
  } catch (error) {
    res.status(500).send('删除Toy数据失败');
  }
};

exports.updateToy = async (req, res) => {
  try {
    const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedToy) {
      return res.status(404).send('没有找到要更新的Toy');
    }
    res.json(updatedToy);
  } catch (error) {
    res.status(500).send('修改Toy数据失败');
  }
};