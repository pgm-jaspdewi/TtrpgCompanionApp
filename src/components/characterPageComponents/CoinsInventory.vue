<template>
  <div v-if="coins.length > 0" class="flex justify-center ml-2">
    <CoinInput
      v-for="(coin, index) of coins"
      @update-coin="updateCoin"
      :key="index"
      :character-id="characterId"
      :coinType="coin.type"
      :coinAmount="coin.amount"
      :index="index"
    />
  </div>
  <div v-else>
    <p class="text-lg font-semibold my-4">Coins are being counted...</p>
  </div>
</template>

<script setup lang="ts">
import type { characterWealth } from '@/interfaces'
import { CoinInput } from '@/components/characterPageComponents'
import { ref } from 'vue'
import { supabase } from '@/supabase'

const props = defineProps({
  characterId: {
    type: Number,
    required: true
  }
})

const coins = ref<characterWealth[]>([])

const currentCoins = async () => {
  const { data, error } = await supabase
    .from('characters')
    .select('wealth')
    .eq('id', props.characterId)
    .single()
  if (error) {
    console.error('Error:', error)
  } else {
    coins.value = data.wealth
  }
}
currentCoins()

const updatedCoin = async () => {
  const { error } = await supabase
    .from('characters')
    .update({ wealth: coins.value })
    .eq('id', props.characterId)
    .single()
  if (error) {
    console.error('Error:', error)
  }
}

const updateCoin = (newAmount: number, i: number) => {
  const updatedCoins = coins.value.map((coin, index) => {
    if (index === i) {
      coin.amount = newAmount
    }
    return coin
  })
  coins.value = updatedCoins
  updatedCoin()
}
</script>
