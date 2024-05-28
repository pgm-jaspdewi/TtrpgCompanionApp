<template>
  <div v-if="noSpellcasting" class="h-form flex flex-col justify-between">
    <div class="flex justify-center mt-24">
      <div class="border-2 border-darkKhaki w-5/6 p-4 m-4 rounded-lg">
        <p class="text-center">
          The
          <span class="font-bold">{{ store.characterInfo.charClass }}</span> class does not learn
          spells.
        </p>
      </div>
    </div>
    <WizardNav :formButton="false" />
  </div>

  <div v-if="!noSpellcasting && !spellcastingAtLvl1" class="h-form flex flex-col justify-between">
    <div class="flex justify-center mt-24">
      <div class="border-2 border-darkKhaki w-5/6 p-4 m-4 rounded-lg">
        <p class="text-center">
          The <span class="font-bold">{{ store.characterInfo.charClass }}</span> class does not
          learn spells at level 1.
        </p>
      </div>
    </div>
    <WizardNav :formButton="false" />
  </div>

  <form
    v-if="spellcastingAtLvl1"
    @submit.prevent="handleSubmit"
    class="h-form flex flex-col justify-between"
  >
    <div class="flex justify-between pb-6 mt-8">
      <div class="w-6/12 pl-10 pr-6">
        <BaseLabel pl="small">Cantrips</BaseLabel>
        <div class="border-2 border-darkKhaki rounded-lg">
          <BaseSelect
            v-for="(cantrip, index) in cantripSlots"
            :key="'cantrip' + index"
            v-model="selectedCantrips[index]"
            :options="cantrips"
            :smallFormMode="true"
            class="m-2"
          />
        </div>
      </div>
      <div class="w-6/12 pr-10 pl-6">
        <BaseLabel pl="small">1st-level spells</BaseLabel>
        <div class="border-2 border-darkKhaki rounded-lg">
          <BaseSelect
            v-for="(spell, index) in spellSlots"
            :key="'cantrip' + index"
            v-model="selectedSpells[index]"
            :options="firstLevelSpells"
            :smallFormMode="true"
            class="m-2"
          />
        </div>
      </div>
    </div>
    <WizardNav />
  </form>
</template>

<script setup lang="ts">
import { BaseLabel, BaseSelect } from '@/components/baseComponents'
import WizardNav from './WizardNav.vue'
import { useWizardStore } from '@/stores/wizard-store'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { supabase } from '@/supabase'
import { type spell } from '../../interfaces'

const store = useWizardStore()

const noSpellcasting = ref<Boolean>(false)
const spellcastingAtLvl1 = ref<Boolean>(false)
const spellSlots = ref<number>(0)
const cantripSlots = ref<number>(0)

/** Spell functionality */
// Get the list of spells the class can choose from
const classSpellList = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'classes/' + store.characterInfo.charClass + '/spells'
)
// If the class can not learn spells, the list will be empty. In that case, set the noSpellcasting variable to true.
if (classSpellList.data.results.length === 0) {
  noSpellcasting.value = true
}

// Filter the list to get only the cantrips and first level spells
const cantrips = classSpellList.data.results.filter((spell: spell) => spell.level === 0)
const firstLevelSpells = classSpellList.data.results.filter((spell: spell) => spell.level === 1)

/**  functionality for amount of spells/cantrips*/
if (noSpellcasting.value === false) {
  // Get the spellCasting data belonging to the class the user chose in the previous step
  const characterClass = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'classes/' + store.characterInfo.charClass
  )
  // Get the remaining data, missing on the 5e API, from the supabase database.
  const classSpells = await supabase
    .from('spells-' + store.characterInfo.charClass)
    .select('*')
    .eq('level', '1st')
    .single()

  // Get the amount of spells the class knows at level 1.
  // If the class does not learn a limited amount of spells,
  // get the spell slots (the maximum amount of spells a character can use between long rests) instead.
  // Each class will only have first level spell slots at level one, so we only need the first object in the spellslotsByLvl object.
  spellSlots.value = classSpells.data.spellsKnown
    ? classSpells.data.spellsKnown
    : classSpells.data.spellslotsByLvl[Object.keys(classSpells.data.spellslotsByLvl)[0]]

  // Get the amount of cantrips the class knows at level 1.
  cantripSlots.value = classSpells.data.cantripsKnown

  if (characterClass.data.spellcasting && characterClass.data.spellcasting.level === 1) {
    spellcastingAtLvl1.value = true
  }
}

/** Form functionality */
// Define the form data object
const formData = reactive({
  selectedCantrips: store.characterInfo.selectedCantrips,
  selectedSpells: store.characterInfo.selected1stLvlSpells
})

// Define the validation rules
const rules = computed(() => {
  return {
    selectedCantrips: {
      $each: { required: helpers.withMessage('Field is required', required) }
    },
    selectedSpells: {
      $each: { required: helpers.withMessage('Field is required', required) }
    }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const selectedCantrips = ref(v$.value.selectedCantrips.$model)
const selectedSpells = ref(v$.value.selectedSpells.$model)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    store.nextStep({
      selectedCantrips: formData.selectedCantrips,
      selected1stLvlSpells: formData.selectedSpells
    })
  }
}
</script>
