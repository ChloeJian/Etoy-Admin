<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores'
import { updateAdminService } from '@/api/admin'

const formRef = ref()

// 使用仓库中数据的初始值(无需响应式)解构无问题
const {
  admin: { _id,admin_account,admin_pwd,admin_name,admin_sex,admin_idcard,admin_birth,admin_tel,admin_email },
  getAdmin
} = useAdminStore()

const form = ref({ _id,admin_account,admin_pwd,admin_name,admin_sex,admin_idcard,admin_birth,admin_tel,admin_email })

const rules = ref({
  admin_name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    {
      pattern: /^\S{2,8}/,
      message: '姓名长度在2-8个非空字符',
      trigger: 'blur'
    }
  ],
  admin_sex:[
  { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  admin_idcard:[
  { required: true, message: '请输入身份证号码', trigger: 'blur' }
  ],
  admin_birth:[
  { required: true, message: '请选择生日', trigger: 'blur' }
  ],
  admin_tel:[
  { required: true, message: '请输入电话', trigger: 'blur' }
  ],
  admin_email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
})

const submitForm = async () => {
  // 等待校验结果
  await formRef.value.validate()
  // 提交修改
  await updateAdminService(form.value)
  // 通知 admin 模块，进行数据的更新
  getAdmin()
  // 提示用户
  ElMessage.success('修改成功')
}
</script>
<template>
    <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 20px; padding: 10px;">
            <strong>账号信息</strong>
          </div>
        </div>
    </div>
    <!-- 表单部分 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="管理员账号">
        <el-input v-model="form.admin_account" disabled>jianchang</el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="admin_name">
        <el-input v-model="form.admin_name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="admin_sex">
      <el-radio-group v-model="form.admin_sex">
        <el-radio value="男">男</el-radio>
        <el-radio value="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="身份证号码" prop="admin_idcard">
        <el-input v-model="form.admin_idcard"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="admin_birth">
      <el-col :span="20">
        <el-date-picker
          v-model="form.admin_birth"
          type="date"
          placeholder="请选择生日"
          style="width: 100%"
        />
      </el-col>
      </el-form-item>
      <el-form-item label="电话" prop="admin_tel">
        <el-input v-model="form.admin_tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="admin_email">
        <el-input v-model="form.admin_email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
</template>
