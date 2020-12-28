<template>
  <div class="tags-container">
    <van-grid
      square
      clickable
      :border="false"
    >
      <van-grid-item
        v-for="(item, index) in tagsList"
        :key="index"
        icon="bag-o"
        :text='item'
        :class="{'tags-bg':index===current}"
        @click="toggleTag(index,$event)"
      />
    </van-grid>
    <!-- <van-tag
      round
      v-for="(item, index) in tagsList"
      :key="index"
      :class="{'tags-bg':index===current}"
      @click="toggleTag(index,$event)"
      size="large"
    >
      <van-icon name="chat-o" />
      {{item}}
    </van-tag> -->
  </div>
</template>

<script>
import Vue from "vue";
import { tag, Icon, Grid, GridItem } from "vant";
Vue.use(tag);
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
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
      console.log(this.current);
      this.$emit("update-taglist", event.target.textContent);
    },
  },
};
</script>
<style scoped>
/* .tags-container > span {
  padding: 5px 15px;
  margin: 5px 5px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
} */
.tags-bg {
  background-color: #5a5a5a;
}
</style>
