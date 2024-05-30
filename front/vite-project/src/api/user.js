import axios from 'axios';

// 获取用户列表
const getUsersService = async () => {
  try {
    const response = await axios.get('http://localhost:3001/user/list');
    return response.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
};

// 添加用户
const addUserService = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/user/add', data);
    return response.data;
  } catch (error) {
    console.error('添加用户失败:', error);
    throw error;
  }
};

// 编辑用户
const updateUserService = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/user/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('编辑用户失败:', error);
    throw error;
  }
};

// 删除用户
const deleteUserService = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除用户失败:', error);
    throw error;
  }
};

export { getUsersService, addUserService, updateUserService, deleteUserService };