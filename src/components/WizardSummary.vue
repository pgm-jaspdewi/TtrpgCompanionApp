<template>
  <h2>Summary</h2>
  <div>
    <button @click="($event) => store.prevStep()">Back</button>
    <button>Finish</button>
  </div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/store'

const store = useWizardStore()
</script>
