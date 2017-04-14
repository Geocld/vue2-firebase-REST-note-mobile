<template>
  <section class="page-label-add">

    <page-header :center_text="dad" :use_back="true" :use_save="true" @save="saveNote"></page-header>

    <text-field v-model="label_name" :label_float="true" :label="'标签命名'" :placeholder="'请输入标签内容'"></text-field>

  </section>
</template>

<style scoped>
  .page-label-add { min-height: 100vh; }
</style>

<script>
  export default {
    data () {
      return {
        labels: null,
        label_name: ''
      }
    },
    components: {
      'text-field': require('views/_components/text_field/text_field')
    },
    methods: {
      saveNote() {
        window.axios.get('https://fir-3-test-2332e.firebaseio.com/labels.json').then(res => {
          this.labels = res.data;
        }).then(() => {
          this.labels.push(this.label_name);
          var params = {};
          this.labels.map((value, index) => {
            params[index] = value;
          });
          window.axios.put('https://fir-3-test-2332e.firebaseio.com/labels.json', params).then(res => {
            console.log(res.status)
          })
        });
      }
    }
  }
</script>
