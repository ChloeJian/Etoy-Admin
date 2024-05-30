<script setup>
import { ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { getOrganizationsService, deleteOrganizationService } from '@/api/organization';
import OrganizationEdit from '@/components/OrganizationEdit.vue'
import {
  ElMessageBox,
  ElMessage
} from 'element-plus';

const organizationList = ref([]);
const loading = ref(false);
const dialog = ref(false);

const getOrganizations = async () => {
  loading.value = true;
  try {
    const res = await getOrganizationsService();
    organizationList.value = res;
  } catch (error) {
    console.error('获取组织列表时发生错误:', error);
  } finally {
    loading.value = false;
  }
};

getOrganizations();

const handleEdit = (row) => {
  dialog.value.organizationAddOrUpdate(row)
};

const handleAdd = () => {
  dialog.value.organizationAddOrUpdate({})
};

const handleDelete = async (id) => {
  try {
    const isConfirm = await ElMessageBox.confirm('确认要删除该组织吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });
    if (isConfirm) {
      await deleteOrganizationService(id);
      ElMessage.success('删除成功');
      await getOrganizations();
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
};

const onSuccess = () => {
  getOrganizations()
};
</script>

<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>捐赠组织管理</strong>
          </div>
          <el-button type="primary" @click="handleAdd">添加组织</el-button>
        </div>
    </div>
    <el-scrollbar>
        <el-table :data="organizationList" style="width: 100%">
            <el-table-column prop="org_name" label="组织名称"></el-table-column>
            <el-table-column prop="org_des" label="组织描述"></el-table-column>
            <el-table-column prop="org_tel" label="组织电话"></el-table-column>
            <el-table-column prop="org_email" label="组织邮箱"></el-table-column>
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
    <organization-edit ref="dialog" @success="onSuccess"></organization-edit>
</template>

<style scoped>
</style>