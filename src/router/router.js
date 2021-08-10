import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import Structure_prediction from '../components/structure/Prediction.vue'
import Structure_results from '../components/structure/Results.vue'
import Structure_queue from '../components/structure/Queue.vue'
import t_query from '../components/test/t_jquery.vue'
import Molstar from '../components/structure/Molstar.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/home' },

  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/predict/structure/', component: Structure_prediction },
      { path: '/predict/structure/result/', component: Structure_results },
      { path: '/predict/structure/queue/', component: Structure_queue },
      { path: '/home/test', component: t_query }
    ]
  },
  { path: '/molstar', component: Molstar }
]

const router = new VueRouter({
  // mode: 'history',
  // 编译加base目录和Apache下的目录一致
  base: '/protein/',
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行 ， next()放行， next('/login')强制跳转
  // if (to.path === '/login') return next()
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/login')
  next()
})

export default router
