<template>
  <div 
  @click="openModal"
  class="flex justify-center cursor-pointer hover:bg-maroon/50 p-1 rounded-lg group">
    <div
      class="border-2 border-maroon rounded-xl uppercase py-0.5 w-1/2 flex justify-center items-center mr-2 relative group-hover:text-lightKhaki group-hover:bg-maroon group-hover:border-darkKhaki"
    >
      {{ name }}
      <div
        :class="proficient ? 'bg-maroon' : 'bg-paleGold'"
        class="absolute border-2 border-maroon rounded-full w-4 h-4 right-proficiency group-hover:border-darkKhaki"
      ></div>
    </div>
    <div
      v-if="saveBonus >= 0"
      class="border-2 border-darkKhaki rounded-xl py-0.5 w-1/4 flex justify-center group-hover:text-lightKhaki group-hover:bg-maroon"
    >
      +{{ saveBonus }}
    </div>
    <div v-else class="border-2 border-darkKhaki rounded-xl py-0.5 w-1/4 flex justify-center group-hover:text-lightKhaki group-hover:bg-maroon">
      {{ saveBonus }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'
import { computed } from 'vue'
import { useModalStore } from '@/stores/modal-store'

const modal = useModalStore()

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  saves: {
    type: Array as () => savingThrows[],
    required: true
  },
  stat: {
    type: Number,
    required: true
  },
  proficiencyBonus: {
    type: Number,
    required: true
  }
})

// calculate the stat-modifier bonus according to the dnd rules
const modifier = computed(() => {
  return Math.floor((props.stat - 10) / 2)
})

// Check if the character is proficient in the saving throw
const proficient = computed(() => {
  const savesIndexes: string[] = props.saves.map((save) => save.index)
  return savesIndexes.includes(props.name)
})

// Calculate the saving throw bonus according to the dnd rules
const saveBonus = computed(() => {
  // If the character is proficient in the saving throw, add the proficiency bonus to the modifier
  const savesIndexes: string[] = props.saves.map((save) => save.index)
  if (savesIndexes.includes(props.name)) {
    return props.proficiencyBonus + modifier.value
  } else {
    return modifier.value
  }
})

const openModal = () => {
  
  modal.diceThrowInfo = {
    type: 'saving throw',
    name: props.name,
    bonus: saveBonus.value
  }
  modal.toggleDiceThrowModal()
}
</script>
