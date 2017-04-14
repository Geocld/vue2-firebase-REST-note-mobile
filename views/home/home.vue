<template>
  <section class="page-home">

    <spinner v-if="!is_data_loaded"></spinner>

    <page-header :center_text="'Vue2'" :use_add="true" @add="$router.push({name: 'note_add'})"></page-header>

    <section class="card-list" v-if="notes">
      <note-card v-for="(note, key) in sortedtNodes"
                 :is_show_deleted="true"
                 :title="note.title"
                 :content="note.content"
                 :label="note.label"
                 @delete-action="is_show_modal = true, cur_note_key = key"
                 @click.native="$router.push({name: 'note_detail', params: { key: note.key }})"></note-card>
    </section>

    <modal v-if="is_show_modal" :type="'from_bottom'" @close-modal="is_show_modal=false">
      <div class="modal-content">确定删除<span class="name">{{ notes[cur_note_key].title }}</span>吗</div>
      <div class="btn-group">
        <div class="btn">
          <span class="cancel" @click="is_show_modal=false">取消</span>
        </div>
        <div class="btn">
          <span class="confirm" @click="confirmDelete">确定</span>
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
  .modal-content .name { color: #f02f45; }
  .btn-group { display: flex; padding: 10px 24px; border-top: 1px solid #eee; text-align: center; }
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
        is_show_modal: false,
        cur_note_key: ''
      }
    },
    components: {
      'note-card': require('views/_components/note_card'),
      'modal': require('views/_components/modal')
    },
    computed: {
      sortedtNodes: function () {
        var notes = [];
        if (!this.notes) {
          return notes;
        }
        for (var key in this.notes) {
          this.notes[key].key = key;
          notes.push(this.notes[key]);
        }
        notes.sort((a, b) => {
          return a.time - b.time < 0
        });
        return notes
      }
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
      },
      confirmDelete () {
        this.is_show_modal = false;
        this.is_data_loaded = false;
        window.axios.delete('https://fir-3-test-2332e.firebaseio.com/notes/' + this.cur_note_key + '.json').then(res => {
          this.$delete(this.notes, this.cur_note_key)
          this.is_data_loaded = true;
        });
      }
    }
  }
</script>
