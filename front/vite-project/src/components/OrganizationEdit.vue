<script setup>
// OrganizationEdit.vue
import { ref, defineEmits, defineExpose } from 'vue';
import { addOrganizationService, updateOrganizationService } from '@/api/organization.js';
import { ElMessage } from 'element-plus';

const dialogVisible = ref(false);
const formRef = ref();
const formModel = ref({
    _id: '',
    org_name: '',
    org_des: '',
    org_tel: '',
    org_email: ''
});

const emit = defineEmits(['success'])
const onSubmit = async () => {
  const isEdit = formModel.value._id
  if (isEdit) {
    await updateOrganizationService(formModel.value._id, formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await addOrganizationService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

const organizationAddOrUpdate = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
}

// 向外暴露方法
defineExpose({
    organizationAddOrUpdate
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel._id ? '编辑组织' : '添加组织'"
    width="50%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="组织名称" prop="org_name">
        <el-input
          v-model="formModel.org_name"
          placeholder="请输入组织名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="组织描述" prop="org_des">
        <el-input
          v-model="formModel.org_des"
          placeholder="请输入组织描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="组织电话" prop="org_tel">
        <el-input
          v-model="formModel.org_tel"
          placeholder="请输入组织电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="组织邮箱" prop="org_email">
        <el-input
          v-model="formModel.org_email"
          placeholder="请输入组织邮箱"
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