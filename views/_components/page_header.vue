<template>
  <div class="page-header">
    <div class="back" v-if="use_back">返回</div>
    <div class="center-content">{{ center_text }}</div>
    <div class="save" v-if="use_save">保存</div>
    <div class="save" v-if="use_edit">编辑</div>
  </div>
</template>

<style scoped>
  .page-header { display: flex; padding: 0 12px; height: 44px; line-height: 44px; background: #f7f7f8; border-bottom: 1px solid #e7e7e7; }
  .back {  }
  .center-content { flex: 1; text-align: center; }
</style>

<script>
  export default {
    props: {
      center_text: { type: String, default: '' },
      use_back: { type: Boolean, default: false },
      use_save: { type: Boolean, default: false },
      use_edit: { type: Boolean, default: false }
    }
  }
</script>
