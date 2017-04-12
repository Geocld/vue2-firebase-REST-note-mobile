<template>
  <section class="page-home">
    <page-header :center_text="'Vue2'"></page-header>

    <section class="card-list">
      <note-card v-for="item in 3"></note-card>
    </section>

  </section>
</template>

<style scoped>
  .page-home { background: #efeff4; min-height: 100vh; }
  .card-list { padding: 10px 15px; }
  .note-card { margin-bottom: 5px; }
</style>

<script>
  export default {
    components: {
      'page-header': require('views/_components/page_header'),
      'note-card': require('views/_components/note_card')
    }
  }
</script>
