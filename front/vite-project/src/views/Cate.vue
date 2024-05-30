<script setup>
import { ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { getCatesService, deleteCateService } from '@/api/cate';
import CateEdit from '@/components/CateEdit.vue'
import {
  ElMessageBox,
  ElMessage
} from 'element-plus';

const cateList = ref([]);
const loading = ref(false);
const dialog = ref(false);

const getCates = async () => {
  loading.value = true;
  try {
    const res = await getCatesService();
    cateList.value = res;
  } catch (error) {
    console.error('获取分类列表时发生错误:', error);
  } finally {
    loading.value = false;
  }
};

getCates();

const handleEdit = (row) => {
  dialog.value.cateAddOrUpdate(row)
};

const handleAdd = () => {
  dialog.value.cateAddOrUpdate({})
};

const handleDelete = async (id) => {
  try {
    const isConfirm = await ElMessageBox.confirm('确认要删除该分类吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });
    if (isConfirm) {
      await deleteCateService(id);
      ElMessage.success('删除成功');
      await getCates();
    }
  } catch (error) {
    console.error('删除分类失败:', error);
  }
};

const onSuccess = () => {
  getCates()
};
</script>

<template>

      <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>玩具分类</strong>
          </div>
          <el-button type="primary" @click="handleAdd">添加分类</el-button>
        </div>
      </div>
      <el-scrollbar>
          <el-table v-loading="loading" :data="cateList" style="width: 100%">
          <!-- <el-table-column prop="_id" label="ID" width="300"></el-table-column> -->
            <el-table-column prop="cate_name" label="分类名称"></el-table-column>
            <el-table-column prop="cate_des" label="分类描述"></el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button type="primary" :icon="Edit" circle plain @click="handleEdit(row)"></el-button>
                <el-button type="danger" :icon="Delete" circle plain @click="handleDelete(row._id)"></el-button>
              </template>
            </el-table-column>

            <template #empty>
              <el-empty description="没有数据"></el-empty>
            </template>
          </el-table>
      </el-scrollbar>
    <cate-edit ref="dialog" @success="onSuccess"></cate-edit>

</template>

<style scoped>
</style>