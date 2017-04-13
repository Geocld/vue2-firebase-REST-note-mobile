<template>
  <span class="text-field-label"
        v-if="label"
        :class="{ sink, float }">
     {{ label }}
  </span>
</template>

<style scoped>
  .text-field-label { display: block;padding:5px; }
  .text-field-label.float{ padding:10px 0;background-color: #fff;transition: transform .3s, padding .3s; transform-origin: left top;position: absolute; z-index: 3; left: 10px; top: 50%; right:1px;transform: translateY(-50%);}
  .text-field-label.float.sink { transform: scale(.9) translateY(-22px);padding:0; }
</style>

<script>
  export default{
    props: {
      label: {},
      float: Boolean,
      sink: Boolean
    }
  };
</script>
