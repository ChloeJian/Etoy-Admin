// rear/controllers/UserController.js
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('获取User数据失败');
  }
};

exports.addUser = async (req, res) => {
  const user = new User({
    _openid: req.body._openid,
    user_name: req.body.user_name,
    user_sex: req.body.user_sex,
    user_idcard: req.body.user_idcard,
    user_birth: req.body.user_birth,
    user_tel: req.body.user_tel,
    user_play: req.body.user_play
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send('添加User数据失败');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('没有找到要删除的User');
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).send('删除User数据失败');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send('没有找到要更新的User');
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('修改User数据失败');
  }
};