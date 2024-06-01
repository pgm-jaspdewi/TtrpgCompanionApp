<template>
  <div 
  @click="openModal"
  class="flex justify-center px-2 py-1 cursor-pointer hover:bg-maroon/50 p-1 rounded-lg group">
    <button
      class="border-2 border-maroon w-9/12 rounded-xl pl-5 py-1 mr-2 relative flex items-center group-hover:text-lightKhaki group-hover:bg-maroon group-hover:border-darkKhaki"
    >
      {{ skill.name }} ({{ connectedStat }})
      <div
        :class="proficient ? 'bg-maroon' : 'bg-paleGold'"
        class="absolute border-2 border-maroon rounded-full w-4 h-4 right-proficiencyLg group-hover:border-darkKhaki"
      ></div>
    </button>
    <div
      v-if="skillModifier >= 0"
      class="border-2 border-darkKhaki w-2/12 rounded-xl flex justify-center py-1 group-hover:text-lightKhaki group-hover:bg-maroon" 
    >
      +{{ skillModifier }}
    </div>
    <div v-else class="border-2 border-darkKhaki w-2/12 rounded-xl flex justify-center py-1 group-hover:text-lightKhaki group-hover:bg-maroon">
      {{ skillModifier }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { useModalStore } from '@/stores/modal-store'

const modal = useModalStore()

const props = defineProps({
  skill: {
    type: Object as () => savingThrows,
    required: true
  },
  characterSkills: {
    type: Array<String>,
    required: true
  },
  characterStats: {
    type: Object,
    required: true
  },
  proficiencyBonus: {
    type: Number,
    required: true
  }
})

// skill stat according to the dnd rules
const stat = ref<number>(0)
// stat-modifier bonus according to the dnd rules
const statModifier = ref<number>(0)
// stat connected to the displayed skill
const connectedStat = ref<string>('')
// check if the character is proficient in the skill
const proficient = computed(() => {
  return props.characterSkills.includes(props.skill.name)
})

const getSkillStat = async () => {
  // Fetch the skill data from the API
  const response = await axios.get(import.meta.env.VITE_5E_URL + props.skill.url)
  // Get the index of the stat connected to the skill
  const index = response.data.ability_score.index
  // Set the connected stat
  connectedStat.value = index
  // Set the stat value
  if (index != undefined) {
    stat.value = props.characterStats[index]
  }
}
getSkillStat()

// Watch the stat value and update the modifier accordingly
watch(stat, () => {
  statModifier.value = Math.floor((stat.value - 10) / 2)
  // console.log(modifier.value)
})

// Return the skill modifier, which is the stat modifier with the proficiency bonus added if the character is proficient in the stat
const skillModifier = computed(() => {
  if (props.characterSkills.includes(props.skill.name)) {
    return statModifier.value + props.proficiencyBonus
  } else {
    return statModifier.value
  }
})

const openModal = () => {
  modal.saveDiceInfo({
    type: 'skill check',
    name: props.skill.name,
    bonus: skillModifier.value
  })
  modal.toggleDiceThrowModal()
}
</script>
