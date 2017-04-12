<template>
  <div class="note-card">
    <div class="title">
      {{ title }}
      <span class="delete" v-if="is_show_deleted" @click.stop="$emit('delete-action')">删除</span>
    </div>
    <div class="content" v-if="content && content != ''">{{ content }}</div>
    <div class="label" v-if="label && label != ''">
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
  .note-card { background: #fff; padding: 10px; border-radius: 2px; box-shadow: 0 1px 1px rgba(0,0,0,.3); }
  .title { position: relative; margin-bottom: 10px; padding-right: 35px; font-size: 16px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .title .delete { position: absolute; right: 0; top: 5px; font-size: 12px; color: #f02f45; }
  .content { font-size: 14px; color: #666; }
  .label { margin-top: 7px; font-size: 12px; color: #999; }
  .label > span { display: inline-block; padding: 0 5px; border-radius: 100px; text-align: center; border: 1px solid rgb(221, 221, 221); }
</style>

<script>
  export default {
    props: ['is_show_deleted', 'title', 'content', 'label']
  }
</script>
