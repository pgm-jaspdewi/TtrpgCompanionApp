<template>
  <div
    class="bg-paleGold border-2 border-darkKhaki rounded-lg tablet:w-1/2 laptopSm:w-5/12 laptopLg:w-1/4 min-w-mnFrmWidth max-w-mxFrmWidth p-4"
  >
    <AppH1 title="Login" />

    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col mb-2">
        <FormLabel for="user-name" text="Username" />
        <FormInput type="text" name="userName" id="user_name" />
      </div>

      <div class="flex flex-col mb-6">
        <FormLabel for="password" text="Password" />
        <FormInput type="password" name="password" id="password" />
      </div>

      <div class="flex justify-center mb-6">
        <AppButton type="submit" btnContent="Login">
          <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
        </AppButton>
      </div>
    </form>

    <div class="flex justify-center">
      <p class="text-sm mr-1">No account yet?</p>
      <RouterLink to="/register" class="text-sm text-indigo hover:font-bold hover:underline"
        >Register now</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { FaAngleRight } from 'vue3-icons/fa'
import AppH1 from './AppH1.vue'
import FormInput from './formComponents/FormInput.vue'
import FormLabel from './formComponents/FormLabel.vue'

const handleSubmit = () => {
  console.log('Form submitted')
}
</script>
