<template>
  <div class="label-container">
    <van-cell
      :title="item"
      is-link
      :to="`/label/edit/${index}`"
      center
      v-for="(item, index) in this.tagsList"
      :key="index"
    />
    <div class="label-container-btn">
      <van-button
        type="info"
        @click="addtags"
      >新建标签</van-button>

    </div>
  </div>

</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["createTag"]),
    addtags() {
      let value = prompt("    请输入新的标签", "");
      if (!value) {
        Toast({
          message: "新建标签失败",
          position: top
        });
        return;
      }
      this.createTag(value);
    }
  },
  computed: mapState(["tagsList"])
};
</script>

<style scoped>
.label-container {
  height: 100%;
  min-height: 96vh;
  padding-bottom: 24px;
  background-color: #f5f5f5;
}
.label-container > div {
  height: 65px;
  padding-left: 30px;
  font-size: 16px;
}
div.label-container-btn {
  text-align: center;
  /* padding: 25px 0 40px; */
  padding: 24px 0;
}
</style>
