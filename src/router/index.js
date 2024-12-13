import { createRouter, createWebHistory } from 'vue-router'

// import { createRouter, createWebHashHistory } from "vue-router";

const routers = [

  {
    path: '/',
    name: '/',
    // component: () => import('@/App.vue')
    component: () => import('@/views/home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/Baike/:id?',
    name: 'Baike',
    component: () => import('@/views/wike/BaikeId.vue'),
    props: true,
    beforeEnter(to, from, next) {
      if(!to.params.id){
        next({name:'BaikeList'})
      }else{
        next()
      }
    },
  },
  {
    path: '/base',
    name: 'base',
    component: () => import('@/views/base.vue')
  },
  {
    path: '/BaikeList',
    name: 'BaikeList',
    component: () => import('@/views/wike/BaikeList.vue')
  },
  {
    path: '/BaikeArticleList',
    name: 'BaikeArticleList',
    component: () => import('@/views/wike/BaikeArticleList.vue')
  },
  {
    path: '/Article/:id',
    name: 'Article',
    component: () => import('@/views/wike/ArticleId.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/user.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue')
  },
  // {
  //   path: '/loginOut',
  //   name: 'LoginOut',
  //   component: () => import('@/views/user/loginOut.vue')
  // },

]
const router = createRouter({
  history: createWebHistory(),
  
  // 哈希模式 
  // history:createWebHashHistory(),
  routes: routers
})

export default router
