<template>
  <div class="accounts-container">
    <Tags v-if="flag" />
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
        name="+"
        title="收入"
      ></van-tab>
      <van-tab
        name="-"
        title="支出"
      ></van-tab>
    </van-tabs>
    <div class="panel-container">

      <div
        class="result"
        style="grid-area:result"
      >{{account}}</div>
      <div class="calculator">
        <button
          style="grid-area:number-1"
          @click="typeNumber"
        >1</button>
        <button
          style="grid-area:number-2"
          @click="typeNumber"
        >2</button>
        <button
          style="grid-area:number-3"
          @click="typeNumber"
        >3</button>
        <button
          style="grid-area:del"
          @click="deleteNumber"
        >删除</button>
        <button
          style="grid-area:number-4"
          @click="typeNumber"
        >4</button>
        <button
          style="grid-area:number-5"
          @click="typeNumber"
        >5</button>
        <button
          style="grid-area:number-6"
          @click="typeNumber"
        >6</button>
        <button
          style="grid-area:ac"
          @click="clearNumber"
        >清空</button>
        <button
          style="grid-area:number-7"
          @click="typeNumber"
        >7</button>
        <button
          style="grid-area:number-8"
          @click="typeNumber"
        >8</button>
        <button
          style="grid-area:number-9"
          @click="typeNumber"
        >9</button>
        <button
          style="grid-area:ok"
          @click="calculateNumber"
          class="ok"
        >OK</button>
        <button
          style="grid-area:number-0"
          @click="typeNumber"
          class="zero"
        >0</button>
        <button
          style="grid-area:dot"
          @click="typeNumber"
        >.</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { mapMutations, mapState } from "vuex";
import Tags from "../components/money/Tags";
// import Panel from "../components/money/Panel";
export default {
  data() {
    return {
      flag: true,
      account: "0",
      note: "", //备注
      type: "+" //收入支出
    };
  },
  mounted() {
    this.initialTag();
  },
  methods: {
    ...mapMutations(["addRecord", "initialTag"]),
    typeNumber(e) {
      //输入金额
      const input = e.target.textContent;
      if (this.account.length === 10) return;
      if (this.account === "0") {
        if ("0123456789".indexOf(input) >= 0) {
          this.account = input;
        } else {
          this.account += input;
        }
        return;
      }
      if (this.account.indexOf(".") >= 0 && input === ".") {
        return;
      }
      this.account += input;
    },
    deleteNumber() {
      //删除
      const length = this.account.length;
      if (length === 1) return (this.account = "0");
      this.account = this.account.substr(0, length - 1);
    },
    clearNumber() {
      //清空
      this.account = "0";
      this.note = "";
    },
    calculateNumber() {
      // 添加记录=
      if (this.selectedList.length === 0) {
        Toast({
          message: "请至少选中一个标签",
          position: top
        });
        return;
      }
      this.flag = false;
      let list = [];
      for (let key in this.selectedList) {
        list.push(this.selectedList[key]);
      }
      this.addRecord({
        type: this.type,
        account: Math.round(this.account * 100) / 100,
        notes: this.note || "",
        tags: list.join(","),
        date: new Date().toJSON()
      });
      this.clearNumber();
      this.selectedList.length = 0;
      setTimeout(() => {
        this.flag = true;
      }, 16);
    }
  },
  computed: mapState(["tagsList", "selectedList"]),
  components: {
    Tags
    // Panel
  }
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
.tags-container > span {
  padding: 5px 20px;
  margin: 5px 10px;
  cursor: pointer;
}
.van-cell {
  background-color: #f5f5f5;
}

.van-tag--default {
  background-color: blue;
}

.panel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}
.calculator {
  display: grid;
  grid-template-areas:
    "number-1 number-2 number-3 del"
    "number-4 number-5 number-6 ac"
    "number-7 number-8 number-9 ok"
    "number-0 number-0 dot ok";
  grid-template-columns: repeat(4, 24vw);
  grid-template-rows: repeat(4, 12vw);
  /* box-shadow: -8px -8px 16px -10px rgba(255, 255, 255, 1),
    8px 8px 16px -10px rgba(0, 0, 0, 0.15) */
  padding: 12px;
  /* border-radius: 50%; */
}
.calculator button {
  margin: 6px;
  padding: 0;
  border: 0;
  display: block;
  outline: none;
  border-radius: 12vw;
  font-size: 18px;
  font-family: Helvetica;
  font-weight: normal;
  color: #999;
  background: linear-gradient(
    135deg,
    rgba(230, 230, 230, 1) 0%,
    rgba(246, 246, 246, 1) 100%
  );
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1),
    4px 4px 10px -8px rgba(0, 0, 0, 0.3);
}
.calculator button:active {
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1) inset,
    4px 4px 10px -8px rgba(0, 0, 0, 0.3) inset;
}
.result {
  text-align: right;
  width: 100vw;
  line-height: 48px;
  font-size: 48px;
  font-family: Consolas, monospace;
  padding: 15px 40px;
  color: #666;
}
</style>
