<template>
  <div class="panel-container">
    <div
      class="result"
      style="grid-area:result"
    >{{account}}</div>
    <div class="calculator">
      <button
        v-for="item in btn" :key="item[0]"
        :style="`grid-area:${item[0]}`"
        @click="clickHandler"
      >{{item[1]}}</button>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btn:[['number1',1],['number2',2],['number3',3],['del',"删除"],['number4',4],['number5',5],['number6',6],['ac','清空'],['number7',7],['number8',8],['number9',9],['ok','OK'],['number0',0],['dot','.']]
    }
  },
  props:{
    account:{
      type:String,
      default:"0"
    }
  },
  methods: {
      //输入金额
      clickHandler(e){
        const content=e.target.textContent;
        if(content==='删除')return this.$emit('change-account','删除')
        if(content==='清空')return this.$emit('change-account','清空')
        if(content==='OK')return this.$emit('change-account','OK')
        this.typeNumber(content)
      },
    typeNumber(content) {
      const data=this.account
      if (data.length >= 10||(~data.indexOf(".")&&(content === "."||data.split('.')[1].length>1))) return;
      if (data === "0") {
        if(content==='.')return
        return this.$emit("change-account",content);
      }
      this.$emit("change-account",data+content)
    }
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
.calculator {
  display: grid;
  grid-template-areas:
    "number1 number2 number3 del"
    "number4 number5 number6 ac"
    "number7 number8 number9 ok"
    "number0 number0 dot ok";
  grid-template-columns: repeat(4, 24vw);
  grid-template-rows: repeat(4, 12vw);
  padding: 12px;
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
