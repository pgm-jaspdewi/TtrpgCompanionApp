<template>
  <div class="flex flex-col">
    <label v-if="label" class="w-10 text-sm text-center font-bold text-maroon uppercase">
      {{ label }}
    </label>
    <input
      class="outline-none text-lg text-center p-2 py-1 rounded-lg border-2 w-12 border-darkKhaki bg-lightKhaki focus:border-maroon focus:ring-1 focus:ring-maroon [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      :value="modelValue"
      @change="$emit('update:modelValue', parseInt(($event.target as HTMLInputElement).value))"
      type="number"
      min=0
      max=20
      v-bind:id="id"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: Number,
    default: 0,
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
  }
})
</script>
