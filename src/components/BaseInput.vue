<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-sm pl-2">
      {{ label }}
    </label>
    <input
      class="outline-none p-2 px-3 rounded-full border-2 border-darkKhaki bg-lightKaki focus:border-maroon focus:ring-1 focus:ring-maroon"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      v-bind:type="type"
      v-bind:id="id"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: String,
    default: ''
  },
  // id prop is required, it is the id of the input element
  id: {
    type: String,
    default: '',
    required: true
  },
  // label prop is optional, if not provided, it will not render the label
  label: {
    type: [String, Boolean],
    default: false
  },
  // type prop is optional, if not provided, it will default to 'text'
  type: {
    type: String,
    default: 'text'
  }
})
</script>
