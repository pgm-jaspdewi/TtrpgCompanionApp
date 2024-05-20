<template>
  <div v-if="character === null">
    <div>loading character data...</div>
  </div>
  <div v-if="character != null" class="static">
    <div class="absolute top-24 bg-paleGold w-full min-h-statsPage h-fit">
      <CharacterPageBorders> </CharacterPageBorders>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase'
import { CharacterPageBorders } from '@/components/characterPageComponents'

const route = useRoute()

// Get the character id from the route params
const characterId = route.params.id

// Fetch the character data from the API
const character = ref<characterDetails | null>(null)
const getCharacterData = async () => {
  // we need to get the user id first because of the row level security in the database.
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
  } else {
    const id = data.user.id
    // get the character from the database
    const { data: charactersData, error: charactersError } = await supabase
      .from('characters')
      .select('*')
      .eq('userId', id)
      .eq('id', characterId)
      .single()
    if (charactersError) {
      console.error('Error getting characters:', charactersError.message)
    } else {
      character.value = charactersData
      console.log(character.value)
    }
  }
}
getCharacterData()
</script>
