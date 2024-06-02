<template>
  <!-- hitpoint information -->
  <div
    class="bg-paleGold border-2 border-maroon rounded-lg w-auto m-2 flex items-center justify-center"
  >
    <!-- hitpoints display -->
    <div class="w-1/2 flex flex-col items-center">
      <h3 class="text-xl text-maroon font-bold">Hit points</h3>
      <div class="text-3xl flex justify-between items-center w-1/2">
        <p
          :class="actualHp <= character.maxHitPoints / 4 ? 'text-redishBrown font-bold' : 'text-britishRacingGreen'"
          class="w-2/5 text-left"
        >
          {{ actualHp }}
        </p>
        <p class="text-5xl">/</p>
        <p class="w-2/5 text-right">{{ character.maxHitPoints }}</p>
      </div>
      <div class="flex justify-between items-center w-2/3">
        <p class="ml-2">Current</p>
        <p class="mr-5">Max</p>
      </div>
    </div>
    <!-- hitpoints buttons -->
    <form @submit.prevent class="w-1/2 flex flex-col items-center">
      <button
        :disabled="formData.hitPoints === 0"
        @click="submitHeal"
        :class=" formData.hitPoints > 0 ? 'text-britishRacingGreen border-britishRacingGreen hover:bg-britishRacingGreen hover:text-paleGold' : 'text-britishRacingGreen/50 border-britishRacingGreen/50'"
        class="border-2 rounded-lg px-2 m-1 w-1/2"
      >
        Heal
      </button>
      <input
        type="number"
        min="0"
        v-model="formData.hitPoints"
        class="border-2 border-darkKhaki rounded-lg px-2 w-1/2 outline-none focus:ring-1 focus:ring-darkKhaki"
      />
      <button
        :disabled="formData.hitPoints === 0"
        @click="submitDamage"
        :class=" formData.hitPoints > 0 ? 'text-redishBrown border-redishBrown hover:bg-redishBrown hover:text-paleGold' : 'text-redishBrown/50 border-redishBrown/50'"
        class="border-2 rounded-lg px-2 m-1 w-1/2"
      >
        Damage
      </button>
    </form>
  </div>
  <!-- hit dice information -->
  <div
    class="bg-paleGold border-2 border-maroon rounded-lg m-2 mx-auto flex items-center justify-center px-3"
  >
    <p class="m-1 text-maroon font-bold">Hit Dice</p>
    <p class="m-1 border-2 border-darkKhaki bg-lightKhaki rounded-lg px-2 flex items-center">
      1d{{ hitDie }} / level
    </p>
  </div>
  <!-- AC, initiative & speed -->
  <div class="w-auto m-2 flex justify-around">
    <div class="border-2 border-maroon rounded-lg w-1/4 flex flex-col items-center m-2 bg-paleGold">
      <div
        class="border-2 border-darkKhaki rounded-lg m-1 mt-2 mb-0.5 px-4 tabletLg:px-6 laptopSm:px-8 py-3 bg-lightKhaki"
      >
        <p class="text-3xl">{{ calculateAC }}</p>
      </div>
      <p class="mb-1 mx-1 font-bold text-maroon">Armor Class</p>
    </div>
    <div class="border-2 border-maroon rounded-lg w-1/4 flex flex-col items-center m-2 bg-paleGold">
      <div
        class="border-2 border-darkKhaki rounded-lg m-1 mt-2 mb-0.5 px-4 tabletLg:px-6 laptopSm:px-8 py-3 bg-lightKhaki"
      >
        <p v-if="dexBonus < 0" class="text-3xl">{{ dexBonus }}</p>
        <p v-else class="text-3xl">+{{ dexBonus }}</p>
      </div>
      <p class="mb-1 font-bold text-maroon">Initiative</p>
    </div>
    <div class="border-2 border-maroon rounded-lg w-1/4 flex flex-col items-center m-2 bg-paleGold">
      <div
        class="border-2 border-darkKhaki rounded-lg m-1 mt-2 mb-0.5 px-2 tabletLg:px-4 laptopSm:px-6 py-3 bg-lightKhaki"
      >
        <div class="text-sm flex items-end">
          <p class="text-3xl">{{ speed }}</p>
          <p>ft.</p>
        </div>
      </div>
      <p class="mb-1 font-bold text-maroon">Speed</p>
    </div>
  </div>
  <!-- death saves -->
  <!-- <div class="bg-paleGold border-2 w-auto m-2 h-20"></div> -->
</template>

<script setup lang="ts">
import type { characterDetails, savingThrows } from '@/interfaces'
import { supabase } from '@/supabase'
import axios from 'axios'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  hitDie: {
    type: Number,
    required: true
  },
  character: {
    type: Object as () => characterDetails,
    required: true
  },
  dexterity: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  }
})

const formData = reactive({
  hitPoints: 0
})
const actualHp = ref(0)
const armorList = ref<savingThrows[]>([])
const characterArmor = ref<savingThrows>()
const ACValues = ref<{ base: number; dex_bonus: boolean }>()

const setup = async () => {
  const fetchArmors = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/armor'
  )
  armorList.value = fetchArmors.data.equipment
  for (const item of props.character.equipment) {
    if (armorList.value.some((armor) => armor.index === item.item)) {
      characterArmor.value = armorList.value.find((armor) => armor.index === item.item)
    }
  }
  if (characterArmor.value) {
    const fetchEquipedArmor = await axios.get(
      import.meta.env.VITE_5E_URL + characterArmor.value.url
    )
    ACValues.value = fetchEquipedArmor.data.armor_class
  }
}
setup()

// calculate the initiative bonus
const dexBonus = computed(() => {
  return Math.floor((props.dexterity - 10) / 2)
})

// Get the current hit points from the database
const currentHp = async () => {
  const { data, error } = await supabase
    .from('characters')
    .select('currentHitPoints')
    .eq('id', props.character.id)
    .single()
  if (error) {
    console.error('Error getting current hit points:', error)
  } else {
    actualHp.value = data.currentHitPoints
  }
}
currentHp()

// Submit the heal or damage form data to the database and update the current hit points
const submitHeal = async () => {
  const newHp = actualHp.value + formData.hitPoints
  const newTotalHp = newHp > props.character.maxHitPoints ? props.character.maxHitPoints : newHp
  const { error } = await supabase
    .from('characters')
    .update({ currentHitPoints: newTotalHp })
    .eq('id', props.character.id)
  if (error) {
    console.error('Error updating hit points:', error)
  } else {
    currentHp()
  }
}
const submitDamage = async () => {
  const newHp = actualHp.value - formData.hitPoints
  const newTotalHp = newHp < 0 ? 0 : newHp
  const { error } = await supabase
    .from('characters')
    .update({ currentHitPoints: newTotalHp })
    .eq('id', props.character.id)
  if (error) {
    console.error('Error updating hit points:', error)
  } else {
    currentHp()
  }
}

const test = () => {
  // const armor = props.armorList.index.includes()
}
test()

const calculateAC = computed(() => {
  if (ACValues.value && ACValues.value.dex_bonus) {
    return ACValues.value.base + dexBonus.value
  } else if (ACValues.value) {
    return ACValues.value.base
  } else {
    return 10
  }
})
</script>
