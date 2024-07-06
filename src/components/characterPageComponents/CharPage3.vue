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
      <LeveledSpellsList :spells="availableSpellsCantrips" :character="{id: character.id, name: character.name}" title="Cantrips" :spellLevel="0"/>    
      <LeveledSpellsList :spells="availableSpellsLevel1" :character="{id: character.id, name: character.name}" title="1st level spells" :spellLevel="1"/>
      <LeveledSpellsList :spells="availableSpellsLevel2" :character="{id: character.id, name: character.name}" title="2nd level spells" :spellLevel="2"/>
      <LeveledSpellsList :spells="availableSpellsLevel3" :character="{id: character.id, name: character.name}" title="3rd level spells" :spellLevel="3"/>
      <LeveledSpellsList :spells="availableSpellsLevel4" :character="{id: character.id, name: character.name}" title="4th level spells" :spellLevel="4"/>
      <LeveledSpellsList :spells="availableSpellsLevel5" :character="{id: character.id, name: character.name}" title="5th level spells" :spellLevel="5"/>
      <LeveledSpellsList :spells="availableSpellsLevel6" :character="{id: character.id, name: character.name}" title="6th level spells" :spellLevel="6"/>
      <LeveledSpellsList :spells="availableSpellsLevel7" :character="{id: character.id, name: character.name}" title="7th level spells" :spellLevel="7"/>
      <LeveledSpellsList :spells="availableSpellsLevel8" :character="{id: character.id, name: character.name}" title="8th level spells" :spellLevel="8"/>
      <LeveledSpellsList :spells="availableSpellsLevel9" :character="{id: character.id, name: character.name}" title="9th level spells" :spellLevel="9"/>
    
    </div>

  </div>
</template>

<script setup lang="ts">
import type { characterDetails, characterStats, savingThrows, spell } from '@/interfaces';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import LeveledSpellsList from './LeveledSpellsList.vue';
 
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
