<template>
  <div class="page-note-detail">
    <spinner v-if="!is_data_loaded"></spinner>
  </div>
</template>

<style scoped>
  .page-note-detail { min-height: 100vh; background: #f7f7f7; }
</style>

<script>
  export default {
    data () {
      return {
        is_data_loaded: false,
        data: null
      }
    },
    mounted: function () {
      window.axios.get('https://fir-3-test-2332e.firebaseio.com/notes/' + this.$route.params.key + '.json').then(({data}) => {
        this.data = data;
        this.is_data_loaded = true;
      });
    }
  }
</script>
