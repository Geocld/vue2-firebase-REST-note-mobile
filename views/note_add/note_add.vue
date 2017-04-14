<template>
  <section class="page-note-add">

    <spinner v-if="!is_data_loaded"></spinner>

    <page-header :center_text="title" :use_back="true" :use_save="true" @save="saveNote"></page-header>

    <text-field v-model="title" :label_float="true" :label="'标题'" :placeholder="'请输入标题'"></text-field>
    <text-field v-model="label" :type="'enum'" :enums="labels" :label_float="true" :label="'标签'"></text-field>
    <text-field v-model="content" :type="'textarea'":label_float="true" :label="'内容'" :placeholder="'请输入内容'"></text-field>

    <toast :is_show="is_show_toast" @close-toast="is_show_toast = false">
      <div class="toast-content">
        <span>至少输入个标题吧~</span>
      </div>
    </toast>

  </section>
</template>

<style scoped>
  .page-note-add { min-height: 100vh; }
  .toast-content > span { display: inline-block; padding: 5px 15px; border-radius: 50px; background: rgba(0, 0, 0, .2); color: #fff; }
</style>

<script>
  export default {
    data () {
      return {
        is_data_loaded: false,
        is_show_toast: false,
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
        if (this.title === '') {
          this.is_show_toast = true;
          return
        }
        this.is_data_loaded = false;
        let now = this.getNowTime();
        window.axios.post('https://fir-3-test-2332e.firebaseio.com/notes.json', {
          'title': this.title,
          'label': this.labels[this.label],
          'content': this.content,
          'now': now
        }).then(res => {
          this.is_data_loaded = true;
          this.$router.go(-1);
        });
      },
      getNowTime () {
        let now = new Date().getTime();
        return now
      }
    }
  }
</script>
