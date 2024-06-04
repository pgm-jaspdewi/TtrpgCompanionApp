<template>
  <div class="max-w">
    <!-- top row -->
    <div class="mb-4  w-full tabletLg:w-10/12 laptopLg:w-10/12 mx-auto flex flex-col tablet:flex-row justify-around">
      <div v-if="spellCastAbility" class="m-2 p-2 border-2 border-darkKhaki rounded-lg tablet:w-3/12 flex justify-center items-center shadow-lg">
        <p class="ml-1">Spellcasting ability</p>
        <div class="p-1 border-2 rounded-lg border-darkKhaki m-1 bg-lightKhaki ml-2 ">
          <p>{{ spellCastAbility.name }}</p>
        </div>
      </div>
      <div v-if="spellModifier" class="m-2 border-2 border-darkKhaki rounded-lg tablet:w-3/12 flex justify-center items-center shadow-lg">
        <p class="ml-1">Spell modifier</p>
        <div class="p-1 px-2 border-2 rounded-lg border-darkKhaki m-1 bg-lightKhaki ml-2 ">
          <p>{{ spellModifier >= 0 ? '+' + spellModifier: spellModifier }}</p>
        </div>
      </div>
      <div class="m-2 border-2 border-darkKhaki rounded-lg tablet:w-3/12 flex justify-center items-center shadow-lg">
        <p class="ml-1">Spell save DC</p>
        <div class="p-1 px-2 border-2 rounded-lg border-darkKhaki m-1 bg-lightKhaki ml-2 ">
          <p>{{ spellSaveDC }}</p>
        </div>
      </div>
    </div>

    <!-- second row -->
    <div class="flex flex-col laptopLg:flex-row laptopLg:items-end">
      <!-- spell slots & cantrips -->
      <div class="flex flex-col tablet:flex-row mx-7 mb-4 justify-between tablet:items-end laptopLg:w-1/2 laptopLg:mr-1">
        <div
          class="border-2 border-darkKhaki rounded-lg h-80 tablet:w-1/2 flex justify-center items-center"
        >
          Spell slots
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Cantrips
        </div>
      </div>

      <!-- spells level 1 - 3 -->
      <div class="flex flex-col tablet:flex-row mx-7 mb-4 justify-between laptopLg:w-1/2 laptopLg:ml-1">
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 1 spells
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 2 spells
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 3 spells
        </div>
      </div>
    </div>

    <!-- third row -->
    <div class="flex flex-col laptopLg:flex-row laptopLg:items-end">
      <!-- spells level 4 - 6 -->
      <div class="flex flex-col tablet:flex-row  mx-7 mb-4 justify-between laptopLg:w-1/2 laptopLg:mr-1">
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 4 spells
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 5 spells
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 6 spells
        </div>
      </div>

      <!-- spells level 7 - 9 -->
      <div class="flex flex-col tablet:flex-row  mx-7 mb-4 justify-between laptopLg:w-1/2 laptopLg:ml-1">
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 7 spells
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 8 spells
        </div>
        <div
          class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-1/3 flex justify-center items-center mx-1"
        >
          Level 9 spells
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { characterDetails, characterStats, savingThrows, spell } from '@/interfaces';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
 
const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  },
  spellList: {
    type: Array as () => spell[],
    required: true
  }
})


const spellCastAbility = ref<savingThrows>()
const spellCastingStat = ref<number>()
const spellModifier = ref<number>()
const spellSaveDC = ref<number>()
// console.log(props.character.stats)

const setup = async () => {
  const characterClass = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'classes/' + props.character.class
  )
  // console.log(characterClass.data)
  spellCastAbility.value = characterClass.data.spellcasting.spellcasting_ability
  // console.log(spellCastAbility.value)
  const jsonObject: characterStats = props.character.stats
  if (!spellCastAbility.value) {
    console.log('no spellcasting ability')
  }
  else {
    const value = jsonObject[spellCastAbility.value.index as keyof characterStats]
    spellCastingStat.value = parseInt(value)
  }
  
}
setup()

// Calculate the proficiency bonus according to the dnd rules
const proficiencyBonus = computed(() => {
  return Math.floor((props.character.level - 1) / 4) + 2
})

// Calculate the spell modifier according to the dnd rules
watch(spellCastingStat, () => {
  const modifier = computed(() => {
    if (!spellCastingStat.value) {
      return 0
    }
  return Math.floor((spellCastingStat.value - 10) / 2)
  
})
spellModifier.value = modifier.value
spellSaveDC.value = 8 + proficiencyBonus.value + spellModifier.value
})




</script>
