<template>
  <div id="app">
    <div
      v-if="flag"
      id="code"
    >
      <h2 style="color:yellow">请使用手机扫一扫体验</h2>
    <QRCanvas :options="options"/>
    </div>
    <transition mode="out-in">
      <router-view />
    </transition>
    <van-tabbar
      fixed
      id="nav"
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
import { QRCanvas } from 'qrcanvas-vue';
export default {
  components: {
 QRCanvas,
 },
  data() {
    return {
      flag: false,
      options:{
        cellSize: 8,
        padding:8,
        correctLevel: 'L',
        foreground: 'blue',
        data:'http://zl.flynn.cool/account/',
        logo:{
          text:'轻松记',
          options: {
          color: 'dodgerblue',
            }
          }
      }
    };
  },
  created() {
    this.isMobile();
  },
  methods: {
    isMobile() {
      this.flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
        ? 0
        : 1;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  height: 60px;
  width: 100%;
  /* position: fixed;
  bottom: 0; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #f5f5f5;
  border-top: 1px solid #cbcbcb;
}
#code {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 999;
  cursor: pointer;
}
.van-icon {
  font-size: 24px;
}

.van-tabbar-item {
  flex-grow: 1;
}
.van-tabbar-item--active {
  color: #409eff;
}

/* 动画效果 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  /* position: absolute; */
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
