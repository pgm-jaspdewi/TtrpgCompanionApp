<template>
  <form @submit.prevent="handleSubmit">
    <BaseLabel pl="small" :pb="true">Select equipment</BaseLabel>
    <div class="border-2 border-darkKhaki rounded-lg py-2 px-8 mb-4">
      <p class="pb-2">
        Apart from the standard equipment provided by your class and background, a
        <span class="lowercase font-bold">{{ characterClass.data.name }}</span> also gets to choose
        from the following options:
      </p>
      <hr class="pb-2 border-darkKhaki border-t-2" />

      <!-- div for radiobutton choices -->
      <div v-for="(choice, index) in radioButtonOptions" :key="index" class="flex flex-col pb-4">
        <p class="pb-2">{{ choice.desc }}</p>

        <div class="flex items-center px-5">
          <div v-for="(option, i) in choice.from.options" :key="i" class="w-6/12">
            <!-- display for counted reference -->
            <label v-if="option.option_type === 'counted_reference'" class="flex">
              <input
                type="radio"
                v-model="selectedOption[index]"
                :value="{ amount: option.count, item: option.of.index }"
              />
              <p class="m-2 my-1 text-sm">{{ option.of.name }} ( {{ option.count }} )</p>
            </label>

            <!-- display for multiple -->
            <label v-if="option.option_type === 'multiple'" class="flex">
              <input
                type="radio"
                v-model="selectedOption[index]"
                :value="[
                  { amount: option.items[0].count, item: option.items[0].of.index },
                  { amount: option.items[1].count, item: option.items[1].of.index }
                ]"
              />
              <p class="m-2 my-1 text-sm">
                {{ option.items[0].of.name }} ( {{ option.items[0].count }} ) &
                {{ option.items[1].of.name }} ( {{ option.items[1].count }} )
              </p>
            </label>

            <!-- display for choice -->
            <label v-if="option.option_type === 'choice'" class="flex">
              <input
                type="radio"
                v-model="selectedOption[index]"
                :value="{ amount: 1, item: itemValue[index] }"
              />
              <RequestSelect
                :url="option.choice.from.equipment_category.url"
                v-model="itemValue[index]"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- div for select input choices -->
      <div v-for="(choice, index) in selectInputOptions" :key="index" class="pb-4">
        <p class="m-2 my-1 text-sm">{{ choice.desc }}</p>
        <div class="flex items-center px-5">
          <label class="flex">
            <input
              type="radio"
              v-model="selectedOption[radioButtonOptions.length + index]"
              :value="{ amount: 1, item: itemValue[index] }"
            />

            <RequestSelect :url="choice.from.equipment_category.url" v-model="itemValue[index]" />
          </label>
        </div>
      </div>
    </div>
    <WizardNav />
  </form>
</template>

<script setup lang="ts">
import axios from 'axios'
import WizardNav from './WizardNav.vue'
import { useWizardStore } from '@/stores/wizard-store'
import BaseLabel from './BaseLabel.vue'
import { computed, reactive, ref } from 'vue'
import RequestSelect from './RequestSelect.vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

const store = useWizardStore()

const itemValue = ref([''])

const characterClass = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'classes/' + store.characterInfo.charClass
)
// get the equipment options for the class
const equipmentOptions = characterClass.data.starting_equipment_options
//  loop through the options to get the type of option set. This will be used to determine how to display the options
const radioButtonOptions = ref<any[]>([])
const selectInputOptions = ref<any[]>([])
for (let i = 0; i < equipmentOptions.length; i++) {
  if (equipmentOptions[i].from.option_set_type === 'options_array') {
    radioButtonOptions.value.push(equipmentOptions[i])
  } else {
    selectInputOptions.value.push(equipmentOptions[i])
  }
}

// this array will hold the selected options for each choice between two radio-buttons. It is initialized with an empty string
const selectedOption = ref<string[]>([''])
// loop through the options array and add an empty string for each option
for (let i = 1; i < radioButtonOptions.value.length + selectInputOptions.value.length; i++) {
  selectedOption.value.push('')
}

/** Form functionality */
// Define the form data object
const formData = reactive({
  selectedEquipment: selectedOption
})

// Define the validation rules
const rules = computed(() => {
  return {
    selectedEquipment: {
      $each: { required: helpers.withMessage('Field is required', required) }
    }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    // console.log(formData)
    // filter out any nested arrays
    const filterArray = formData.selectedEquipment
      .map((i) => {
        if (Array.isArray(i)) {
          return i
        } else {
          return null
        }
      })
      .filter((i) => i !== null)
    // flatten the array
    const unNestedArray = filterArray.flat()

    // filter out the objects
    const objects = formData.selectedEquipment
      .map((i) => {
        if (Array.isArray(i)) {
          return null
        } else {
          return i
        }
      })
      .filter((i) => i !== null)

    const allEquipment = unNestedArray.concat(objects)
    store.nextStep({
      selectedEquipment: {
        ...allEquipment
      }
    })
  }
}
</script>
