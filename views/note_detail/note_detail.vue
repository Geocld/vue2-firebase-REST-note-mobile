<template>
  <div class="page-note-detail">

    <spinner v-if="!is_data_loaded"></spinner>

    <page-header :center_text="title" :use_back="true" :use_save="true" @save="saveNote"></page-header>

    <text-field v-model="title" :label_float="true" :label="'标题'" :placeholder="'请输入标题'"></text-field>
    <text-field v-model="label" :type="'enum'" :enums="labels" :label_float="true" :label="'标签'" @input="changeSelect"></text-field>
    <text-field v-model="content" :type="'textarea'":label_float="true" :label="'内容'" :placeholder="'请输入内容'"></text-field>

    <toast :is_show="is_show_toast" @close-toast="is_show_toast = false">
      <div class="toast-content">
        <span>至少输入个标题吧~</span>
      </div>
    </toast>

  </div>
</template>

<style scoped>
  .page-note-detail { min-height: 100vh; }
  .toast-content > span { display: inline-block; padding: 5px 15px; border-radius: 50px; background: rgba(0, 0, 0, .2); color: #fff; }
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
        content: '',
        is_show_toast: false
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
        this.labels.push('+添加新标签')
        this.title = this.notes.title;
        this.label = this.labels.findIndex((value) => {
          return value === this.notes.label;
        });
        this.content = this.notes.content;
        this.is_data_loaded = true;
      }));
    },
    methods: {
      saveNote() {
        let { title, label, labels, content } = this;
        if (title === '') {
          this.is_show_toast = true;
          return
        }
        this.is_data_loaded = false;
        // 记录当前时间
        let now = this.getNowTime();
        window.axios.patch('https://fir-3-test-2332e.firebaseio.com/notes/' + this.$route.params.key + '.json', {
          title: title,
          label: labels[label],
          content: content,
          time: now
        }).then(res => {
          this.is_data_loaded = true;
          this.$router.go(-1);
        })
      },
      getNowTime () {
        let now = new Date().getTime();
        return now
      },
      changeSelect (val) {
        if (this.labels && +val === this.labels.length - 1) {
          this.$router.push({name: 'label_add'});
        }
      }
    }
  }
</script>
