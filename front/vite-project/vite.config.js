import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {  
    alias: {  
      '@': '/src' // 将 @ 符号映射到项目的 src 目录  
    }  
  }  
})
