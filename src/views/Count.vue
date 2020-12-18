<template>
  <div class="count-container">
    <van-tabs
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
        <van-collapse
          v-if="incomeList.length"
          v-model="activeName"
          accordion
        >
          <van-collapse-item
            v-for="(item, index) in incomeList"
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
                @click="delectedRecords(item.date)"
              >
                <span>{{String(i.tags)}}</span>
                <span class="notes">{{i.note}}</span>
                <span class="number"> {{i.account}}</span>
              </li>
            </ol>
          </van-collapse-item>
        </van-collapse>

        <div
          class="fallback"
          v-else
        >
          您还没有任何收入记录哟~ <br />快去记账页面开始吧

        </div>
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
                @click="delectedRecords(item.date)"
              >
                <span>{{String(i.tags)}}</span>
                <span class="notes">{{i.note}}</span>
                <span class="number"> {{i.account}}</span>
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
    </van-tabs>
  </div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "",
      activeName1: "",
      loading: "",
      finished: "",
      incomeList: [],
      spendingList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["delectedRecord"]),
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
    delectedRecords(date) {
      let boolean = confirm("是否删除记录");
      if (boolean) {
        this.recordList.some((item, index) => {
          if (item.date === date) {
            this.delectedRecord(index);
            return true;
          }
        });
      }
    },
    getDate(date) {
      //根据日期得出今天，昨天，前天
      const isToday = require("dayjs/plugin/isToday");
      const isYesterday = require("dayjs/plugin/isYesterday");
      dayjs.extend(isToday);
      dayjs.extend(isYesterday);

      if (dayjs(date).isToday()) return "今天";
      if (dayjs(date).isYesterday()) return "昨天";
      return date;
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
.title {
  margin: 10px 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.record {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}
.notes {
  font-size: 14px;
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}
.income .number {
  color: #009900;
}
.outcome .number {
  color: #cc0000;
}
.fallback {
  padding: 16px;
  text-align: center;
}
</style>
