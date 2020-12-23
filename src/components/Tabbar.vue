<template>
  <van-tabbar
    fixed
    class="tabbar"
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
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {};
</script>

<style scoped>
.tabbar {
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
</style>
