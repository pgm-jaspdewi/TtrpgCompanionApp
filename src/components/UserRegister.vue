<template>
  <div
    class="bg-paleGold border-2 border-darkKhaki rounded-lg tablet:w-1/2 laptopSm:w-5/12 laptopLg:w-1/4 min-w-mnFrmWidth max-w-mxFrmWidth p-4"
  >
    <BaseH1 title="Register" />

    <form @submit.prevent="handleRegister">
      <BaseInput v-model="email" label="Email" class="mb-2" id="email" />

      <BaseInput v-model="username" label="Username" class="mb-2" id="username" />

      <BaseInput v-model="password" label="Password" type="password" class="mb-6" id="password" />

      <div class="flex justify-center mb-6">
        <BaseButton type="submit" btnContent="Register">
          <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
        </BaseButton>
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
import BaseButton from '@/components/BaseButton.vue'
import { FaAngleRight } from 'vue3-icons/fa'
import BaseH1 from './BaseH1.vue'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const username = ref('')
const password = ref('')

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
