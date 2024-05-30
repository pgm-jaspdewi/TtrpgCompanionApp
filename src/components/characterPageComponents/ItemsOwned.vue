<template>
  <div class="w-11/12 p-2 pb-4">
    <div class="flex">
      <h3
        v-if="type === 'weapons'"
        class="capitalize font-bold text-maroon w-5/6 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        weapon
      </h3>
      <h3
        v-if="type === 'items'"
        class="capitalize font-bold text-maroon w-5/6 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        Item
      </h3>

      <h3 class="capitalize font-bold text-maroon w-1/6 mt-2 border-darkKhaki border-b-2 p-2">
        quantity
      </h3>
    </div>
    <ItemDisplay
      v-for="(item, index) of items"
      @update-item="updateItem"
      :key="index"
      :item="item"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import type { equipment } from '@/interfaces'
import { ItemDisplay } from '@/components/characterPageComponents'
import { ref } from 'vue'
import { supabase } from '@/supabase'

const props = defineProps({
  // items: {
  //   type: Array as () => equipment[],
  //   required: true
  // },
  characterId: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    validator: (value: string) => ['weapons', 'items'].includes(value),
    required: true
  }
})
//  variable to change the fetch based on the type of items to fetch
const selector = props.type === 'weapons' ? 'weapons' : 'equipment'

const items = ref<equipment[]>([])

// fetch for current items based on the value of selector & the characterId
const currentItems = async () => {
  const { data, error } = await supabase
    .from('characters')
    .select(selector)
    .eq('id', props.characterId)
    .single()
  if (error) {
    console.error('Error getting current hit points:', error)
  } else {
    if ((data as { weapons: any }).weapons) {
      items.value = (data as { weapons: equipment[] }).weapons
    } else {
      items.value = (data as { equipment: equipment[] }).equipment
    }
  }
}
currentItems()

const updatedItem = async () => {
  if (selector === 'weapons') {
    const { error } = await supabase
      .from('characters')
      .update({ weapons: items.value })
      .eq('id', props.characterId)
      .single()
    if (error) {
      console.error('Error getting current hit points:', error)
    }
  } else {
    const { error } = await supabase
      .from('characters')
      .update({ equipment: items.value })
      .eq('id', props.characterId)
      .single()
    if (error) {
      console.error('Error getting current hit points:', error)
    }
  }
}

const updateItem = (newAmount: number, i: number) => {
  const updatedItems = items.value.map((item, index) => {
    if (index === i) {
      item.amount = newAmount
    }
    return item
  })
  items.value = updatedItems
  console.log(items.value)
  updatedItem()
}
</script>
