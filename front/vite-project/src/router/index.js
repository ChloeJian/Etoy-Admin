// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import useAdminStore from '@/stores'

const router = createRouter({
  history: createWebHistory('/EtoyAdmin/'),
  routes: [
    { path: '/login', component: () => import('@/views/Login.vue') }, // 登录注册页
    {
        path: '/',
        component: () => import('@/views/Layout.vue'),
        redirect: '/toy',
        children: [
            {
                path: '/cate', // 玩具分类
                component: () => import('@/views/Cate.vue')
              },
              {
                path: '/toy', // 玩具管理
                component: () => import('@/views/Toy.vue')
              },
              {
                path: '/user', // 用户管理
                component: () => import('@/views/User.vue')
              },
              {
                path: '/check/borrow', // 审批借玩
                component: () => import('@/views/Check/Borrow.vue')
              },
              {
                path: '/check/return', // 审批退玩
                component: () => import('@/views/Check/Return.vue')
              },
              {
                path: '/organization', // 捐赠组织
                component: () => import('@/views/Organization.vue')
              },
              {
                path: '/admin/account', // 账号信息
                component: () => import('@/views/Admin/AdminAccount.vue')
              },
              {
                path: '/admin/password', // 修改密码
                component: () => import('@/views/Admin/AdminPassword.vue')
              }
        ]
    }
  ]
})

// 访问拦截
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useAdminStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router