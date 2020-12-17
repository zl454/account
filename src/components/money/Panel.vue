<template>
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
</template>
<script>
import { mapMutations,mapState } from "vuex";
export default {
  data() {
    return {
      account: "0"
    };
  },
  methods: {
    ...mapMutations(["addRecord"]),
      //输入金额
    typeNumber(e) {
      const input = e.target.textContent;
      const data=this.account
      if (data.length >= 10||(~data.indexOf(".")&&(input === "."||data.split('.')[1].length>1))) return;
      if (data === "0")  return this.account = input;
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
    },
    calculateNumber() {
      // 添加记录
      this.currentData.account=this.account
      console.log(this.addRecord());
      this.clearNumber();
    },
  },
    computed: {
      ...mapState(['currentData'])
    },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.panel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}
/* .account {
  font-size: 36px;
  font-family: Consolas, monospace;
  padding: 9px 16px;
  text-align: right;
  height: 72px;
  background-color: #f5f5f5;
  box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.5),
    inset 0 3px 3px -3px rgba(0, 0, 0, 0.5);
} */
.calculator {
  /* width: 100%; */
  /* --button-width: 80px;
  --button-height: 80px; */
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
/* 
button {
  float: left;
  width: 25%;
  height: 64px;
  border: none;
  background: transparent;
}
button:nth-child(1) {
  background: rgba(181, 181, 181, 0.1);
}
button:nth-child(2),
button:nth-child(5) {
  background: rgba(181, 181, 181, 0.25);
}
button:nth-child(3),
button:nth-child(6),
button:nth-child(9) {
  background: rgba(181, 181, 181, 0.4);
}
button:nth-child(4),
button:nth-child(7),
button:nth-child(10) {
  background: rgba(181, 181, 181, 0.55);
}
button:nth-child(8),
button:nth-child(11),
button:nth-child(13) {
  background: rgba(181, 181, 181, 0.75);
}
button:nth-child(14) {
  background: rgba(181, 181, 181, 0.9);
}
button:nth-child(12) {
  height: 128px;
  float: right;
  background: rgba(181, 181, 181, 1);
}
button:nth-child(13) {
  width: 50%;
} */
</style>
