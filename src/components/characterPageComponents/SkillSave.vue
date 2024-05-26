<template>
  <div>{{ skill.name }} ({{ connectedStat }}) {{ skillModifier }}</div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'
import axios from 'axios'
import { connected } from 'process'

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
const modifier = ref<number>(0)
// stat connected to the displayed skill
const connectedStat = ref<string>('')
// check if the character is proficient in the stat
const proficient = ref<boolean>(false)

const getSkillStat = async () => {
  // Fetch the skill data from the API
  const response = await axios.get(import.meta.env.VITE_5E_URL + props.skill.url)
  // Get the key of the stat connected to the skill
  const key = response.data.ability_score.index
  // Set the connected stat
  connectedStat.value = key
  // Check if the character is proficient in the stat
  const savesIndexes: string[] = props.saves.map((save) => save.index)
  // Set whether the character is proficient in said stat
  proficient.value = savesIndexes.includes(key)
  // Set the stat value
  if (key != undefined) {
    stat.value = props.characterStats[key]
  }
}
getSkillStat()

// Watch the stat value and update the modifier accordingly
watch(stat, () => {
  modifier.value = Math.floor((stat.value - 10) / 2)
  // console.log(modifier.value)
})

// THE SKILL PROFICIENCY BONUS IS NOT CALCULATED YET. THIS NEEDS TO BE IMPLEMENTED TOMORROW

// Calculate the modifier according to the dnd rules
const skillModifier = computed(() => {
  if (proficient.value) {
    return props.proficiencyBonus + modifier.value
  } else {
    return modifier.value
  }
})
</script>
