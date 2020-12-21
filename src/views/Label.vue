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
        @click="show=true"
        text="新建标签"
      />
      <van-dialog
        v-model="show"
        title="新建标签"
        @confirm="addtags"
        show-cancel-button
      >
        <p style="padding:20px">
          <input
            type=""
            name=""
            v-model="value"
          >
        </p>
      </van-dialog>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import { Toast, Button, Dialog, Cell } from "vant";
Vue.use(Toast);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Cell);
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false,
      value: "",
    };
  },
  methods: {
    ...mapMutations(["createTag"]),
    addtags() {
      if (!this.value.trim()) {
        Toast({
          message: "请输入标签",
          position: top,
        });
        return;
      }
      // 过滤首位空格
      // 添加标签
      this.createTag(this.value.trim());
    },
  },
  computed: mapState(["tagsList"]),
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
  padding: 24px 0;
}
</style>
