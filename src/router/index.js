import Vue from 'vue'
import VueRouter from 'vue-router'
import Accounts from '../views/Accounts.vue'
import Count from '../views/Count.vue'
import Label from '../views/Label.vue'
import EditLabel from '../views/EditLabel.vue'
import QRcode from '../views/QRcode.vue'

Vue.use(VueRouter)

// 解决导航栏重读点击报错问题
// 方法一：
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
// 方法二：（还是报错）
/* const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
} */


const routes = [
  {
    path: '/',
    name: 'Accounts',
    component: Accounts,
  },
  {
    path: '/count',
    name: 'Count',
    component: Count
    // component: () => import(/* webpackChunkName: "about" */ '../views/Count.vue')
  },
  {
    path: '/label',
    name: 'Label',
    component: Label
  },
  {
    path: '/qrcode',
    name: 'QRcode',
    component: QRcode
  },
  {
    path: "/label/edit/:id",
    component: EditLabel,
    props: true
  },
]

const router = new VueRouter({
  routes
})

// 全局路由前置守卫，识别非移动端状态下页面跳转到二维码页面
router.beforeEach((to, from, next) => {
  // 识别到设备为移动端的时候 flag 为 false
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
    ? false
    : true;
  if (to.name !== "QRcode" && flag) {
    next({ name: 'QRcode' })
  } else if (to.name === "QRcode" && !flag) {
    next({ name: "Accounts" })
  }
  next()
})


export default router
