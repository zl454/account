import Vue from 'vue'
import VueRouter from 'vue-router'
import Accounts from '../views/Accounts.vue'
import Count from '../views/Count.vue'
import Label from '../views/Label.vue'
import EditLabel from '../views/EditLabel.vue'

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
    path: "/label/edit/:id",
    component: EditLabel,
    props: true
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     from.name ? next({ name: from.name }) : next('/')
//   } else {
//     next()
//   }
// })
// router.afterEach((to, from) => {
//   console.log(to);//到达的路由
//   console.log(from);//离开的路由
// })

export default router
