<template>
  <div class="w-11/12 p-2 pb-4">
    <div class="flex">
      <h3
        v-if="type === 'weapons'"
        class="capitalize font-bold text-maroon w-9/12 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        weapon
      </h3>
      <h3
        v-if="type === 'items'"
        class="capitalize font-bold text-maroon w-9/12 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        Item
      </h3>

      <h3
        class="capitalize font-bold text-maroon w-2/12 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        quantity
      </h3>
      <h3 class="capitalize font-bold text-maroon w-1/12 mt-2 border-darkKhaki border-b-2 p-2">
        delete
      </h3>
    </div>
    <ItemDisplay
      v-for="(item, index) of items"
      @update-item="updateItem"
      @delete-item="deleteItem"
      :key="index"
      :item="item"
      :index="index"
    />
    <h2 class="mt-6 text-lg text-maroon font-bold w-10/12 mx-auto">Add new item</h2>

    <p>searchbar voor extra items</p>
  </div>
</template>

<script setup lang="ts">
import type { equipment } from '@/interfaces'
import { ItemDisplay } from '@/components/characterPageComponents'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { FaPlus } from 'vue3-icons/fa6'


const props = defineProps({
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
  updatedItem()
}

const deleteItem = (i: number) => {
  const updatedItems = items.value.filter((item, index) => index !== i)
  items.value = updatedItems
  updatedItem()
}

const handleSubmit = () => {
  console.log('submit')
  // items.value.push({ item: '', amount: 0 })
}
</script>
