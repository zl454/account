<template>
  <div class="accounts-container">
    <Tags
      :tagsList="tagsList"
      @update-taglist="updateTagList"
    />
    <van-cell-group>
      <van-field
        label="备注"
        placeholder="请输入备注"
        v-model="note"
      />
    </van-cell-group>
    <van-tabs
      line-width="50%"
      color="#409EFF"
      background="#F5F5F5"
      v-model="type"
      id="tabs"
    >
      <van-tab
        name="收入"
        title="收入"
      ></van-tab>
      <van-tab
        name="支出"
        title="支出"
      ></van-tab>
    </van-tabs>
    <Panel
      :account="account"
      @change-account="changeAccount"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import dayjs from "dayjs";
import { mapMutations, mapState } from "vuex";
import Tags from "../components/money/Tags";
import Panel from "../components/money/Panel";
export default {
  data() {
    return {
      selecteList: [], //选中的标签
      account: "0",
      note: "", //备注
      type: "收入", //收入支出
    };
  },
  mounted() {
    this.initialTag();
  },
  methods: {
    ...mapMutations(["addAccount", "initialTag", "changeNote"]),
    // 更新选中的标签列表
    updateTagList(e) {
      this.selecteList = e;
    },
    changeAccount(e) {
      if (e === "删除") return this.deleteAccount();
      if (e === "清空") return (this.account = "0");
      if (e === "OK") return this.updateAccount();
      this.account = e;
    },
    deleteAccount() {
      const length = this.account.length;
      if (length === 1) return (this.account = "0");
      this.account = this.account.substr(0, length - 1);
    },
    updateAccount() {
      if (this.account == 0)
        return Toast({
          message: "请输入金额",
          position: top,
        });
      if (!this.selecteList.length)
        return Toast({
          message: "请至少选中一个标签",
          position: top,
        });

      this.addAccount({
        tags: this.selecteList,
        type: this.type,
        account: Number(this.account).toFixed(2),
        note: this.note,
        date: dayjs().format(),
      });
      Toast({
        message: "添加成功",
        position: top,
      });
      this.account = "0";
      this.note = "";
    },
  },
  computed: {
    ...mapState(["tagsList"]),
  },
  components: {
    Tags,
    Panel,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.accounts-container {
  position: fixed;
  bottom: 60px;
  width: 100%;
}

.van-cell {
  background-color: #f5f5f5;
}

.van-tag--default {
  background-color: blue;
}
</style>
