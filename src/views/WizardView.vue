<!-- template tag -->
<template>
  <main class="flex items-center">
    <BasePageBorders :relative="true">
      <h1 class="text-2xl">This is the wizard-page</h1>

      <!-- cancel-button -->
      <BaseButton @click="doCancel" btnContent="Cancel" class="absolute top-5 right-5">
        <FaXmark class="fill-maroon group-hover:fill-lightKaki w-4 h-4" />
      </BaseButton>
    </BasePageBorders>
  </main>
</template>

<!-- script tag -->
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BasePageBorders from '@/components/BasePageBorders.vue'
import { useRouter } from 'vue-router'
import { FaXmark } from 'vue3-icons/fa6'

const router = useRouter()

const doCancel = () => {
  router.push('/')
}
</script>
