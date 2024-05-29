<template>
  <div v-if="traitDetails" class="bg-lightKhaki rounded-lg mx-1 my-2 p-2">
    <h3 class="text-lg font-bold">{{ traitDetails.name }}</h3>
    <p>{{ traitDetails.desc }}</p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { defineProps, ref } from 'vue'

const props = defineProps({
  traitUrl: {
    type: String,
    required: true
  }
})

const traitDetails = ref<{ name: String; desc: String }>()

const setup = async () => {
  const details = await axios.get(import.meta.env.VITE_5E_URL + props.traitUrl)

  traitDetails.value = {
    name: details.data.name,
    desc: details.data.desc[0]
  }
}
setup()
</script>
