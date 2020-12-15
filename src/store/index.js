import Vue from 'vue'
import Vuex from 'vuex'

import { Toast } from "vant";
Vue.use(Toast);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordList: JSON.parse(localStorage.getItem("recordList") || "[]"),//记录清单
    tagsList: JSON.parse(localStorage.getItem("tagsList") || "[]"),//标签清单
    currentData: {//当前输入的数据
      tags: [], //选中标签清单
      note: '',//备注
      account: 0,//数据
      type: '+',//收入支出
    }
    // id: parseInt(window.localStorage.getItem("_lastId") || "0") || 0//标签最后id
  },
  mutations: {
    changeType(state, type) {
      // 修改收入支出类型
      state.currentData.type = type
    },
    changeNote(state, note) {
      // 修改备注信息
      state.currentData.note = note
    },
    addRecord(state) {//添加记录
      if (state.currentData.tags.length === 0) {
        Toast({
          message: "请至少选中一个标签",
          position: top,
        });
        return;
      }
      this.flag = false;
      state.recordList.push(state.currentData)
      // this.clearNumber();
      state.currentData.tags.length = 0;
      setTimeout(() => {
        this.flag = true;
      }, 16);

      localStorage.setItem("recordList", JSON.stringify(state.recordList))
    },
    delectedRecord(state, index) {//删除记录
      state.recordList.splice(index, 1)
      localStorage.setItem("recordList", JSON.stringify(state.recordList))
      location.reload()
    },
    initialTag(state) {//初始化标签
      if (state.tagsList.length > 0) return
      const tags = ["衣", "食", "住", "行", "工作"]
      state.tagsList = tags
      localStorage.setItem("tagsList", JSON.stringify(state.tagsList))

    },
    createTag(state, newTag) {//添加新标签
      let flag = false
      state.tagsList.some(item => {
        if (item == newTag) {
          Toast({
            message: '标签 "' + newTag + '" 已存在',
            position: top
          });
          flag = true
          return true
        }
      })
      if (!flag) {
        state.tagsList.push(newTag)

        Toast({
          message: '标签 "' + newTag + '" 添加成功',
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
    IDGenerator(state) {
      state.id++
      localStorage.setItem("_lastId", JSON.stringify(state.id))
      return state.id
    }
  },
  actions: {
  },
  modules: {
  }
})
