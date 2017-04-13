<template>
  <div class="page-note-detail">
    <spinner v-if="!is_data_loaded"></spinner>
    <text-field v-model="title" :label_float="true" :label="'标题'" :placeholder="'请输入标题'"></text-field>
    <text-field v-model="label" :type="'enum'" :enums="labels" :label_float="true" :label="'标签'"></text-field>
  </div>
</template>

<style scoped>
  .page-note-detail { padding: 15px 0; min-height: 100vh; background: #f7f7f7; }
</style>

<script>
  export default {
    data () {
      return {
        is_data_loaded: false,
        notes: null,
        labels: null,
        title: '',
        label: ''
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
        this.is_data_loaded = true;
      }));
    }
  }
</script>
