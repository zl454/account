<template>
  <div id="code">
    <h2 style="color:yellow">请使用手机扫一扫体验</h2>
    <QRCanvas :options="options"/>
  </div>
</template>
<script>
import { QRCanvas } from 'qrcanvas-vue';
export default {
  components:{
    QRCanvas
  },
  data() {
    return {
      options:{
        cellSize: 8,
        padding:8,
        correctLevel: 'L',
        foreground: 'blue',
        data:'http://zl.flynn.cool/account/',
        logo:{
          text:'轻松记',
          options: {
          color: 'dodgerblue',
            }
          }
      }
    }
  },
}
</script>
<style scoped>
  #code {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 999;
  cursor: pointer;
}
</style>
