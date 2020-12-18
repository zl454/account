import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import { Toast } from "vant";
Vue.use(Toast);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountList: JSON.parse(localStorage.getItem("accountList") || "[]"),//记录清单
    tagsList: JSON.parse(localStorage.getItem("tagsList") || "[]"),//标签清单
    isMobile: false
  },
  mutations: {
    addAccount(state, list) {//添加记录
      state.accountList.push(list)
      localStorage.setItem("accountList", JSON.stringify(state.accountList))
    },
    deleteAccount(state, index) {//删除记录
      state.accountList.splice(index, 1)
      localStorage.setItem("accountList", JSON.stringify(state.accountList))
    },
    initialTag(state) {//初始化标签
      if (state.tagsList.length > 0) return
      const tags = ["衣", "食", "住", "行"]
      state.tagsList = tags
      localStorage.setItem("tagsList", JSON.stringify(state.tagsList))
    },
    createTag(state, newTag) {//添加新标签
      let flag = false
      state.tagsList.some(item => {
        if (item == newTag) {
          Toast({
            message: `标签${newTag}已存在`,
            position: top
          });
          flag = true
          return true
        }
      })
      if (!flag) {
        state.tagsList.push(newTag)
        Toast({
          message: `标签${newTag}添加成功`,
          position: top
        });
      }
      localStorage.setItem("tagsList", JSON.stringify(state.tagsList))
    },
    modifyTag(state, data) {//修改标签
      state.tagsList[data.index] = data.name
      localStorage.setItem("tagsList", JSON.stringify(state.tagsList))
    },
    delecteTag(state, index) {//根据索引删除标签
      state.tagsList.splice(index, 1)
      localStorage.setItem("tagsList", JSON.stringify(state.tagsList))
    },
  },
  getters: {
    initData: state => {
      let incomeList = []
      let spendingList = []
      state.accountList.forEach((item) => {
        let accounts = [];
        if (item.type === "收入") accounts = incomeList;
        if (item.type === "支出") accounts = spendingList;
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
      // 列表排序
      incomeList.sort((pre, next) =>
        dayjs(pre.date).isBefore(dayjs(next.date)) ? 1 : -1
      );
      spendingList.sort((pre, next) =>
        dayjs(pre.date).isBefore(dayjs(next.date)) ? 1 : -1
      );
      return [incomeList, spendingList]
    }
  }
})
