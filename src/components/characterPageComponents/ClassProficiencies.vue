<!-- component that shows proficiencies and known languages of a character -->
<template>
  <div class="w-10/12 flex flex-col m-2">
    <div class="border-b-2 border-darkKhaki mt-2">
      <h2 class="text-lg text-maroon font-bold capitalize mx-2">proficiencies & languages</h2>
    </div>
    <div class="border-b-2 border-darkKhaki mt-4">
      <h3 class="text-maroon font-bold capitalize mb-1 mx-2">proficiencies</h3>
      <ul class="mx-3 mb-1">
        <li v-for="(p, index) of proficiencies" :key="index" class="capitalize">
          {{ p.name }}
        </li>
      </ul>
    </div>

    <div class="border-b-2 border-darkKhaki my-4">
      <h3 class="text-maroon font-bold capitalize mb-1 mx-2">languages</h3>
      <ul class="mx-3 mb-1">
        <li v-for="(language, index) of languages" :key="index">{{ language }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { savingThrows } from '@/interfaces'

defineProps({
  proficiencies: {
    type: Array as () => savingThrows[],
    required: true
  },
  languages: {
    type: Array as () => String[],
    required: true
  }
})
</script>
