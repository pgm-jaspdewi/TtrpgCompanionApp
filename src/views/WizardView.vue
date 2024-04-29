<!-- template tag -->
<template>
  <main class="flex items-center">
    <BasePageBorders :relative="true">
      <div class="tablet:w-5/6 laptopSm:w-8/12 laptopLg:w-7/12 min-w-mnFrmWidth max-w-lgFrmWidth">
        <div class="bg-paleGold rounded-lg p-4 border-2 border-darkKhaki">
          <BaseH1 title="New Character" />
          <!-- wizard-form -->
          <WizardMain />
        </div>
      </div>

      <!-- cancel-button -->
      <BaseButton @click="doCancel" btnContent="Cancel" class="absolute top-3 right-3">
        <FaXmark class="fill-maroon group-hover:fill-lightKaki w-4 h-4" />
      </BaseButton>
    </BasePageBorders>
    <BaseModal :modalActive="store.statModal">
      <p>Modal content</p>
    </BaseModal>
  </main>
</template>

<!-- script tag -->
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BasePageBorders from '@/components/BasePageBorders.vue'
import BaseH1 from '@/components/BaseH1.vue'
import WizardMain from '@/components/WizardMain.vue'
import { useRouter } from 'vue-router'
import { FaXmark } from 'vue3-icons/fa6'
import BaseModal from '@/components/BaseModal.vue'
import { useStatModalStore } from '@/stores/modal-stores'

const store = useStatModalStore()

console.log(store.statModal)

const router = useRouter()

const doCancel = () => {
  router.push('/')
}
</script>
