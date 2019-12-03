import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from '@/router'
import store from '@/store'
import '@/utils/permission'
import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
