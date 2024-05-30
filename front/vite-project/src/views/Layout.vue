<script setup>
import {
  Compass,
  Present,
  Memo,
  Message,
  Sell,
  SoldOut,
  Notification,
  Setting,
  User,
  Upload,
  Key,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue';
import { useAdminStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const adminStore = useAdminStore()
const router = useRouter()
onMounted(() => {
  adminStore.getAdmin()
})
</script>

<template>

  <el-container class="layout-container" style="height: 580px">
    <el-aside width="200px">
      <el-scrollbar>
          <!-- 
            el-menu 整个菜单组件
            :default-active="$route.path"  配置默认高亮的菜单项
            router  router选项开启，el-menu-item 的 index 就是点击跳转的路径

            el-menu-item 菜单项
            index="/article/channel" 配置的是访问的跳转路径，配合default-active的值，实现高亮
          -->
        <el-menu 
          :default-openeds="['6']"
          active-text-color="skyblue"
          :default-active="$route.path"
          background-color="#232323"
          text-color="#fff"
          router>
          <el-menu-item index="/cate">
          <el-icon><Compass /></el-icon>
          <span>玩具分类</span>
        </el-menu-item>
        <el-menu-item index="/toy">
          <el-icon><Present /></el-icon>
          <span>玩具管理</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <el-icon><Memo /></el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <!-- 二级菜单 -->
        <el-sub-menu index="/check">
          <template #title>
            <el-icon><Message /></el-icon>
            <span>审批中心</span>
          </template>
          <el-menu-item index="/check/borrow">
            <el-icon><Sell /></el-icon>
            <span>审核借玩</span>
          </el-menu-item>
          <el-menu-item index="/check/return">
            <el-icon><SoldOut /></el-icon>
            <span>审核退玩</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/organization">
          <el-icon><Notification /></el-icon>
          <span>捐赠组织</span>
        </el-menu-item>
        
        <!-- 二级菜单 -->
        <el-sub-menu index="/admin">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>管理员设置</span>
          </template>
          <el-menu-item index="/admin/account">
            <el-icon><User /></el-icon>
            <span>账号信息</span>
          </el-menu-item>
          <el-menu-item index="/admin/password">
            <el-icon><Key /></el-icon>
            <span>修改密码</span>
          </el-menu-item>
        </el-sub-menu>

        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="display: flex; align-items: center;">
        <div style="font-size: 15px;">
          益玩村管理员：<strong>{{ adminStore.admin.admin_name }}</strong>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
      
      <el-footer style="display: flex;align-items: center;justify-content: center;font-size: 14px;color: #666;">益玩村 ©2024</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 10px;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>