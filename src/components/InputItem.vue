<template>
  <van-cell-group>
    <van-field
      v-model="value"
      label="备注"
      placeholder="请输入备注"
    />
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return { value: "" };
  },
  methods: {}
};
</script>
<style scoped>
.van-cell {
  background-color: #f5f5f5;
}
</style>
