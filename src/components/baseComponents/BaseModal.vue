<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-20"
    >
      <Transition name="modal-inner">
        <div
          v-if="modalActive"
          class="p-4 bg-paleGold self-start mt-5 tablet:mt-20 max-w-screen-phone tablet:max-w-screen-tablet border-2 border-darkKhaki rounded-lg"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
    required: true
  }
})
</script>

<!-- styling for modal transition -->
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
