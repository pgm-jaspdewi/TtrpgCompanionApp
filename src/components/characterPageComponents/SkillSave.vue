<template>
  <div>{{ skill.name }} ({{ connectedStat }}) {{ skillModifier }}</div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'
import axios from 'axios'

import { computed, ref, watch } from 'vue'

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
  saves: {
    type: Array as () => savingThrows[],
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
// check if the character is proficient in the stat
const proficient = ref<boolean>(false)

const getSkillStat = async () => {
  // Fetch the skill data from the API
  const response = await axios.get(import.meta.env.VITE_5E_URL + props.skill.url)
  // Get the index of the stat connected to the skill
  const index = response.data.ability_score.index

  // Set the connected stat
  connectedStat.value = index
  // Check if the character is proficient in the stat
  const savesIndexes: string[] = props.saves.map((save) => save.index)
  // Set whether the character is proficient in said stat
  proficient.value = savesIndexes.includes(index)
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
</script>
