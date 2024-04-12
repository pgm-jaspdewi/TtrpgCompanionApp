<!-- Script tag goes here -->
<script setup lang="ts">
import UserRegister from '@/components/UserRegister.vue'
</script>

<template>
  <main class="flex items-center">
    <div
      class="border-2 border-silverChalice w-outerContainer h-outerContainer my-outerContainer m-auto rounded-lg"
    >
      <div
        class="border-2 border-silverChalice w-innerContainer h-innerContainer m-innerContainer rounded-lg p-4 flex justify-center items-center"
      >
        <UserRegister />
      </div>
    </div>
  </main>
</template>
