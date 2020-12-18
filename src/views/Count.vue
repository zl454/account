<template>
  <div class="count-container">
    <Tabs @change-type="changeType" />
    <CountList
      @delected-account="delectedAccounts"
      :lists="this.type==='收入'?this.incomeList:this.spendingList"
    />
    <!-- <van-tabs
      animated
      line-width="50%"
      color="#409EFF"
      background="#A5F5F5"
      id="tabs"
    >
      <van-tab
        name="+"
        title="收入"
      >

      </van-tab>
      <van-tab
        name="-"
        title="支出"
      >
        <van-collapse
          v-if="spendingList.length"
          v-model="activeName1"
          accordion
        >
          <van-collapse-item
            v-for="(item, index) in spendingList"
            :key="index"
            :name="index"
          >
            <template #title>
              <h2 class="title">
                {{getDate(item.date)}}
                <span>
                  总计: <span class="number">¥ {{item.total}}</span>
                </span>
              </h2>
            </template>
            <ol>
              <li
                class="record"
                v-for="i in item.data"
                :key="i.date"
                @click="delectedRecords(i.date)"
              >
                <span>{{String(i.tags)}}</span>
                <span class="notes">{{i.note}}</span>
                <span class="number">¥ {{i.account}}</span>
              </li>
            </ol>
          </van-collapse-item>
        </van-collapse>
        <div
          class="fallback"
          v-else
        >
          您还没有任何支出记录哟~ <br />快去记账页面开始吧

        </div>

      </van-tab>
    </van-tabs> -->
  </div>

</template>

<script>
import Tabs from "../components/Tabs";
import CountList from "../components/CountList";
import { mapState, mapMutations } from "vuex";
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "",
      activeName1: "",
      type: "收入",
      loading: "",
      finished: "",
      incomeList: [],
      spendingList: [],
    };
  },
  mounted() {
    this.init();
  },
  components: { Tabs, CountList },
  methods: {
    ...mapMutations(["deleteAccount"]),
    changeType(e) {
      this.type = e;
    },
    init() {
      this.accountList.forEach((item) => {
        // console.log(item);
        let accounts = [];
        if (item.type === "收入") accounts = this.incomeList;
        if (item.type === "支出") accounts = this.spendingList;
        // console.log(accounts);
        // 在清单中查找日期，未找到返回-1
        const date = dayjs(item.date).format("YYYY-MM-DD");
        const flag = accounts.findIndex((i) => i.date === date);
        if (!~flag) {
          // 没找到，在accounts中 push 新的数据对象
          accounts.push({
            date: date,
            data: [item],
            total: item.account,
          });
        } else {
          // 找到了
          accounts[flag].total = (
            1 * accounts[flag].total +
            1 * item.account
          ).toFixed(2);
          accounts[flag].data.push(item);
        }
      });
      this.incomeList.sort((pre, next) => dayjs(pre.date).isBefore(next.date));
      this.spendingList.sort((pre, next) =>
        dayjs(pre.date).isBefore(next.date)
      );
    },
    delectedAccounts(date) {
      let boolean = confirm("是否删除记录");
      if (boolean) {
        this.accountList.some((item, index) => {
          item.date === date && this.deleteAccount(index);
        });
      }
    },

    total(data) {
      console.log("aaa");
      let val = 0;
      data.forEach((item) => (val += Number(item.account)));
      return val.toFixed(2);
    },
  },
  computed: mapState(["accountList"]),
};
</script>

<style scoped>
.count-container {
  /* min-height: 94vh; */
  height: 100%;
  margin-bottom: 64px;
  background-color: #f5f5f5;
}
</style>
