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

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

// fetch for the list of weapons and items from the API
const apiWeaponList = ref<savingThrows[]>([])
const allEquipment = ref<savingThrows[]>([])
const equipmentWeapons = ref<savingThrows[]>([])
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
  // console.log(apiWeaponList.value)

  //  get list of all equipment from the API
  const fetchEquipment = await axios.get(import.meta.env.VITE_5E_API_URL + 'equipment')
  allEquipment.value = fetchEquipment.data.results
  // console.log(allEquipment.value)
 
  // divide the equipment into weapons and other equipment
  const filteredWeapons = allEquipment.value.filter((equipment) =>
    apiWeaponList.value.some((weapon) => equipment.index === weapon.index)
  )
  // filter out items already owned by the character (they will not show up in the search bar)
  const removeOwnedWeapons = filteredWeapons.filter((weapon) => !props.character.weapons.some((ownedWeapon) => ownedWeapon.item === weapon.index))
  equipmentWeapons.value = removeOwnedWeapons

  const otherEquipment = allEquipment.value.filter(
    (equipment) => !apiWeaponList.value.some((weapon) => equipment.index === weapon.index)
  )
  // filter out items already owned by the character (they will not show up in the search bar)
  const removeOwnedItems = otherEquipment.filter((item) => !props.character.equipment.some((ownedItem) => ownedItem.item === item.index))
  equipmentItems.value = removeOwnedItems
}
setup()

</script>
