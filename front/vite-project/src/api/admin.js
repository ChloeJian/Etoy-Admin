import axios from 'axios';

// 获取
const getAdminService = async (admin_acc) => {
  try {  
    const response = await axios.get(`http://localhost:3001/admin/data/${admin_acc}`);  
    return response;  
  } catch (error) {  
    console.error('获取管理员失败:', error);  
    throw error;  
  }  
};

// 添加
const addAdminService = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/admin/add', data);
    return response.data;
  } catch (error) {
    console.error('添加管理员失败:', error);
    throw error;
  }
};

// 编辑
const updateAdminService = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/admin/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('编辑管理员失败:', error);
    throw error;
  }
};

// 删除
const deleteAdminService = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/admin/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除管理员失败:', error);
    throw error;
  }
};

export { getAdminService, addAdminService, updateAdminService, deleteAdminService };