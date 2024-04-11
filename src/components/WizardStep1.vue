<template>
  <h2>Step 1</h2>
  <div>
    <button @click="($event) => store.nextStep()">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/store'

const store = useWizardStore()
</script>
