<template>
  <div
    class="bg-paleGold border-2 border-darkKhaki rounded-lg tablet:w-1/2 laptopSm:w-5/12 laptopLg:w-1/4 min-w-mnFrmWidth max-w-mdFrmWidth p-4"
  >
    <BaseH1 title="Login" />

    <form @submit.prevent="handleLogin">
      <div class="mb-2">
        <BaseInput v-model="v$.email.$model" label="Email" id="email" />
        <span class="text-redishBrown pl-2" v-for="error in v$.email.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>

      <div class="mb-6">
        <BaseInput v-model="v$.password.$model" label="Password" type="password" id="password" />
        <span class="text-redishBrown pl-2" v-for="error in v$.password.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
        <p v-if="WrongCredentials" class="text-redishBrown pl-2 pt-3">
          Incorrect Email and/or password
        </p>
      </div>

      <div class="flex justify-center mb-6">
        <BaseButton type="submit" btnContent="Login">
          <FaAngleRight class="fill-maroon group-hover:fill-lightKhaki w-5 h-5" />
        </BaseButton>
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
import BaseButton from '@/components/BaseButton.vue'
import { FaAngleRight } from 'vue3-icons/fa'
import BaseH1 from './BaseH1.vue'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
import { reactive, computed, ref } from 'vue'
import BaseInput from './BaseInput.vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const authStore = useAuthStore()
const router = useRouter()

const WrongCredentials = ref(false)

// Define the form data object
const formData = reactive({
  email: '',
  password: ''
})

// Define the validation rules
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleLogin = async () => {
  const result = await v$.value.$validate()
  if (result) {
    try {
      const { error } = await authStore.login({
        email: formData.email,
        password: formData.password
      })
      if (error) throw error
      router.replace('/')
    } catch (error) {
      WrongCredentials.value = true
    }
  } else {
    alert('error, form not submitted')
  }
}
</script>
