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
export default {
  data() {
    return {
      selecteList:[]
    };
  },
  props:{
    tagsList:{
      type:Array
    }
  },
  methods: {
    tagSelect(e) {
      //选中标签，获取标签列表
      const target=e.target
      if (!target.selected) {
        target.selected = true;
        this.selecteList.push(target.textContent);
        target.classList.add("tags-bg")
        
      }else{
        target.selected = false;
      let index = this.selecteList.indexOf(target.textContent);
      this.selecteList.splice(index, 1);
      target.classList.remove("tags-bg")
      }
      this.$emit('update-taglist',this.selecteList)
    }
  },
};
</script>
<style scoped>
.tags-container > span {
  padding: 5px 15px;
  margin: 5px 5px;
  cursor: pointer;
}
.tags-bg{
  background-color: #5A5A5A;
}
</style>
