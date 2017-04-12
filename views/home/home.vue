<template>
  <section class="page-home">
    <page-header></page-header>
    <!-- <router-link :to="{ name: 'test' }">
        <span>test</span>
    </router-link> -->
  </section>
</template>

<script>
  export default {
    components: {
      'page-header': require('views/_components/page_header')
    }
  }
</script>
