<template>
  <van-tabs
    line-width="50%"
    color="#409EFF"
    background="#F5F5F5"
    v-model="active"
    id="tabs"
  >
    <van-tab title="收入"></van-tab>
    <van-tab title="支出"></van-tab>
  </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      active: "0"
    };
  }
};
</script>
<style scoped>
</style>
