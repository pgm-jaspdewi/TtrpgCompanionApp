<template>
  <div
    class="bg-paleGold border-2 border-darkKhaki rounded-lg tablet:w-1/2 laptopSm:w-5/12 laptopLg:w-1/4 min-w-mnFrmWidth max-w-mdFrmWidth p-4 shadow-lg"
  >
    <BaseH1 title="Register" />

    <form @submit.prevent="handleRegister">
      <div class="mb-2">
        <BaseInput v-model="v$.email.$model" label="Email" id="email" />
        <span class="text-redishBrown pl-2" v-for="error in v$.email.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>

      <div class="mb-2">
        <BaseInput v-model="v$.username.$model" label="Username" id="username" />
        <span class="text-redishBrown pl-2" v-for="error in v$.username.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>

      <div class="mb-2">
        <BaseInput v-model="v$.password.$model" label="Password" type="password" id="password" />
        <span class="text-redishBrown pl-2" v-for="error in v$.password.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>

      <div class="mb-6">
        <BaseInput
          v-model="v$.confirmPassword.$model"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
        />
        <span
          class="text-redishBrown pl-2"
          v-for="error in v$.confirmPassword.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>
      </div>

      <div class="flex justify-center mb-6">
        <BaseButton type="submit" btnContent="Register">
          <FaAngleRight class="fill-maroon group-hover:fill-lightKhaki w-5 h-5" />
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
import { BaseButton, BaseH1, BaseInput } from '@/components/baseComponents'
import { FaAngleRight } from 'vue3-icons/fa'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'

const authStore = useAuthStore()
const router = useRouter()

// Define the form data object
const formData = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})
// Define the validation rules
const rules = computed(() => {
  return {
    email: { required, email },
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20)
    },
    password: { required, minLength: minLength(8) },
    confirmPassword: {
      required,
      sameAs: helpers.withMessage('Passwords do not match', sameAs(formData.password))
    }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleRegister = async () => {
  const result = await v$.value.$validate()

  if (result) {
    try {
      const { error } = await authStore.createAccount({
        email: formData.email,
        username: formData.username,
        password: formData.password
      })
      if (error) throw error
      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Validation failed')
  }
}
</script>
