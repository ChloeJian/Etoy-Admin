<script setup>
import { ref } from 'vue'
import { updateAdminService } from '@/api/admin'
import { useAdminStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const adminStore = useAdminStore()
const router = useRouter()
onMounted(() => {
  adminStore.getAdmin()
})
const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkDifferent = (rule, value, callback) => {
  // 校验新密码和原密码不能一样
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码一样'))
  } else {
    callback()
  }
}
const checkSameAsNewPwd = (rule, value, callback) => {
  // 校验确认密码必须和新密码一样
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码必须和新密码一样'))
  } else {
    callback()
  }
}
const rules = ref({
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '原密码长度在6~15位之间', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '新密码长度在6~15位之间', trigger: 'blur' },
    { validator: checkDifferent, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '确认密码长度在6~15位之间', trigger: 'blur' },
    { validator: checkSameAsNewPwd, trigger: 'blur' }
  ]
})

const submitForm = async () => {
  await formRef.value.validate()
  const newAdmin = {
    admin_acc: adminStore.admin.admin_acc,
    admin_pwd: pwdForm.value.new_pwd,
    admin_name:adminStore.admin.admin_name,
    admin_sex: adminStore.admin.admin_sex,
    admin_idcard: adminStore.admin.admin_idcard,
    admin_birth: adminStore.admin.admin_birth,
    admin_tel: adminStore.admin.admin_tel,
    admin_email: adminStore.admin.admin_email
  }
  await updateAdminService(newAdmin)
  ElMessage.success('密码修改成功')

  // 密码修改成功后，退出重新登录
  // 清空本地存储的 token 和信息
  adminStore.setToken('')
  adminStore.setAdmin({})

  // 拦截登录
  router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>
<template>
    <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>修改密码</strong>
          </div>
        </div>
    </div>
    <!-- 表单部分 -->
    <el-form ref="formRef" :model="pwdForm" :rules="rules" label-width="100px">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
         <el-input v-model="pwdForm.re_pwd" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改密码</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
</template>
