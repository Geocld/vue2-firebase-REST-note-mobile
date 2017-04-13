<template>
  <section class="page-note-add">

    <spinner v-if="!is_data_loaded"></spinner>

    <page-header :center_text="title" :use_back="true" :use_save="true" @save="saveNote"></page-header>

    <text-field v-model="title" :label_float="true" :label="'标题'" :placeholder="'请输入标题'"></text-field>
    <text-field v-model="label" :type="'enum'" :enums="labels" :label_float="true" :label="'标签'"></text-field>
    <text-field v-model="content" :type="'textarea'":label_float="true" :label="'内容'" :placeholder="'请输入内容'"></text-field>

  </section>
</template>

<style scoped>
  .page-note-add { min-height: 100vh; }
</style>

<script>
  export default {
    data () {
      return {
        is_data_loaded: false,
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
      window.axios.get('https://fir-3-test-2332e.firebaseio.com/labels.json').then(({ data }) => {
        this.labels = data;
        this.is_data_loaded = true;
      });
    },
    methods: {
      saveNote: function () {
        this.is_data_loaded = false;
        window.axios.post('https://fir-3-test-2332e.firebaseio.com/notes.json', {
          'title': this.title,
          'label': this.labels[this.label],
          'content': this.content
        }).then(res => {
          this.is_data_loaded = true;
          this.$router.go(-1);
        });
      }
    }
  }
</script>
