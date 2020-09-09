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
        <ol
          class="outcome"
          v-if="incomeList.length>0"
        >
          <li
            :key="index"
            v-for="(item, index) in incomeList"
          >
            <h2 class="title">
              {{getDate(item.createAt)}}
              <span>
                总计: <span class="number">¥ {{Math.round(item.total*100)/100}}</span>
              </span>
            </h2>
            <ol>
              <li
                :key="item.date"
                class="record"
                v-for="item in item.items"
                @click="delectedRecords(item.date)"
              >
                <span>{{item.tags}}</span>
                <span class="notes">{{item.notes}}</span>
                <span class="number"> {{item.account}}</span>
              </li>
            </ol>
          </li>
        </ol>
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
        <ol
          class="outcome"
          v-if="spendngList.length>0"
        >
          <li
            :key="index"
            v-for="(item, index) in spendngList"
          >
            <h2 class="title">
              {{getDate(item.createAt)}}
              <span>
                总计: <span class="number">¥ {{Math.round(item.total*100)/100}}</span>
              </span>
            </h2>
            <ol>
              <li
                :key="item.date"
                class="record"
                v-for="item in item.items"
                :id="item.date"
                @click="delectedRecords(item.date)"
              >
                <span>{{item.tags}}</span>
                <span class="notes">{{item.notes}}</span>
                <span class="number">- {{item.account}}</span>
              </li>
            </ol>
          </li>
        </ol>
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
// import dayjs from "dayjs";
export default {
  data() {
    return {
      loading: "",
      finished: "",
      incomeList: [],
      spendngList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["delectedRecord"]),
    init() {
      this.recordList.forEach(item => {
        if (item.type == "+") {
          let date = item.date.split("T")[0];
          if (this.incomeList.length < 1) {
            this.incomeList.push({
              items: [item],
              createAt: date,
              total: +item.account
            });
            return;
          }
          let flag = false;
          this.incomeList.some(items => {
            if (items.createAt === date) {
              items.items.push(item);
              items.total += 1 * item.account;
              flag = true;
              return true;
            }
          });
          if (!flag)
            this.incomeList.push({
              items: [item],
              createAt: date,
              total: +item.account
            });
        }
        if (item.type == "-") {
          let date = item.date.split("T")[0];
          if (this.spendngList.length < 1) {
            this.spendngList.push({
              items: [item],
              createAt: date,
              total: +item.account
            });
            return;
          }
          let flag = false;
          this.spendngList.some(items => {
            if (items.createAt === date) {
              items.items.push(item);
              items.total += 1 * item.account;
              flag = true;
              return true;
            }
          });
          if (!flag)
            this.spendngList.push({
              items: [item],
              createAt: date,
              total: +item.account
            });
        }
      });
      this.incomeList.reverse();
      this.spendngList.reverse();
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
    getDate(itemDate) {
      //根据日期得出今天，昨天，前天
      let today = new Date().toJSON().split("T")[0];
      let yesterday = new Date(+new Date() - 24 * 3600 * 1000)
        .toJSON()
        .split("T")[0];
      let beforeYesterday = new Date(+new Date() - 48 * 3600 * 1000)
        .toJSON()
        .split("T")[0];
      if (itemDate == today) return "今天";
      if (itemDate == yesterday) return "昨天";
      if (itemDate == beforeYesterday) return "前天";
      return itemDate;
    }
  },
  computed: mapState(["recordList"])
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
