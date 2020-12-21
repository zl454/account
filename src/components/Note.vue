<template>
  <van-cell-group class="note-container">
    <van-field
      v-model="value"
      label="备注："
      placeholder="请输入备注"
      @change="$emit('change-note',value)"
    />
  </van-cell-group>
</template>

<script>
import Vue from "vue";
import { Field, CellGroup } from "vant";
Vue.use(Field);
Vue.use(CellGroup);

export default {
  data() {
    return { value: "" };
  },
  methods: {},
};
</script>
<style scoped>
.note-container {
  padding: 10px 0;
  background-color: #f5f5f5;
}
.van-cell {
  background-color: #f5f5f5;
}
</style>
