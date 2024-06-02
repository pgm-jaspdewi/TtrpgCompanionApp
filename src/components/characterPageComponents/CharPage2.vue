<template>
  <!-- columns -->
  <div class="flex flex-col laptopSm:flex-row justify-between w-full">
    <!-- column 1 -->
    <div class="laptopSm:w-6/12 laptopSm:mr-10">
      <div>
        <h2 class="text-xl ml-4 capitalize font-bold text-maroon">coins</h2>
        <div class="mx-2 mb-10 flex justify-center items-center bg-maroon/50 rounded-lg shadow-lg">
          <CoinsInventory :character-id="character.id" />
        </div>
      </div>

      <div>
        <h2 class="text-xl ml-4 capitalize font-bold text-maroon">weapons</h2>
        <div
          class="mx-2 mb-10 border-2 border-darkKhaki rounded-lg w-full flex justify-center shadow-lg"
        >
          <ItemsOwned :character-id="character.id" type="weapons" :availableEquipment="equipmentWeapons"/>
        </div>
      </div>
    </div>
    <!-- column 2 -->

    <div class="laptopSm:w-6/12 laptopSm:ml-10">
      <div>
        <h2 class="text-xl ml-4 capitalize font-bold text-maroon">Equipment</h2>
        <div class="m-2 mt-1 border-2 border-darkKhaki rounded-lg flex justify-center shadow-lg">
          <ItemsOwned :character-id="character.id" type="items" :availableEquipment="equipmentItems"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails, savingThrows } from '@/interfaces'
import { ItemsOwned, CoinsInventory } from '@/components/characterPageComponents'
import { ref } from 'vue';
import axios from 'axios';

defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

// variable to store the list of weapons from the API
const apiWeaponList = ref<savingThrows[]>([])
// variable to store the list of non-equipable items (mounts & vehicles) from the API
const nonEquipableItems = ref<savingThrows[]>([])
// variable to store the list of all equipment from the API
const allEquipment = ref<savingThrows[]>([])
// variable to store the list of weapons that can be added to the characters inventory
const equipmentWeapons = ref<savingThrows[]>([])
// variable to store the list of other equipment that can be added to the characters inventory
const equipmentItems = ref<savingThrows[]>([])

const setup = async () => {
  // get list of weapons from the API
  const fetchMeleeWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/melee-weapons'
  )
  const fetchRangedWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/ranged-weapons'
  )
  apiWeaponList.value = [...fetchMeleeWeapons.data.equipment, ...fetchRangedWeapons.data.equipment]
  

  // get list of mounts and vehicles from the API
  const fetchMounts = await axios.get(import.meta.env.VITE_5E_API_URL + 'equipment-categories/mounts-and-vehicles')
  nonEquipableItems.value = fetchMounts.data.equipment

  //  get list of all equipment from the API
  const fetchEquipment = await axios.get(import.meta.env.VITE_5E_API_URL + 'equipment')
  allEquipment.value = fetchEquipment.data.results
 
  // divide the equipment into weapons and other equipment
  const filteredWeapons = allEquipment.value.filter((equipment) =>
    apiWeaponList.value.some((weapon) => equipment.index === weapon.index)
  )
  equipmentWeapons.value = filteredWeapons

  const otherEquipment = allEquipment.value.filter(
    (equipment) => !apiWeaponList.value.some((weapon) => equipment.index === weapon.index)
  )
  // filter out items that cannot be equipped (mounts & vehicles)
  const removeNonEquipableItems = otherEquipment.filter(
    (item) => !nonEquipableItems.value.some((nonEquipableItem) => item.index === nonEquipableItem.index)
  )
  equipmentItems.value = removeNonEquipableItems
}
setup()

</script>
