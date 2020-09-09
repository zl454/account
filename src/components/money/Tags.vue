<template>
  <div class="tags-container">
    <van-tag
      round
      v-for="(item, index) in tagsList"
      :key="index"
      @click="tagSelect"
    >{{item}}</van-tag>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initialTag();
  },
  methods: {
    ...mapMutations(["initialTag"]),
    tagSelect(e) {
      //选中标签，获取标签列表
      if (!e.target.selected) {
        e.target.selected = true;
        this.selectedList.push(e.target.textContent);
        e.target.style.backgroundColor = "#5A5A5A";
        return;
      }
      e.target.selected = false;
      let index = this.selectedList.indexOf(e.target.textContent);
      this.selectedList.splice(index, 1);
      e.target.style.backgroundColor = "";
    }
  },
  computed: mapState(["tagsList", "selectedList"])
};
</script>
<style scoped>
.tags-container > span {
  padding: 5px 15px;
  margin: 5px 5px;
  cursor: pointer;
}
</style>
