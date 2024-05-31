<template>
  <div>
    <!-- 
      To execute a function as soon as searchitem is changed use @input instead of @change
      @input triggers every time the input field is changed
      @change only triggers when the input field loses focus
     -->
    <input 
    type="text"
    placeholder="Search an item..."
    class="outline-none w-full  py-1 pl-4  border-2 border-darkKhaki rounded-lg focus:border-maroon focus:ring-1 focus:ring-maroon"
    v-model="searchItem"
    @input="test"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const searchItem = ref('')
const test = () => {
  console.log(searchItem.value)
}
</script>