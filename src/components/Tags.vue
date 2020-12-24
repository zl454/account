<template>
  <div class="tags-container">
    <van-tag
      round
      v-for="(item, index) in tagsList"
      :key="index"
      :class="{'tags-bg':index===current}"
      @click="toggleTag(index,$event)"
    >{{item}}</van-tag>

  </div>
</template>

<script>
import Vue from "vue";
import { tag } from "vant";
Vue.use(tag);
export default {
  data() {
    return {
      current: "",
      isActive: false,
      tag: "",
    };
  },
  props: {
    tagsList: {
      type: Array,
    },
  },
  methods: {
    toggleTag(index, event) {
      this.current = index;
      this.$emit("update-taglist", event.target.textContent);
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
