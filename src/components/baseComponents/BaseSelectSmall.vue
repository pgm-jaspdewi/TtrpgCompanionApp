<!-- Small select field used specifically to select from a list of numbers between 0 & 20 -->
<template>
  <div class="flex flex-col w-12 mx-4 my-2 h-16">
    <div class="flex justify-center">
      <label class="text-sm text-maroon font-bold uppercase">
        {{ label }}
      </label>
    </div>

    <select
      class="outline-none p-2 px-1 rounded-lg border-2 border-darkKhaki bg-lightKhaki focus:border-maroon focus:ring-1 focus:ring-maroon w-12"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled selected>{{ fillerValue }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: String,
    default: '',
    required: true
  },
  // label prop is optional, if not provided, it will not render the label
  label: {
    type: String,
    default: null
  },
  // options prop is required, it is the options for the select element
  options: {
    type: Array as () => Array<number>,
    required: true
  },
  // fillerValue prop is the value that should be displayed by default
  fillerValue: {
    type: String,
    default: null,
    required: true
  }
})
</script>
