import axios from 'axios';

// 获取组织列表
const getOrganizationsService = async () => {
  try {
    const response = await axios.get('http://localhost:3001/organization/list');
    return response.data;
  } catch (error) {
    console.error('获取组织列表失败:', error);
    throw error;
  }
};

// 添加组织
const addOrganizationService = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/organization/add', data);
    return response.data;
  } catch (error) {
    console.error('添加组织失败:', error);
    throw error;
  }
};

// 编辑组织
const updateOrganizationService = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/organization/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('编辑组织失败:', error);
    throw error;
  }
};

// 删除组织
const deleteOrganizationService = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/organization/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除组织失败:', error);
    throw error;
  }
};

export { getOrganizationsService, addOrganizationService, updateOrganizationService, deleteOrganizationService };