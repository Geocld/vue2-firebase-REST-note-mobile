<template>
  <div class="page-note-detail">

    <spinner v-if="!is_data_loaded"></spinner>

    <page-header :center_text="title" :use_back="true" :use_save="true"></page-header>

    <text-field v-model="title" :label_float="true" :label="'标题'" :placeholder="'请输入标题'"></text-field>
    <text-field v-model="label" :type="'enum'" :enums="labels" :label_float="true" :label="'标签'"></text-field>
    <text-field v-model="content" :type="'textarea'":label_float="true" :label="'内容'" :placeholder="'请输入内容'"></text-field>
  </div>
</template>

<style scoped>
  .page-note-detail { min-height: 100vh; }
</style>

<script>
  export default {
    data () {
      return {
        is_data_loaded: false,
        notes: null,
        labels: null,
        title: '',
        label: '',
        content: ''
      }
    },
    components: {
      'text-field': require('views/_components/text_field/text_field')
    },
    mounted: function () {
      window.axios.all([
        window.axios.get('https://fir-3-test-2332e.firebaseio.com/notes/' + this.$route.params.key + '.json'),
        window.axios.get('https://fir-3-test-2332e.firebaseio.com/labels.json')
      ]).then(window.axios.spread((res_notes, res_labels) => {
        this.notes = res_notes.data;
        this.labels = res_labels.data;
        this.title = this.notes.title;
        this.label = this.labels.findIndex((value) => {
          return value === this.notes.label;
        });
        this.content = this.notes.content;
        this.is_data_loaded = true;
      }));
    }
  }
</script>
