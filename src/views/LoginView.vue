<!-- Template tag -->
<template>
  <main class="flex items-center">
    <BasePageBorders>
      <UserLogin />
    </BasePageBorders>
  </main>
</template>

<!-- Script tag -->
<script setup lang="ts">
import { BasePageBorders } from '@/components/baseComponents'
import UserLogin from '@/components/UserLogin.vue'
</script>
