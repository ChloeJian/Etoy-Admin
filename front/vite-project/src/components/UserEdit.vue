<script setup>
// UserEdit.vue
import { ref, defineEmits, defineExpose } from 'vue';
import { addUserService, updateUserService } from '@/api/user.js';
import { ElMessage } from 'element-plus';

const dialogVisible = ref(false);
const formRef = ref();
const formModel = ref({
    _id: '',
    _openid: '',
    user_name: '',
    user_sex: '',
    user_birth: '',
    user_idcard: '',
    user_tel: '',
    user_play: ''
});

const emit = defineEmits(['success'])
const onSubmit = async () => {
  const isEdit = formModel.value._id
  if (isEdit) {
    await updateUserService(formModel.value._id, formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await addUserService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

// 组件对外暴露一个方法userAddOrUpdate，基于userAddOrUpdate传来的参数，区分添加还是编辑
// userAddOrUpdate({})  => 表单无需渲染，说明是添加
// userAddOrUpdate({ _id, user_name, ... })  => 表单需要渲染，说明是编辑
// userAddOrUpdate调用后，可以打开弹窗
const userAddOrUpdate = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
}

// 向外暴露方法
defineExpose({
    userAddOrUpdate
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel._id ? '编辑用户' : '添加用户'"
    width="50%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="姓名" prop="user_name">
        <el-input
          v-model="formModel.user_name"
          placeholder="请输入用户姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="user_sex">
        <el-input
          v-model="formModel.user_sex"
          placeholder="请输入用户性别"
        ></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="user_birth">
        <el-input
          v-model="formModel.user_birth"
          placeholder="请输入用户生日"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="user_idcard">
        <el-input
          v-model="formModel.user_idcard"
          placeholder="请输入用户身份证号"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="user_tel">
        <el-input
          v-model="formModel.user_tel"
          placeholder="请输入用户电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="累计借玩次数" prop="user_play">
        <el-input
          v-model="formModel.user_play"
          placeholder="请输入累计借玩次数"
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