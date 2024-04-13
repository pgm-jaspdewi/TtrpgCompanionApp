<template>
  <div
    class="bg-paleGold border-2 border-darkKhaki rounded-lg tablet:w-1/2 laptopSm:w-5/12 laptopLg:w-1/4 min-w-mnFrmWidth max-w-mxFrmWidth p-4"
  >
    <AppH1 title="Register" />

    <form @submit.prevent="handleRegister">
      <div class="flex flex-col mb-2">
        <FormLabel for="email" text="Email" />
        <FormInput type="text" name="email" id="email" />
      </div>

      <div class="flex flex-col mb-2">
        <FormLabel for="username" text="Username" />
        <FormInput type="text" name="username" id="username" />
      </div>

      <div class="flex flex-col mb-6">
        <FormLabel for="password" text="Password" />
        <FormInput type="password" name="password" id="password" />
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
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async (event: any) => {
  try {
    const { email, username, password } = event.target.elements
    console.log(username)
    const { data, error } = await authStore.createAccount({
      email: email.value,
      username: username.value,
      password: password.value
    })
    if (error) throw error
    console.log(data?.user?.email)
    router.replace('/')
  } catch (error) {
    console.error(error)
  }
}
</script>
