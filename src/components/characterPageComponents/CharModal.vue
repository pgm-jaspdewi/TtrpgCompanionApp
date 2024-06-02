<template>
  <div class="relative w-96 h-56 flex flex-col ">
    <div>
      <BaseH1 :title="`${rollName} ${modal.diceThrowInfo.type}`" :smaller-title="true"/>
    </div>
    
    <div class="grow flex justify-center ">
      <!-- first visible when opening modal-->
      <div v-if="!loading && !totalCalculated && !damageRollContent">
        <div class="flex flex-col justify-center mb-2">
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

      <!-- calculating screen -->
      <div v-if="loading" class="flex flex-col justify-center">
        <h3 class="text-center text-2xl font-semibold mb-16">{{ damageRollContent? "Calculating damage...": "Calculating total..." }}</h3>
      </div>
    
      <!-- results of non-attack roll -->
      <div v-if="!loading && totalCalculated && modal.diceThrowInfo.type != 'attack'  && !damageRollContent || !loading && damageRollContent && damageTotalCalculated">
        <div class="flex flex-col items-center">
          <p class="mb-2">{{ damageRollContent? "The total damage you deal is:": "The total result of your roll is:" }}</p>
          <div class="border-2 border-darkKhaki rounded-lg bg-lightKhaki w-14 h-14 flex justify-center items-center mb-4 shadow-lg">
            <p class="text-center text-2xl font-semibold">{{ damageTotalCalculated ? damageRollTotal : rollTotal }}</p>
          </div>
        </div>
        <div class="flex justify-center">
          <BaseButton @click="closeModal" btnContent="Close" :secondary="true" :mirror="false">
            <FaXmark class="fill-paleGold w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    
      <!-- results of attack roll -->
      <div v-if="!loading && totalCalculated && modal.diceThrowInfo.type === 'attack'  && !damageRollContent">
        <div class="flex flex-col items-center">
          <p class="mb-2">The total result of your roll is:</p>
          <div class="border-2 border-darkKhaki rounded-lg bg-lightKhaki w-14 h-14 flex justify-center items-center mb-4 shadow-lg">
            <p class="text-center text-2xl font-semibold">{{ rollTotal }}</p>
          </div>
        </div>
        <div class="flex">
          <BaseButton @click="closeModal" btnContent="Didn't hit" :secondary="true" :mirror="true" class="mr-2">
            <FaXmark class="fill-paleGold w-4 h-4" />
          </BaseButton>
          <BaseButton @click="handleDamageRoll" btnContent="Hit! Roll Damage" :secondary="false" :mirror="false" class="ml-2">
            <FaDiceD20 class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
          </BaseButton>
        </div>
      </div>

      <!-- screen to deal with damage roll -->
      <div v-if="!loading && damageRollContent && !damageTotalCalculated">
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
const loading = ref(false)
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


const delayedFunction = () => {
  setTimeout(() => {
  loading.value = true
  rollTotal.value = rollResult.value + modal.diceThrowInfo.bonus
  totalCalculated.value = true
  setTimeout(() => {
  loading.value = false
}, 1000)
}, 500)
}

const delayedDamageFunction = () => {
  setTimeout(() => {
  loading.value = true
  damageRollTotal.value = damageRollResult.value + modal.diceThrowInfo.bonus
  console.log(damageRollTotal.value)
  damageTotalCalculated.value = true
  setTimeout(() => {
  loading.value = false
}, 1000)
}, 500)
}

watch(rollResult, (newValue: number) => {
  if (newValue < 0) {
    rollResult.value = 0
  } else if (newValue > 20) {
    rollResult.value = 20
  }
  if (newValue > 0) {
    delayedFunction()
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
    delayedDamageFunction()
  }
})



</script>