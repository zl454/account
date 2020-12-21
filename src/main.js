import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/index.css'

// Vue.use(Vant);
// 阻止生产模式消息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
