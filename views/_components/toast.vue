<template>
  <transition name="fade">
    <div class="toast" v-if="is_show">
      <div class="wrap">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .toast { text-align: center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, .2); z-index: 99999; }
  .toast .wrap { display: flex; align-items: center; width: 100%; height: 100%; }
  .toast .wrap .content { flex: 1; }
  .fade-enter-active, .fade-leave-active { transition: opacity .3s }
  .fade-enter, .fade-leave-active { opacity: 0 }
</style>

<script>
  export default {
    props: {
      is_show: { type: Boolean, default: false }
    },
    watch: {
      is_show: function () {
        if (this.is_show) {
          setTimeout(() => {
            this.$emit('close-toast');
          }, 2000);
        }
      }
    }
  }
</script>
