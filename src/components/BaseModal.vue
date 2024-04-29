<template>
  <div
    v-show="modalActive"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-20"
  >
    <div v-if="modalActive" class="p-4 bg-paleGold self-start mt-32 max-w-screen-tablet">
      <slot />
      <BaseButton btnContent="Close" @click="store.toggleStatModal">
        <FaXmark class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { FaXmark } from 'vue3-icons/fa6'
import { useStatModalStore } from '@/stores/modal-stores'

const store = useStatModalStore()

defineProps({
  modalActive: {
    type: Boolean,
    default: false,
    required: true
  }
})
</script>
