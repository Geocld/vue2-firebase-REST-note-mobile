<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  html, body {
    font-size: 14px;
    line-height: 1.3;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  html .pure-g [class *="pure-u"] {
    font-family: FreeSans, Arimo, "Droid Sans", Helvetica, Arial, sans-serif;
  }
  ul, ol { list-style: none; }
  em { font-style: normal; }
  input { -webkit-appearance: none; border: 0; outline: none; background: transparent; color: inherit; }
</style>

<script>
  import router from './_router';

  export default {
    router
  };
</script>
