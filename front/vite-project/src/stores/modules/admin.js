import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAdminService } from '@/api/admin'

// 管理员模块 token setToken removeToken
export const useAdminStore = defineStore(
  'etoy-admin',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const admin = ref({})
    const getAdmin = async () => {
      const res = await getAdminService() // 请求获取数据
      admin.value = res.data.data
    }
    const setAdmin = (obj) => {
      admin.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      admin,
      getAdmin,
      setAdmin
    }
  },
  {
    persist: true
  }
)
