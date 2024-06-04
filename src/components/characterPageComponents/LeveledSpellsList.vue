<template>
  <div
    class="border-2 border-darkKhaki rounded-lg tablet:w-2/5 tabletLg:w-3/12 laptopLg:w-1/6  m-1 shadow-lg"
  >
  <div class="flex flex-col items-center h-full">
    <h2 class="text-lg text-maroon font-bold py-1">{{ title }}</h2>
    <div class="flex flex-col w-full grow ">
      <!-- display current spells -->
      <div v-if="currentSpells.length > 0" class=" min-h-24 my-2">
        <div class="border-y-2 mx-2  border-maroon">
          <div v-for="(spell, index) in currentSpells" :key="index" class="border-b-2 last:border-none mx-2 border-darkKhaki">
            <SpellDisplay 
            @delete-spell="deleteSpell"
            :spell="spell" 
            :index="index" 
            />
          </div>
        </div>
      </div>
      <!-- display if no current spells are available -->
      <div v-else>
        <p class="p-2 pl-4 m-2 border-y-2 border-maroon text-justify min-h-24">{{ character.name }} doesn't know any spells of this level yet.</p>
      </div>

      <!-- searchbar -->
      <div class="m-2 pt-6">
        <ItemSearchbar v-model="searchSpell" :spellSearch="true"/>
      </div>

      <!-- display search results -->
      <div v-if="searched && searchResult.length > 0" class="flex flex-col mb-2">
        <SpellDisplay
        v-for="(item, index) of searchResult"
        @add-item="addNewSpell"
        :key="index"
        :spell="item"
        :index="index"
        :searchResults="true"
        />
      </div>
      <!-- display if no search results are available -->
      <div v-if="searched && searchResult.length === 0">
        <p class="p-2 pl-4 m-2 border-y-2 border-darkKhaki">No spells matching your search</p>
      </div>
    </div>
  </div>
    

  </div>
</template>

<script setup lang="ts">
import type { simplifiedSpell, spell } from '@/interfaces';
import { supabase } from '@/supabase';
import { ref, watch } from 'vue';
import { SpellDisplay, ItemSearchbar } from '@/components/characterPageComponents';

const props = defineProps({
  character: {
    type: Object as () => {id: number, name: string},
    required: true
  },
  spells: {
    type: Array as () => spell[],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  spellLevel: {
    type: Number,
    required: true
  }
})

const searched = ref(false)
const searchSpell = ref('')
const searchResult = ref<simplifiedSpell[]>([])
const currentSpells = ref<simplifiedSpell[]>([])
const differentLevelSpells = ref<simplifiedSpell[]>([])

// fetch for current items based on the value of selector & the characterId
const currentSpellsFromThisLvl = async () => {
  const { data, error } = await supabase
    .from('characters')
    .select('spells')
    .eq('id', props.character.id)
    .single()
  if (error) {
    console.error('Error:', error)
  } else {
  //  console.log(data)
    data.spells.forEach((spell: spell) => {
    if (spell.level === props.spellLevel) {
      currentSpells.value.push(spell)
    } else {
      differentLevelSpells.value.push(spell)
    }
    })
  }
}
currentSpellsFromThisLvl()

// update the spells in the database
const updateSpellDB = async () => {
  const newSpellList = currentSpells.value.concat(differentLevelSpells.value)  
  const { error } = await supabase
    .from('characters')
    .update({ spells: newSpellList})
    .eq('id', props.character.id)
    .single()
  if (error) {
    console.error('Error:', error)
  }
}

// add a new spell to the current spells list and update the database
const addNewSpell = (i: number) => {
  const newSpell = searchResult.value[i]
  currentSpells.value.push(newSpell)
  updateSpellDB()
  searchResult.value = []
  searchSpell.value = ''
  searched.value = false
}

// delete a spell from the current spells list and update the database
const deleteSpell = (i: number) => {
  const updatedSpellList = currentSpells.value.filter((item, index) => index !== i)
  currentSpells.value = updatedSpellList
  updateSpellDB()
}

// searchbar functionality
watch(searchSpell, () => {
  if (searchSpell.value.length >= 2) {
    searched.value = true
    const removeKnownSpells = props.spells.filter((spell) => {
      return !currentSpells.value.some((knownSpell) => knownSpell.name === spell.name)
    })
    const filteredSpells = removeKnownSpells.filter((spell) =>
    spell.name.toLowerCase().includes(searchSpell.value.toLowerCase())
  )
  searchResult.value = filteredSpells.map((spell) => {
    return {
      name: spell.name,
      level: spell.level
    }
  })
  } else {
    searched.value = false
    searchResult.value = []
  }
})

</script>