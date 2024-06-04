<template>
  <button
    @click="handleClick"
    :class="[ 
      store.step != step && spellcaster ? 'bg-paleGoldGrayed border-2 hover:bg-maroon hover:text-paleGold' : 'bg-paleGold border-t-2 border-x-2 cursor-default',
      store.step != step && !spellcaster ? 'bg-paleGoldGrayed border-2 text-maroon/50 border-b-maroon line-through' : 'border-maroon'
      ]"
    class="h-8 px-4 py-1 mx-1 rounded-t-md font-bold  text-maroon border-maroon"
    :disabled="store.step === step || !spellcaster"
  >
    {{ btnContent }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  btnContent: {
    type: String,
    required: true
  },
  step: {
    type: Number,
    required: true
  },
  spellcaster : {
    type: Boolean,
    required: true
  }

})

import { useCharPageStore } from '@/stores/characterPage-store'
import { toRefs } from 'vue'
const store = useCharPageStore()

const { step } = toRefs(props)

const handleClick = () => {
  store.setStep(step.value)
}
</script>