<!-- Wizard to create new character -->
<template>
  <!-- Code for the breadcrumbs at the top of the form-->
  <div class="flex justify-center items-end relative">
    <div class="h-line bg-maroon w-[225px] tablet:w-[400px] absolute bottom-2"></div>
    <WizardBreadcrumb text="Basics" :nr="1" :step="store.step" />
    <WizardBreadcrumb text="Stats" :nr="2" :step="store.step" />
    <WizardBreadcrumb text="Proficiencies" :nr="3" :step="store.step" />
    <WizardBreadcrumb text="Spells" :nr="4" :step="store.step" />
    <WizardBreadcrumb text="Equipment" :nr="5" :step="store.step" />
    <WizardBreadcrumb text="Overview" :nr="6" :step="store.step" />
  </div>
  <Suspense>
    <template #default>
      <div>
        <WizardStep1 v-if="store.step === 1" />
        <WizardStep2 v-if="store.step === 2" />
        <WizardStep3 v-if="store.step === 3" />
        <WizardStep4 v-if="store.step === 4" />
        <WizardStep5 v-if="store.step === 5" />
        <WizardSummary v-if="store.step === 6" />
      </div>
    </template>
    <template #fallback>
      <div class="flex justify-center items-center h-[400px]">
        <p>Loading...</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import WizardBreadcrumb from './WizardBreadcrumb.vue'
import WizardStep1 from './WizardStep1.vue'
import WizardStep2 from './WizardStep2.vue'
import WizardStep3 from './WizardStep3.vue'
import WizardStep4 from './WizardStep4.vue'
import WizardStep5 from './WizardStep5.vue'
import WizardSummary from './WizardSummary.vue'
import { useWizardStore } from '@/stores/wizard-store'

const store = useWizardStore()
</script>
