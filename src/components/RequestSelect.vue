<!-- 
  This select input will first make the fetchrequest that is responisble for filling it's options.
  This is necessary because at some places in the app the options are not known at compile time.
  However, the url necessary for the fetch request is known at compile time.
  Therefore, the url is passed as a prop to this component, and the fetch request is made in the setup function.
 -->
<template>
  <div class="flex flex-col w-5/12">
    <select
      class="text-sm p-1 m-2 my-1 rounded-lg outline-none px-3 border-2 border-darkKhaki bg-lightKaki focus:border-maroon focus:ring-1 focus:ring-maroon"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled :selected="'' === modelValue">Select equipment</option>
      <option v-for="item in options" :key="item.index" :value="item.index">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const props = defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: String,
    default: '',
    required: true
  },
  url: {
    type: String,
    default: '',
    required: true
  }
})

const generateValue = (index: string) => {
  return { amount: 1, item: index }
}

const request = await axios.get(import.meta.env.VITE_5E_URL + props.url)
const options = request.data.equipment
</script>
