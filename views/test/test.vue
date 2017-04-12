<template>
  <section class="page-test">
    <div>this is test</div>
    <hello></hello>
  </section>
</template>

<style>
.page-test {  }
</style>

<script>
import Hello from './_components/Hello.vue'

export default {
  data () {
    return {
      counter: 0
    }
  },
  components: {
    Hello
  },
  ready () {
    setInterval(() => {
      this.counter = this.counter + 1
    }, 1000)
  }
}
</script>