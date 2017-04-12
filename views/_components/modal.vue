<template>
  <transition name="fade">
    <section class="modal" :class="type" @click.stop="$emit('close-modal')">
      <div class="modal-wrap" :style="{ 'background': background }" @click.stop>
        <slot></slot>
      </div>
    </section>
  </transition>
</template>

<style scoped>
  .modal { position: fixed; z-index: 10000; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, .6); }
  .modal .modal-wrap { box-shadow: 0 -2px 8px -3px rgba(0, 0, 0, .3); }
  .modal.from_center { display: flex; align-items: center; justify-content: center; }
  .modal.from_top .modal-wrap { position: absolute; top: 0; left: 0; right: 0; }
  .modal.from_bottom .modal-wrap { position: absolute; bottom: 0; left: 0; right: 0; }
  .modal.from_left .modal-wrap { position: absolute; bottom: 0; left: 0; top: 0; max-width: 100%; }
  .modal.from_right .modal-wrap { position: absolute; bottom: 0; top: 0; right: 0; max-width: 100%; }
  .fade-enter-active, .fade-leave-active { transition: opacity .3s }
  .fade-enter, .fade-leave-active { opacity: 0 }
</style>

<script>
  export default {
    props: {
      type: { type: String, default: 'from_center' },
      background: { type: String, default: '#fff' }
    }
  }
</script>
