<script setup>
import { getCatesService } from '@/api/cate.js'
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
const cateList = ref([])
const getCates = async () => {
  try {
    const res = await getCatesService();
    cateList.value = res;
  } catch (error) {
    console.error('获取分类列表时发生错误:', error);
  }
};
getCates();
</script>

<template>
  <!-- label 展示给用户看的，value 收集起来提交给后台的 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="cate in cateList"
      :key="cate._id"
      :label="cate.cate_name"
      :value="cate._id"
    ></el-option>
  </el-select>
</template>