<script setup>
import { ref } from 'vue';
import { getUsersService } from '@/api/user';

const userList = ref([]);
const loading = ref(false);

const getUsers = async () => {
  loading.value = true;
  try {
    const res = await getUsersService();
    userList.value = res;
  } catch (error) {
    console.error('获取用户列表时发生错误:', error);
  } finally {
    loading.value = false;
  }
};

getUsers();
</script>

<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>用户管理</strong>
          </div>
        </div>
    </div>
    <el-scrollbar>
        <el-table :data="userList" style="width: 100%">
            <el-table-column prop="user_name" label="姓名"></el-table-column>
            <el-table-column prop="user_sex" label="性别"></el-table-column>
            <el-table-column prop="user_birth" label="生日"></el-table-column>
            <el-table-column prop="user_idcard" label="身份证号"></el-table-column>
            <el-table-column prop="user_tel" label="电话"></el-table-column>
            <el-table-column prop="user_play" label="累计借玩次数"></el-table-column>
            <template #empty>
              <el-empty description="没有数据"></el-empty>
            </template>
        </el-table>
    </el-scrollbar>
</template>

<style scoped>
</style>