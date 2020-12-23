<template>
  <div id="app">
    <transition mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "components/Tabbar";
export default {
  components: {
    Tabbar,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
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
