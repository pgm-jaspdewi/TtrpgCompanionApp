<template>
  <div>{{ skill.name }} {{ skillModifier }}</div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'
import axios from 'axios'

import { computed, ref, watch } from 'vue'
import BaseInputSmall from '../baseComponents/BaseInputSmall.vue'

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

// console.log(props.characterStats)
const stat = ref<number>(0)
const bonus = ref<number>(0)
const proficient = ref<boolean>(false)

// console.log(props.characterSkills)

const getSkillStat = async () => {
  const response = await axios.get(import.meta.env.VITE_5E_URL + props.skill.url)
  const key = response.data.ability_score.index
  const savesIndexes: string[] = props.saves.map((save) => save.index)
  // console.log(savesIndexes)
  // console.log(key)
  proficient.value = savesIndexes.includes(key)
  // console.log(proficient.value)
  if (key != undefined) {
    stat.value = props.characterStats[key]
  }
}

getSkillStat()

watch(stat, () => {
  bonus.value = Math.floor((stat.value - 10) / 2)
  // console.log(bonus.value)
})

// Calculate the modifier according to the dnd rules
const skillModifier = computed(() => {
  if (proficient.value) {
    return props.proficiencyBonus + bonus.value
  } else {
    return bonus.value
  }
})
</script>
