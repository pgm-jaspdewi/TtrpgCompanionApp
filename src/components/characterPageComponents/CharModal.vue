<template>
  <div class="relative tablet:w-96 flex flex-col">
    <div class="mt-5 tablet:mt-0">
      <BaseH1 :title="`${rollName} ${modal.diceThrowInfo.type}`" :smaller-title="true"/>
    </div>
    
    <div class="grow flex flex-col justify-center ">
      <!-- first visible when opening modal-->
      <div v-if="!damageRollContent">
        <div class="flex flex-col justify-center items-center mb-2">
          <p>Roll <span class="text-lg font-bold">1d20</span>.</p>
          <p>Fill in the result of your roll or roll digitally.</p>
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
      </div>
    
      <!-- results of non-attack roll -->
      <div v-if=" totalCalculated  && !damageRollContent">
        
        <div class="flex flex-col items-center">
          <p class="mb-2 mt-4">The total result (roll + bonus)  of your roll is:</p>
          <p class="text-sm">{{ rollResult }}{{ modal.diceThrowInfo.bonus >= 0 ? '+'+ modal.diceThrowInfo.bonus : modal.diceThrowInfo.bonus }}</p>
          <div class="border-2 border-darkKhaki rounded-lg bg-lightKhaki w-14 h-14 flex justify-center items-center mb-4 shadow-lg">
            <p class="text-center text-2xl font-semibold">{{ rollTotal }}</p>
          </div>
        </div>
        <div v-if="modal.diceThrowInfo.type != 'attack'" class="flex justify-center">
          <BaseButton @click="closeModal" btnContent="Close" :secondary="true" :mirror="false">
            <FaXmark class="fill-paleGold w-4 h-4" />
          </BaseButton>
        </div>
        <div v-else class="flex justify-center">
          <BaseButton @click="closeModal" btnContent="Didn't hit" :secondary="true" :mirror="true" class="mr-2">
            <FaXmark class="fill-paleGold w-4 h-4" />
          </BaseButton>
          <BaseButton @click="handleDamageRoll" btnContent="Hit! Roll Damage" :secondary="false" :mirror="false" class="ml-2">
            <FaDiceD20 class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    
      <!-- screen to deal with damage roll -->
      <div v-if=" damageRollContent">
        <div class="flex items-center justify-center mb-2">
          <p>Roll <span class="text-lg font-bold">{{ modal.diceThrowInfo.damageDie }}</span> to calculate how much damage you do</p>
        </div>
      
        <div class="flex items-center justify-center mb-2">
          <div>
            <div class="flex space-x-1 mr-2">
              <BaseInputSmall v-model="damageRollResult" id="result" />
            </div>
          </div>
        
          <div>
            <BaseButton type="button" btnContent="Roll digitally" @click="rollDamageDigitally">
              <FaDice class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
            </BaseButton>
          </div>
        </div>
      </div>

         <!-- results of attack roll -->
         <div v-if=" damageTotalCalculated  && damageRollContent">
        
        <div class="flex flex-col items-center">
          <p class="mb-2 mt-4">The total result (roll + bonus)  of your roll is:</p>
          <p class="text-sm">{{ damageRollResult }}{{ modal.diceThrowInfo.bonus >= 0 ? '+'+ modal.diceThrowInfo.bonus : modal.diceThrowInfo.bonus }}</p>
          <div class="border-2 border-darkKhaki rounded-lg bg-lightKhaki w-14 h-14 flex justify-center items-center mb-4 shadow-lg">
            <p class="text-center text-2xl font-semibold">{{ damageRollTotal }}</p>
          </div>
        </div>
        <div class="flex justify-center">
          <BaseButton @click="closeModal" btnContent="Close" :secondary="true" :mirror="false">
            <FaXmark class="fill-paleGold w-4 h-4" />
          </BaseButton>
        </div>
      
      </div>

    </div>
    
    <button
    @click="closeModal"
    class="absolute top-0 right-0 rounded-full w-8 h-8 flex justify-center items-center hover:bg-maroon group"
    >
        <FaXmark class="fill-darkKhaki group-hover:fill-lightKhaki w-6 h-6" />
    </button>
    
  </div>
</template>

<script setup lang="ts">
import { BaseH1, BaseButton, BaseInputSmall } from '@/components/baseComponents'
import { FaXmark, FaDiceD20, FaDice } from 'vue3-icons/fa6'
import { useModalStore } from '@/stores/modal-store'
import { ref, watch } from 'vue';
import { DiceRoll } from '@dice-roller/rpg-dice-roller'

const modal = useModalStore()
const d20 = new DiceRoll('1d20')

const rollName = ref(modal.diceThrowInfo.name)
const rollResult = ref(0)
const damageRollResult = ref(0)

const rollTotal = ref(0)
const damageRollTotal = ref(0)
const totalCalculated = ref(false)
const damageTotalCalculated = ref(false)
const damageRollContent = ref(false)

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

const rollDamageDigitally = () => {
  const damageDice = new DiceRoll(modal.diceThrowInfo.damageDie)
  damageDice.roll()
  damageRollResult.value = damageDice.total
}


const closeModal = () => {
  modal.toggleDiceThrowModal()
}

const handleDamageRoll = () => {
  damageRollContent.value = true
}


const calculateRollTotal = () => {
  rollTotal.value = rollResult.value + modal.diceThrowInfo.bonus
  totalCalculated.value = true
}

const calculateDamageTotal= () => {
  damageRollTotal.value = damageRollResult.value + modal.diceThrowInfo.bonus
  totalCalculated.value = false
  damageTotalCalculated.value = true
}

watch(rollResult, (newValue: number) => {
  if (newValue < 0) {
    rollResult.value = 0
  } else if (newValue > 20) {
    rollResult.value = 20
  }
  if (newValue > 0) {
    calculateRollTotal()
  }
})

watch(damageRollResult, (newValue: number) => {
  const string = modal.diceThrowInfo.damageDie
  const parts = string.split('d')
  const maxValue = parseInt(parts[1])
  console.log("max" + maxValue)
  console.log("roll" + newValue)
  if (newValue < 0) {
    damageRollResult.value = 0
  } else if (newValue > maxValue) {
    damageRollResult.value = maxValue
    console.log("test" + damageRollResult.value)
  }
  if (newValue > 0) {
    calculateDamageTotal()
  }
})



</script>