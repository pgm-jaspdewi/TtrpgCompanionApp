<template >
  <div v-if="searchResults" class="flex justify-center border-darkKhaki border-t-2 mx-2">
   <div class="capitalize w-10/12 border-darkKhaki  border-r-2 p-2 pl-3 flex items-center">
    {{ spell.name }}
   </div>
   <button
     @click="$emit('add-item', index)"
     class="group w-2/12 flex justify-center items-center border-darkKhaki"
   >
     <FaPlus class="fill-darkKhaki group-hover:fill-maroon w-5 h-5" />
   </button>
 </div>
 <div v-else class="flex ">
   <div class="capitalize w-10/12  border-darkKhaki  border-r-2 p-2 pl-3 flex items-center">
     {{ spell.name }}
   </div>
   <button
     @click="$emit('delete-spell', index)"
     class="group w-2/12 flex justify-center items-center "
   >
     <FaTrash class="fill-darkKhaki group-hover:fill-maroon w-5 h-5" />
   </button>
 </div>
</template>

<script setup lang="ts">
import { FaTrash, FaPlus } from 'vue3-icons/fa6'

const props = defineProps({
 spell: {
   type: Object as () => {name: string, level: number},
   required: true
 },
 index: {
   type: Number,
   required: true
 },
 searchResults: {
   type: Boolean,
   default: false,
   required: false,
 }
})
</script>