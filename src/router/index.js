import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',//如果父路由有默认子路由，那他的name没有意义
    component: () => import('@/views/login')
  },
  {
    path: '/',//默认子路由，只能有一个
    // name: 'layout',
    component: () => import('@/views/layout'),
    children:
      [{
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      }
      ]
  },
  {
    path: '/search',
    name: 'aearch',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true//开启props传参，路由参数映射到组件的props数据中
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    props: true//开启props传参，路由参数映射到组件的props数据中
  },
]

const router = new VueRouter({
  routes
})

export default router
