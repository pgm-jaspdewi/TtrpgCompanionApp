<template>
  <div class="flex h-2/3 px-2 items-center">
    <p class="text-lg w-5/6 mr-2">Proficiency Bonus</p>
    <div class="border-2 border-darkKhaki bg-lightKhaki rounded-lg h-full flex items-center">
      <p class="text-xl pl-2">+</p>
      <p class="text-xl pr-2">{{ proficiencyBonus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  proficiencyBonus: {
    type: Number,
    required: true
  }
})
</script>
