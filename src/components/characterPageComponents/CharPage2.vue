<template>
  <!-- columns -->
  <div class="flex flex-col laptopSm:flex-row justify-between w-full">
    <!-- column 1 -->
    <div class="laptopSm:w-6/12 laptopSm:mr-10">
      <div>
        <h2 class="text-xl ml-4 capitalize font-bold text-maroon">coins</h2>
        <div class="mx-2 mb-10 flex justify-center items-center">
          <CoinsInventory :character-id="character.id" />
        </div>
      </div>

      <div>
        <h2 class="text-xl ml-4 capitalize font-bold text-maroon">weapons</h2>
        <div class="mx-2 mb-10 border-2 border-darkKhaki rounded-lg w-full flex justify-center">
          <ItemsOwned :items="characterWeaponList" type="weapons" />
        </div>
      </div>
    </div>
    <!-- column 2 -->
    <div class="laptopSm:w-6/12 laptopSm:ml-10">
      <div class="m-2 mt-1 border-2 border-darkKhaki rounded-lg flex justify-center">
        <ItemsOwned :items="characterEquipment" type="items" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails, equipment, savingThrows } from '@/interfaces'
import { ItemsOwned, CoinsInventory } from '@/components/characterPageComponents'
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

const apiWeaponList = ref<savingThrows[]>([])
const characterWeaponList = ref<equipment[]>([])
const characterEquipment = ref<equipment[]>([])

// Fetch the necessary data for the character page and it's components
const setupFunction = async () => {
  // get list of weapons from the API
  const fetchMeleeWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/melee-weapons'
  )
  const fetchRangedWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/ranged-weapons'
  )
  apiWeaponList.value = [...fetchMeleeWeapons.data.equipment, ...fetchRangedWeapons.data.equipment]
  const filteredWeapons = props.character.equipment.filter((equipment) =>
    apiWeaponList.value.some((weapon) => equipment.item === weapon.index)
  )
  const otherEquipment = props.character.equipment.filter(
    (equipment) => !apiWeaponList.value.some((weapon) => equipment.item === weapon.index)
  )
  characterWeaponList.value = filteredWeapons
  characterEquipment.value = otherEquipment
  console.log(characterWeaponList.value)
}
setupFunction()
</script>
