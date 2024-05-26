<template>
  <div>{{ skill.name }}</div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  skill: {
    type: Object as () => savingThrows,
    required: true
  },
  characterSkills: {
    type: Array<String>,
    required: true
  }
})

const skillStats = ref<string[]>([])

const getSkillStat = async () => {
  const response = await axios.get(import.meta.env.VITE_5E_URL + props.skill.url)
  skillStats.value = response.data.ability_score.name
  console.log(skillStats.value)
}
getSkillStat()
</script>
