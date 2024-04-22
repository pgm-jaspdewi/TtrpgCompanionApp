<template>
  <form class="flex my-10">
    <div class="w-5/12"></div>
    <div class="w-7/12 pr-10">
      <div class="mb-2">
        <BaseInput v-model="v$.charName.$model" label="Character Name" id="charName" />
        <span class="text-redishBrown pl-2" v-for="error in v$.charName.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>
      <div class="mb-6">
        <BaseInput
          v-model="formData.password"
          label="This needs to be a select"
          type="select"
          id="password"
        />
        <span class="text-redishBrown pl-2" v-for="error in v$.password.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </form>

  <WizardNav navType="first" />
</template>

<script setup lang="ts">
import WizardNav from './WizardNav.vue'
import BaseInput from './BaseInput.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { computed, reactive } from 'vue'

// Define the form data object
const formData = reactive({
  charName: '',
  password: ''
})

// Define the validation rules
const rules = computed(() => {
  return {
    charName: { required: helpers.withMessage('An adventurer needs a name.', required) },
    password: { required }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)
</script>
