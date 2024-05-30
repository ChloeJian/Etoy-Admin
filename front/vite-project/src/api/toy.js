import axios from 'axios';

// 获取玩具列表
const getToysService = async () => {
  try {  
    const response = await axios.get('http://localhost:3001/toy/list');  
    return response.data;  
  } catch (error) {  
    console.error('获取玩具列表失败:', error);  
    throw error;  
  }  
};

// 添加玩具
const addToyService = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/toy/add', data);
    return response.data;
  } catch (error) {
    console.error('添加玩具失败:', error);
    throw error;
  }
};

// 编辑玩具
const updateToyService = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/toy/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('编辑玩具失败:', error);
    throw error;
  }
};

// 删除玩具
const deleteToyService = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/toy/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除玩具失败:', error);
    throw error;
  }
};

export { getToysService, addToyService, updateToyService, deleteToyService };