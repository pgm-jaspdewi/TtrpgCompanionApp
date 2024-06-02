<template>
   <div v-if="searchResults" class="flex justify-center border-darkKhaki border-b-2 first:border-t-2 ">
    <div class="capitalize w-9/12 border-darkKhaki  border-r-2 p-2 pl-3 flex items-center">
      {{ item.item }}
    </div>
    <div class="capitalize w-2/12 border-darkKhaki  border-r-2 p-1 text-center">
      <input
        min="1"
        type="number"
        v-model="amount"
        class="outline-none w-11/12 p-1 text-center border-2 border-darkKhaki rounded-lg focus:border-maroon focus:ring-1 focus:ring-maroon"
      />
    </div>
    <button
      @click="$emit('add-item', amount, index)"
      class="group w-1/12 flex justify-center items-center border-darkKhaki"
    >
      <FaPlus class="fill-darkKhaki group-hover:fill-maroon w-5 h-5" />
    </button>
  </div>
  <div v-else class="flex">
    <div class="capitalize w-9/12 border-darkKhaki border-b-2 border-r-2 p-2 pl-3 flex items-center">
      {{ item.item }}
    </div>
    <div class="capitalize w-2/12 border-darkKhaki border-b-2 border-r-2 p-1 text-center">
      <input
        min="1"
        type="number"
        @blur="$emit('update-item', amount, index)"
        v-model="amount"
        class="outline-none w-11/12 p-1 text-center border-2 border-darkKhaki rounded-lg focus:border-maroon focus:ring-1 focus:ring-maroon"
      />
    </div>
    <button
      @click="$emit('delete-item', index)"
      class="group w-1/12 flex justify-center items-center border-b-2 border-darkKhaki"
    >
      <FaTrash class="fill-darkKhaki group-hover:fill-maroon w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { equipment } from '@/interfaces'
import { FaTrash, FaPlus } from 'vue3-icons/fa6'
import { ref,  watch  } from 'vue'



const props = defineProps({
  item: {
    type: Object as () => equipment,
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

const amount = ref(props.item.amount)

watch(() => props.item.amount, (newVal) => {
  amount.value = newVal
})
</script>
