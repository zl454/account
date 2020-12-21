<template>
  <div id="app">
    <transition mode="out-in">
      <keep-alive>
        <router-view />

      </keep-alive>
    </transition>
    <van-tabbar
      fixed
      id="tabbar"
      route
    >
      <van-tabbar-item
        replace
        to="/"
        icon="records"
      >
        记账
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/label"
        icon="label-o"
      >
        标签
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/count"
        icon="bar-chart-o"
      >
        统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {};
</script>

<style>
/* * {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} */

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  overflow-x: hidden;
}
#tabbar {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-top: 1px solid #cbcbcb;
}
.van-icon {
  font-size: 24px;
}

.van-tabbar-item {
  flex-grow: 1;
}
.van-tabbar-item--active {
  color: #409eff;
  height: 100%;
}

/* 动画过渡效果 */
/*  元素插入前 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
/*  元素离开过渡的结束状态 */
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
