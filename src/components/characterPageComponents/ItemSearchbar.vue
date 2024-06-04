<template>
  <div>
    <!-- 
      To execute a function as soon as searchitem is changed use @input instead of @change
      @input triggers every time the input field is changed
      @change only triggers when the input field loses focus
     -->
    <input 
    type="text"
    :placeholder="spellSearch ? 'Search for a spell...': 'Search an item...'"
    class="outline-none w-full  py-1 pl-4  border-2 border-darkKhaki rounded-lg focus:border-maroon focus:ring-1 focus:ring-maroon"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
  spellSearch: {
    type: Boolean,
    default: false
  }
})



</script>