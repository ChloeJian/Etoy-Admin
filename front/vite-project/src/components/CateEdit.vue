<script setup>
import { ref, defineEmits, defineExpose } from 'vue';
import { addCateService, updateCateService } from '@/api/cate.js';
import { ElMessage } from 'element-plus';

const dialogVisible = ref(false);
const formRef = ref();
const formModel = ref({
  cate_name: '',
  cate_des: ''
});

const emit = defineEmits(['success'])
const onSubmit = async () => {
  const isEdit = formModel.value._id
  if (isEdit) {
    await updateCateService(formModel.value._id, formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await addCateService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

// 组件对外暴露一个方法cateAddOrUpdate，基于cateAddOrUpdate传来的参数，区分添加还是编辑
// cateAddOrUpdate({})  => 表单无需渲染，说明是添加
// cateAddOrUpdate({ _id, cate_name, ... })  => 表单需要渲染，说明是编辑
// cateAddOrUpdate调用后，可以打开弹窗
const cateAddOrUpdate = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
}

// 向外暴露方法
defineExpose({
  cateAddOrUpdate
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel._id ? '编辑分类' : '添加分类'"
    width="50%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="cate_des">
        <el-input
          v-model="formModel.cate_des"
          placeholder="请输入分类描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>