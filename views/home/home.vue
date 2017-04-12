<template>
  <section class="page-home">
    <page-header :center_text="'Vue2'"></page-header>

    <section class="card-list">
      <note-card v-for="item in 3" @delete-action="deleteNote"></note-card>
    </section>

    <modal v-if="is_show_modal" :type="'from_bottom'" @close-modal="is_show_modal=false">
      <div class="modal-content">确定删除吗</div>
      <div class="btn-group">
        <div class="btn">
          <span class="cancel" @click="is_show_modal=false">取消</span>
        </div>
        <div class="btn">
          <span class="confirm" @click="is_show_modal=false">确定</span>
        </div>
      </div>
    </modal>

  </section>
</template>

<style scoped>
  .page-home { background: #efeff4; min-height: 100vh; }
  .card-list { padding: 10px 15px; }
  .note-card { margin-bottom: 5px; }
  .modal-content { padding: 20px 0; text-align: center; }
  .btn-group { display: flex; padding: 10px 24px; border-top: 1px solid #ddd; text-align: center; }
  .btn-group .btn { flex: 1; padding: 0 3px; height: 40px; line-height: 40px; }
  .btn-group .btn > span { display: inline-block; width: 100%; border-radius: 5px; }
  .btn-group .btn .cancel { border: 1px solid #ddd; }
  .btn-group .btn .confirm { color: #fff; background: #f02f45; border: 1px solid #f02f45; }
</style>

<script>
  export default {
    data() {
      return {
        is_show_modal: false
      }
    },
    components: {
      'page-header': require('views/_components/page_header'),
      'note-card': require('views/_components/note_card'),
      'modal': require('views/_components/modal')
    },
    methods: {
      deleteNote () {
        this.is_show_modal = true;
      }
    }
  }
</script>
