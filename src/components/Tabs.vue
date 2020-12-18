<template>
  <van-tabs
    line-width="50%"
    color="#409EFF"
    background="#F5F5F5"
    v-model="type"
    id="tabs"
  >
    <van-tab
      name="收入"
      title="收入"
    ></van-tab>
    <van-tab
      name="支出"
      title="支出"
    ></van-tab>
  </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      type: "收入",
    };
  },
  watch: {
    type: function () {
      this.$emit("change-type", this.type);
    },
  },
};
</script>
<style scoped>
</style>
