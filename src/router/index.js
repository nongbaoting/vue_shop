import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/login'},
  { path: '/home', component: Home },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行 ， next()放行， next('/login')强制跳转
  if (to.path === "/login") return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()

})

export default router