<template>
  <div class="relative w-96">
    <BaseH1 :title="`${rollName} ${modal.diceThrowInfo.type}`" :smaller-title="true"/>
    <div class="flex items-center justify-center mb-2">
      <p>Input the result of your roll or roll digitally</p>
    </div>
    
    <div class="flex items-center justify-center mb-2">
      <div>
        <div class="flex space-x-1 mr-2">
          <BaseInputSmall v-model="rollResult" id="result" />
        </div>
      </div>
    
      <div>
        <BaseButton type="button" btnContent="Roll digitally" @click="rollDigitally">
          <FaDiceD20 class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButton>
      </div>
    </div>
    <div class="flex items-center justify-center mb-2">
      <p> </p>
    </div>
    

    <div class="flex justify-center">
      <BaseButton @click="closeModal" btnContent="Close" :secondary="true" :mirror="true">
        <FaXmark class="fill-paleGold w-4 h-4" />
      </BaseButton>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { BaseH1, BaseButton, BaseInputSmall } from '@/components/baseComponents'
import { FaXmark, FaDiceD20 } from 'vue3-icons/fa6'
import { useModalStore } from '@/stores/modal-store'
import { ref, watch } from 'vue';
import { DiceRoll } from '@dice-roller/rpg-dice-roller'

const d20 = new DiceRoll('1d20')

const modal = useModalStore()

const rollName = ref(modal.diceThrowInfo.name)
const rollResult = ref(0)

// function to rework the name passed from the store if it is a 3-letter abbreviation
const nameReform = () => {
  if (modal.diceThrowInfo.name === 'str') {
    return 'Strength'
  } else if (modal.diceThrowInfo.name === 'dex') {
    return 'Dexterity'
  } else if (modal.diceThrowInfo.name === 'con') {
    return 'Constitution'
  } else if (modal.diceThrowInfo.name === 'int') {
    return 'Intelligence'
  } else if (modal.diceThrowInfo.name === 'wis') {
    return 'Wisdom'
  } else if (modal.diceThrowInfo.name === 'cha') {
    return 'Charisma'
  } else {
    return modal.diceThrowInfo.name
  }
}
rollName.value = nameReform()

const rollDigitally = () => {
  d20.roll()
  rollResult.value = d20.total
}


const closeModal = () => {
  modal.toggleDiceThrowModal()
}

// watch(rollResult, (newValue) => {
//   if (newValue > 0) {
//     console.log('new value:', newValue)
//   }
// })

</script>