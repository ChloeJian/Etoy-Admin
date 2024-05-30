import axios from 'axios';

// 获取分类
const getCatesService = async () => {
  try {  
    const response = await axios.get('http://localhost:3001/cate/list');  
    return response.data;  
  } catch (error) {  
    console.error('获取分类列表失败:', error);  
    throw error;  
  }  
};

// 添加分类
const addCateService = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/cate/add', data);
    return response.data;
  } catch (error) {
    console.error('添加分类失败:', error);
    throw error;
  }
};

// 编辑分类
const updateCateService = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/cate/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('编辑分类失败:', error);
    throw error;
  }
};

// 删除分类
const deleteCateService = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/cate/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除分类失败:', error);
    throw error;
  }
};

export { getCatesService, addCateService, updateCateService, deleteCateService };