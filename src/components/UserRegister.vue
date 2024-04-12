<template>
  <div
    class="bg-paleGold border-2 border-darkKhaki rounded-lg tablet:w-1/2 laptopSm:w-5/12 laptopLg:w-1/4 min-w-mnFrmWidth max-w-mxFrmWidth p-4"
  >
    <AppH1 title="Register" />

    <form @submit.prevent="handleRegister">
      <div class="flex flex-col mb-2">
        <FormLabel for="email" text="Email" />
        <FormInput type="text" name="email" id="email" :value="credentials?.email" />
      </div>

      <div class="flex flex-col mb-2">
        <FormLabel for="user_name" text="Username" />
        <FormInput type="text" name="userName" id="user_name" :value="credentials?.username" />
      </div>

      <div class="flex flex-col mb-6">
        <FormLabel for="password" text="Password" />
        <FormInput type="password" name="password" id="password" :value="credentials?.password" />
      </div>

      <div class="flex justify-center mb-6">
        <AppButton type="submit" btnContent="Register">
          <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
        </AppButton>
      </div>
    </form>

    <div class="flex justify-center">
      <p class="text-sm mr-1">Already an account?</p>
      <RouterLink to="/login" class="text-sm text-indigo hover:font-bold hover:underline">
        Login
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { FaAngleRight } from 'vue3-icons/fa'
import AppH1 from './AppH1.vue'
import FormInput from './formComponents/FormInput.vue'
import FormLabel from './formComponents/FormLabel.vue'
import { useAuthStore } from '@/stores/auth-store'
import { ref } from 'vue'

const authStore = useAuthStore()
const credentials = ref({
  email: '',
  username: '',
  password: ''
})

const handleRegister = async (event: any) => {
  try {
    console.log('Attempting to login...')
    const { username, password } = event.target.elements
    await authStore.login({ username, password })
  } catch (error) {
    console.error(error)
  }
}
</script>
