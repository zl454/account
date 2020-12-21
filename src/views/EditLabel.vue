<template>
  <div class="editlabel-container">
    <van-nav-bar
      title="编辑标签"
      left-arrow
      border
      @click-left="$router.go(-1)"
    />
    <van-field
      class="note"
      v-model="value"
      @keyup='tagChange'
      label="标签名："
    />
    <div class="editlabel-container-btn">
      <van-button
        type="info"
        @click="delecteTags"
      >删除标签</van-button>
      <van-button
        type="info"
        :disabled="flag"
        @click="modifyTags"
      >确认修改</van-button>

    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, Field, NavBar } from "vant";
Vue.use(Toast);
Vue.use(Field);
Vue.use(NavBar);
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      flag: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["delecteTag", "modifyTag"]),
    delecteTags() {
      //删除标签
      if (this.tagsList.length === 1) {
        Toast({
          message: "请至少保留一个标签！！！",
          position: top,
        });
        return;
      }
      this.delecteTag(this.id);
      Toast({
        message: '标签 "' + this.value + '" 删除成功',
        position: top,
      });
      this.$router.go(-1);
    },
    modifyTags() {
      //修改标签
      this.modifyTag({ name: this.value.trim(), index: this.id });
      Toast({
        message: "标签修改成功",
        position: top,
      });
      this.$router.go(-1);
    },
    init() {
      this.value = this.tagsList[this.id];
    },
    tagChange() {
      if (!this.value) {
        return (this.flag = true);
      }
      if (this.value !== this.tagsList[this.id]) return (this.flag = false);
      this.flag = true;
    },
  },
  computed: mapState(["tagsList"]),
  props: ["id"],
};
</script>

<style scpoed>
.editlabel-container {
  height: 100vh;
  background-color: #f5f5f5;
}
.note {
  margin: 20px 0;
}
.editlabel-container-btn {
  display: flex;
  justify-content: space-evenly;
}
</style>
