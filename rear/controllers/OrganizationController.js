// rear/controllers/OrganizationController.js
const Organization = require('../models/Organization');

exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).send('获取Organization数据失败');
  }
};

exports.addOrganization = async (req, res) => {
  const organization = new Organization({
    org_name: req.body.org_name,
    org_des: req.body.org_des,
    org_tel: req.body.org_tel,
    org_email: req.body.org_email
  });

  try {
    const newOrganization = await organization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(400).send('添加Organization数据失败');
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const deletedOrganization = await Organization.findByIdAndDelete(req.params.id);
    if (!deletedOrganization) {
      return res.status(404).send('没有找到要删除的Organization');
    }
    res.json(deletedOrganization);
  } catch (error) {
    res.status(500).send('删除Organization数据失败');
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrganization) {
      return res.status(404).send('没有找到要更新的Organization');
    }
    res.json(updatedOrganization);
  } catch (error) {
    res.status(500).send('修改Organization数据失败');
  }
};