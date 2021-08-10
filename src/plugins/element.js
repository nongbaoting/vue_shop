import Vue from 'vue'
// 全部导入element-ui
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })

// 导入jquery
// import JqContext from 'jquery-contextmenu'
// import jstree from 'jstree'
// import 'jquery-contextmenu/dist/jquery.contextMenu.css'
// import 'jstree/dist/themes/default/style.css'
// Vue.use(JqContext)
// Vue.use(jstree)

import axios from 'axios'
// 配置根路径
// import qs from 'qs'
// Vue.prototype.$qs = qs
axios.defaults.baseURL = 'http://127.0.0.1:8989/protein/'
// axios.defaults.baseURL = 'http://222.200.186.47:8989/protein/' // 提交服务器时需要

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')

  config.headers.common['X-Requested-With'] = window.sessionStorage.getItem(
    'XMLHttpRequest'
  )
  config.headers.common['X-CSRFToken'] = window.sessionStorage.getItem(
    'X-CSRFToken'
  )
  // console.log(config)
  return config
})

Vue.prototype.$http = axios

import { Viewer } from 'molstar/build/viewer/molstar'
Vue.prototype.$molstar = Viewer
