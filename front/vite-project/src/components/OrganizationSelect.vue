<script setup>
import { getOrganizationsService } from '@/api/organization.js'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [String, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const organizationList = ref([])
const getOrganizations = async () => {
  try {
    const res = await getOrganizationsService();
    organizationList.value = res;
  } catch (error) {
    console.error('获取分类列表时发生错误:', error);
  }
};
getOrganizations();
</script>

<template>
  <!-- label 展示给用户看的，value 收集起来提交给后台的 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="organization in organizationList"
      :key="organization._id"
      :label="organization.organization_name"
      :value="organization._id"
    ></el-option>
  </el-select>
</template>