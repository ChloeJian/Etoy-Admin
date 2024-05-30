import axios from 'axios';

// 获取
const getBorrow_ReturnsService1 = async () => {
  try {  
    const response = await axios.get('http://localhost:3001/br/list1');  
    return response.data;  
  } catch (error) {  
    console.error('获取列表失败:', error);  
    throw error;  
  }  
};

// 获取
const getBorrow_ReturnsService2 = async () => {
  try {  
    const response = await axios.get('http://localhost:3001/br/list2');  
    return response.data;  
  } catch (error) {  
    console.error('获取列表失败:', error);  
    throw error;  
  }  
};

// 编辑
const updateBorrow_ReturnService = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/br/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('更新失败:', error);
    throw error;
  }
};


export { getBorrow_ReturnsService1, getBorrow_ReturnsService2, updateBorrow_ReturnService };