<template>
  <div class="tags-container">
    <van-tag
      round
      v-for="(item, index) in tagsList"
      :key="index"
      @click="updateSelecteList"
    >{{item}}</van-tag>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selecteList: [],
    };
  },
  props: {
    tagsList: {
      type: Array,
    },
  },
  methods: {
    updateSelecteList(e) {
      //选中标签，获取标签列表
      const target = e.target;
      if (!target.selected) {
        target.selected = true;
        this.selecteList.push(target.textContent);
        target.classList.add("tags-bg");
      } else {
        target.selected = false;
        let index = this.selecteList.indexOf(target.textContent);
        this.selecteList.splice(index, 1);
        target.classList.remove("tags-bg");
      }
      const list = this.selecteList.map((item) => item);
      this.$emit("update-taglist", list);
    },
  },
};
</script>
<style scoped>
.tags-container > span {
  padding: 5px 15px;
  margin: 5px 5px;
  cursor: pointer;
}
.tags-bg {
  background-color: #5a5a5a;
}
</style>
