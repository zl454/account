<template>
  <div>
    <van-collapse
      v-if="lists.length"
      v-model="activeName"
      accordion
    >
      <van-collapse-item
        v-for="(item, index) in lists"
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
            @click="delectedAccount(i.date)"
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
      您还没有任何记录哟~ <br />快去记账页面开始吧

    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Collapse, CollapseItem } from "vant";
Vue.use(Collapse);
Vue.use(CollapseItem);
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "1",
    };
  },
  props: {
    lists: {
      type: Array,
    },
  },
  methods: {
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
    delectedAccount(e) {
      this.$emit("delected-account", e);
    },
  },
};
</script>
<style scoped>
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
  cursor: pointer;
  border-bottom: 1px dashed #ebede0;
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
