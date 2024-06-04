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
    
    <!-- second row cantrips -> level 4 -->
    <div class="flex flex-col tablet:flex-row tablet:flex-wrap justify-center">
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        Cantrips
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 1 spells
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 2 spells
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 3 spells
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 4 spells
      </div>

      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 5 spells
      </div>

      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 6 spells
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 7 spells
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 8 spells
      </div>
      <div
        class="border-2 border-darkKhaki rounded-lg h-72 tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6 flex justify-center items-center m-1"
      >
        level 9 spells
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

const setup = async () => {
  const characterClass = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'classes/' + props.character.class
  )
  spellCastAbility.value = characterClass.data.spellcasting.spellcasting_ability
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

const proficiencyBonus = computed(() => {
  return Math.floor((props.character.level - 1) / 4) + 2
})

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

// sort spells by level
const availableSpellsCantrips = computed(() => {
  return props.spellList.filter(spell => spell.level === 0)
})
const availableSpellsLevel1 = computed(() => {
  return props.spellList.filter(spell => spell.level === 1)
})
const availableSpellsLevel2 = computed(() => {
  return props.spellList.filter(spell => spell.level === 2)
})
const availableSpellsLevel3 = computed(() => {
  return props.spellList.filter(spell => spell.level === 3)
})
const availableSpellsLevel4 = computed(() => {
  return props.spellList.filter(spell => spell.level === 4)
})
const availableSpellsLevel5 = computed(() => {
  return props.spellList.filter(spell => spell.level === 5)
})
const availableSpellsLevel6 = computed(() => {
  return props.spellList.filter(spell => spell.level === 6)
})
const availableSpellsLevel7 = computed(() => {
  return props.spellList.filter(spell => spell.level === 7)
})
const availableSpellsLevel8 = computed(() => {
  return props.spellList.filter(spell => spell.level === 8)
})
const availableSpellsLevel9 = computed(() => {
  return props.spellList.filter(spell => spell.level === 9)
})

</script>
