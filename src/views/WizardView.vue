<!-- template tag -->
<template>
  <main class="flex items-center">
    <BasePageBorders :relative="true">
      <div class="tablet:w-5/6 laptopSm:w-8/12 laptopLg:w-7/12 min-w-mnFrmWidth max-w-lgFrmWidth">
        <div class="bg-paleGold rounded-lg p-4 border-2 border-darkKhaki shadow-lg min-h-form">
          <BaseH1 title="New Character" />
          <!-- wizard-form -->
          <WizardMain />
        </div>
      </div>

      <button
        @click="doCancel"
        class="absolute top-3 right-3 rounded-full w-8 h-8 flex justify-center items-center border-2 border-maroon hover:bg-maroon group"
      >
        <FaXmark class="fill-maroon group-hover:fill-lightKhaki w-6 h-6" />
      </button>
    </BasePageBorders>
    <BaseModal :modalActive="modal.statModal">
      <WizardStatsModal />
    </BaseModal>
  </main>
</template>

<!-- script tag -->
<script setup lang="ts">
import { BasePageBorders, BaseH1, BaseModal } from '@/components/baseComponents'
import { WizardMain, WizardStatsModal } from '@/components/wizardComponents'
import { useRouter } from 'vue-router'
import { FaXmark } from 'vue3-icons/fa6'
import { useModalStore } from '@/stores/modal-store'
import { useWizardStore } from '@/stores/wizard-store'
import { supabase } from '@/supabase'

const store = useWizardStore()
const modal = useModalStore()

const router = useRouter()

const doCancel = async () => {
  if (store.characterInfo.charAvatar !== '') {
    console.log('deleting avatar')
    try {
      const { error } = await supabase.storage.from('avatars').remove([store.characterInfo.charAvatar])
      if (error) throw error
    } catch (error) {
      console.error('Error removing image: ', (error as Error).message)
    }
  }
  store.resetStore()
  router.push('/')
}
</script>
