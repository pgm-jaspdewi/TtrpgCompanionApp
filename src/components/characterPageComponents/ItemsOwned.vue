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
    <h2 class="mt-6 ml-1 text-lg text-maroon font-bold ">Add new item</h2>

   
   <ItemSearchbar
   v-model="searchItem"
   />
    <div v-if="searched && searchResult.length > 0" class="flex  flex-col pt-2 ">
      <ItemDisplay
      v-for="(item, index) of searchResult"
      @add-item="addNewItem"
      :key="index"
      :item="item"
      :index="index"
      :searchResults="true"
    />
    </div>
    <div v-if="searched && searchResult.length === 0">
      <p class="p-2 pl-4 my-2 border-y-2 border-darkKhaki">No items matching your search</p>
    </div>
   

   
  </div>
</template>

<script setup lang="ts">
import type { equipment, savingThrows } from '@/interfaces'
import { ItemDisplay, ItemSearchbar } from '@/components/characterPageComponents'
import { ref, watch } from 'vue'
import { supabase } from '@/supabase'




const props = defineProps({
  characterId: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    validator: (value: string) => ['weapons', 'items'].includes(value),
    required: true
  },
  availableEquipment: {
    type: Array as () => savingThrows[],
    required: true
  },
 
})
//  variable to change the fetch based on the type of items to fetch
const selector = props.type === 'weapons' ? 'weapons' : 'equipment'

const items = ref<equipment[]>([])
const searchResult = ref<equipment[]>([])
const searched = ref(false)
const searchItem = ref('')

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

const addNewItem = (amount: number, i: number) => {
  const newItem = searchResult.value[i]
  newItem.amount = amount
  items.value = [...items.value, newItem]
  updatedItem()
  searchResult.value = []
  searchItem.value = ''
  searched.value = false
}

// searchbar functionality
watch(searchItem, () => {
  if (searchItem.value.length >= 3) {
    searched.value = true
    const filteredEquipment = props.availableEquipment.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchItem.value.toLowerCase())
  )
  searchResult.value = filteredEquipment.map((item) => {
    return {
      amount: 1,
      item: item.name
    }
  })
  } else {
    searched.value = false
    searchResult.value = []
  }
})

</script>
