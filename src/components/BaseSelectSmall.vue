<!-- Small select field used specifically to select from a list of numbers between 0 & 20 -->
<template>
  <div class="flex flex-col w-12 mx-4 my-2">
    <div class="flex justify-center">
      <label class="text-sm text-maroon font-bold uppercase">
        {{ label }}
      </label>
    </div>

    <select
      class="outline-none p-2 px-1 rounded-lg border-2 border-darkKhaki bg-lightKaki focus:border-maroon focus:ring-1 focus:ring-maroon w-12"
    >
      <option value="" disabled></option>
      <option v-for="(option, index) in store.modalOptions" :key="index" :value="option.value">
        {{ option.value }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: String,
    default: ''
  },
  // label prop
  label: {
    type: String,
    default: ''
  }
})

import { useStatModalStore } from '@/stores/modal-stores'

const store = useStatModalStore()
</script>

<!-- try to figure this out:  https://codesandbox.io/p/sandbox/elated-smoke-lwcriw?file=%2Fsrc%2Fcomponents%2FDisabledOptionOnSelect.vue-->
