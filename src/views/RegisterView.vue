<!-- template tag -->
<template>
  <main class="flex items-center">
    <BasePageBorders>
      <UserRegister />
    </BasePageBorders>
  </main>
</template>

<!-- Script tag -->
<script setup lang="ts">
import { BasePageBorders } from '@/components/baseComponents'
import UserRegister from '@/components/UserRegister.vue'
</script>
