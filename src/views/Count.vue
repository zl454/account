<template>
  <div class="count-container">
    <Tabs @change-type="changeType" />
    <transition
      name="fade"
      mode="out-in"
    >

      <keep-alive>
        <CountList
          @delected-account="delectedAccounts"
          :key="type"
          :lists="type==='收入'?initData[0]:initData[1]"
        />
      </keep-alive>
    </transition>
  </div>

</template>

<script>
import Tabs from "components/Tabs";
import CountList from "components/CountList";
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  data() {
    return {
      activeName: "",
      activeName1: "",
      type: "收入",
    };
  },
  components: { Tabs, CountList },
  methods: {
    ...mapMutations(["deleteAccount"]),
    changeType(e) {
      this.type = e;
    },
    delectedAccounts(date) {
      Dialog.confirm({
        title: "删除记录",
        message: "是否删除记录？",
      })
        .then(() => {
          this.accountList.some((item, index) => {
            item.date === date && this.deleteAccount(index);
          });
        })
        .catch(() => {});
    },

    total(data) {
      console.log("aaa");
      let val = 0;
      data.forEach((item) => (val += Number(item.account)));
      return val.toFixed(2);
    },
  },
  computed: {
    ...mapState(["accountList"]),
    ...mapGetters(["initData"]),
  },
};
</script>

<style scoped>
.count-container {
  /* min-height: 94vh; */
  height: 100%;
  margin-bottom: 64px;
  background-color: #f5f5f5;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
