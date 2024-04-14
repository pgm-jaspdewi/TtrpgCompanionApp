<script setup lang="ts">
import type { character as CharacterType } from '@/interfaces'

defineProps<{
  character: CharacterType
}>()
</script>

<template>
  <div
    class="bg-paleGold border-1 border-darkKhaki rounded-lg w-characterCard h-characterCard flex p-characterCard my-2"
  >
    <div
      class="border-1 border-darkKhaki w-image h-image overflow-hidden bg-lightKaki rounded-lg mr-4"
    >
      <img :src="character.image" alt="" />
    </div>

    <div>
      <p>{{ character.name }}</p>
      <p>{{ character.race }}</p>
      <div class="flex">
        <p>Lvl {{ character.level }}</p>
        <p>{{ character.class }}</p>
      </div>
    </div>
    <div></div>
  </div>
</template>
