<template>
  <section class="page-home">

    <spinner v-if="!is_data_loaded"></spinner>

    <page-header :center_text="'test'" :use_edit="true"></page-header>

    <section class="card-list" v-if="notes">
      <note-card v-for="(note, key) in notes"
                 :is_show_deleted="false"
                 :title="note.title"
                 :content="note.content"
                 :label="note.label"
                 @delete-action="is_show_modal = true"
                 @click.native="$router.push({name: 'note_detail', params: { key: key }})"></note-card>
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
        is_data_loaded: false,
        notes: null,
        is_show_modal: false
      }
    },
    components: {
      'page-header': require('views/_components/page_header'),
      'note-card': require('views/_components/note_card'),
      'modal': require('views/_components/modal')
    },
    mounted: function () {
      this.catchData();
    },
    methods: {
      catchData () {
        window.axios.get('https://fir-3-test-2332e.firebaseio.com/notes.json').then(({data}) => {
          this.notes = data;
          this.is_data_loaded = true;
        });
      }
    }
  }
</script>
