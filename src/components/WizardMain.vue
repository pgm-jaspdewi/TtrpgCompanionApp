<!-- Wizard to create new character -->
<template>
  <WizardStep1 v-if="store.step === 1" />
  <WizardStep2 v-if="store.step === 2" />
  <WizardStep3 v-if="store.step === 3" />
  <WizardStep4 v-if="store.step === 4" />
  <WizardStep5 v-if="store.step === 5" />
  <WizardSummary v-if="store.step === 6" />
</template>

<script setup lang="ts">
import WizardStep1 from './WizardStep1.vue'
import WizardStep2 from './WizardStep2.vue'
import WizardStep3 from './WizardStep3.vue'
import WizardStep4 from './WizardStep4.vue'
import WizardStep5 from './WizardStep5.vue'
import WizardSummary from './WizardSummary.vue'
import { useWizardStore } from '@/stores/wizard-store'

const store = useWizardStore()
</script>
