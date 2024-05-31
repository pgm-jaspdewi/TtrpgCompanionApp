<template>
  <div class="flex flex-col items-center">
    <h3 class="text-lg text-maroon font-bold m-1 mt-2">Attacks</h3>
    <div class="flex justify-center w-full">
      <p class="w-2/6 text-center">Name</p>
      <p class="w-1/6 text-center">Bonus</p>
      <p class="w-2/6 text-center">Damage</p>
    </div>
    <button
      v-for="(weapon, index) of equipedWeapons"
      :key="index"
      class="flex justify-center items-center w-full laptopSm:w-11/12 py-1 last:mb-4 group hover:bg-maroon/50 rounded-lg"
    >
      <p
        class="w-2/6 text-center border-2 border-darkKhaki rounded-lg bg-lightKhaki group-hover:bg-maroon group-hover:text-lightKhaki"
      >
        {{ weapon.name }}
      </p>
      <p
        v-if="weapon.attack_bonus >= 0"
        class="w-1/6 text-center border-2 border-darkKhaki mx-1 rounded-lg bg-lightKhaki group-hover:bg-maroon group-hover:text-lightKhaki"
      >
        +{{ weapon.attack_bonus }}
      </p>
      <p
        v-else-if="weapon.attack_bonus < 0"
        class="w-1/6 text-center border-2 border-darkKhaki rounded-lg bg-lightKhaki group-hover:bg-maroon group-hover:text-lightKhaki"
      >
        {{ weapon.attack_bonus }}
      </p>
      <p
        class="w-2/6 text-center border-2 border-darkKhaki rounded-lg bg-lightKhaki group-hover:bg-maroon group-hover:text-lightKhaki"
      >
        {{ weapon.damage_die }} {{ weapon.damage_type }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { equipment, savingThrows, weaponDetails } from '@/interfaces'
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  weaponList: {
    type: Array as () => savingThrows[],
    required: true
  },
  weapons: {
    type: Array as () => equipment[],
    required: true
  },
  proficiency: {
    type: Number,
    required: true
  },
  dexterity: {
    type: Number,
    required: true
  },
  strength: {
    type: Number,
    required: true
  }
})

const equipedWeapons = ref<weaponDetails[]>([])

// Get the details for weapons that the character has equipped
const filteredWeapons = props.weaponList.filter((weapon) =>
  props.weapons.some((equipment) => equipment.item === weapon.name)
)
filteredWeapons.forEach((weapon) => {
  const fetchWeaponDetails = async () => {
    const response = await axios.get(import.meta.env.VITE_5E_URL + weapon.url)
    const attackBonus = ref(0)
    if (response.data.weapon_range === 'Melee') {
      attackBonus.value = Math.floor((props.strength - 10) / 2) + props.proficiency
    } else {
      attackBonus.value = Math.floor((props.dexterity - 10) / 2) + props.proficiency
    }
    equipedWeapons.value.push({
      index: response.data.index,
      name: response.data.name,
      damage_die: response.data.damage.damage_dice,
      damage_type: response.data.damage.damage_type.index,
      range: response.data.weapon_range,
      attack_bonus: attackBonus.value
    })
  }
  fetchWeaponDetails()
})
</script>
