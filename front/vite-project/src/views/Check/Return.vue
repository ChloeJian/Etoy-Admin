<script setup>
import { ref } from 'vue';
import { getBorrow_ReturnsService2, updateBorrow_ReturnService } from '@/api/borrow_return';
// import { formatTime } from '@/utils/format';
import {
  ElMessageBox,
  ElMessage
} from 'element-plus';

const brList = ref([]);
const loading = ref(false);

const getBorrow_Returns = async () => {
  loading.value = true;
  try {
    const res = await getBorrow_ReturnsService2();
    brList.value = res;
  } catch (error) {
    console.error('获取列表时发生错误:', error);
  } finally {
    loading.value = false;
  }
};

getBorrow_Returns();

const handlePass = async (br) => {
  try {
    const isConfirm = await ElMessageBox.confirm('确认要同意申请吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });
    if (isConfirm) {
      br.pass_ret = true;
      br.time_pass_ret = new Date();
      await updateBorrow_ReturnService(br._id,br);
      ElMessage.success('操作成功');
      await getBorrow_Returns();
    }
  } catch (error) {
    console.error('操作失败:', error);
  }
};

const handleReject = async (br) => {
  try {
    const isConfirm = await ElMessageBox.confirm('确认要拒绝申请吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });
    if (isConfirm) {
      br.pass_ret = false;
      br.time_pass_ret = new Date();
      await updateBorrow_ReturnService(br._id,br);
      ElMessage.success('操作成功');
      await getBorrow_Returns();
    }
  } catch (error) {
    console.error('操作失败:', error);
  }
};
</script>

<template>

      <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>审批借玩</strong>
          </div>
        </div>
      </div>
      <el-scrollbar>
          <el-table v-loading="loading" :data="brList" style="width: 100%">
            <el-table-column prop="_id" label="记录ID"></el-table-column>
            <el-table-column prop="_openid" label="用户OPENID"></el-table-column>
            <el-table-column prop="toy_id" label="玩具ID"></el-table-column>
            <el-table-column prop="time_apply_ret" label="申请时间"></el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button type="primary" plain v-if="row.pass_ret==null" @click="handlePass(row)">同意</el-button>
                <el-button type="danger" plain v-if="row.pass_ret==null" @click="handleReject(row)">拒绝</el-button>
                <el-button type="primary" plain v-if="row.pass_ret===true" disabled>已同意</el-button>
                <el-button type="danger" plain v-if="row.pass_ret===false" disabled>已拒绝</el-button>
              </template>
            </el-table-column>

            <template #empty>
              <el-empty description="没有数据"></el-empty>
            </template>
          </el-table>
      </el-scrollbar>

</template>

<style scoped>
</style>