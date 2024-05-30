<script setup>
import { ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import CateSelect from '@/components/CateSelect.vue'
import ToyEdit from '@/components/ToyEdit.vue'
import { getToysService, deleteToyService } from '@/api/toy.js';
import { formatTime } from '@/utils/format.js'
import {
  ElMessageBox,
  ElMessage
} from 'element-plus';

const toyList = ref([]);
const loading = ref(false);
const drawer = ref(false);
// 定义请求参数对象
const params = ref({
  cate_id: '',
  state: ''
})

const getToys = async () => {
  loading.value = true;
  try {
    const res = await getToysService();
    toyList.value = res;
  } catch (error) {
    console.error('获取玩具列表时发生错误:', error);
  } finally {
    loading.value = false;
  }
};

getToys();

// 搜索逻辑 => 按照最新的条件，重新检索
const onSearch = () => {
  getToys()
}

// 重置逻辑 => 将筛选条件清空，重新检索
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  getToys()
}

const handleEdit = (row) => {
  drawer.value.toyAddOrUpdate(row)
};

const handleAdd = () => {
  drawer.value.toyAddOrUpdate({})
};

const handleDelete = async (id) => {
  try {
    const isConfirm = await ElMessageBox.confirm('确认要删除该玩具吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });
    if (isConfirm) {
      await deleteToyService(id);
      ElMessage.success('删除成功');
      await getToys();
    }
  } catch (error) {
    console.error('删除玩具失败:', error);
  }
};

const onSuccess = () => {
  getToys()
};
</script>

<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>玩具管理</strong>
          </div>
          <el-button type="primary" @click="handleAdd">添加玩具</el-button>
        </div>
    </div>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item style="margin-left: 10px;" label="玩具分类:">
        <!-- Vue2 => v-model :value 和 @input 的简写 -->
        <!-- Vue3 => v-model :modelValue 和 @update:modelValue 的简写 -->
        <cate-select v-model="params.cate_id"></cate-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <!-- 这里后台标记发布状态，就是通过中文标记的，已发布 / 草稿 -->
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-scrollbar>
          <el-table :data="toyList" style="width: 100%">
            <el-table-column prop="toy_name" label="玩具名称"></el-table-column>
            <el-table-column prop="cate_name" label="玩具分类"></el-table-column>
            <el-table-column prop="toy_total" label="库存余量"></el-table-column>
            <el-table-column prop="toy_current" label="玩具总量"></el-table-column>
            <el-table-column prop="toy_playacc" label="借玩次数"></el-table-column>
            <el-table-column prop="toy_maxT" label="最长借玩周期"></el-table-column>
            <!-- <el-table-column prop="organization_name" label="捐赠组织"></el-table-column> -->
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
    <!-- 编辑玩具 -->
    <toy-edit ref="drawer" @success="onSuccess"></toy-edit>
</template>

<style scoped>
</style>