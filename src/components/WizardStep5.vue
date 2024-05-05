<template>
  <div class="m-4">
    <BaseLabel pl="small" :pb="true">Select equipment</BaseLabel>
    <div class="border-2 border-darkKhaki rounded-lg p-2">
      <p class="text-sm">
        Apart from the standard equipment provided by your class and background, a
        <span class="lowercase font-bold">{{ characterClass.data.name }}</span> also gets to choose
        from the following options:
      </p>
      <p>{{ selectedOption }}</p>
      <div
        v-for="(choice, index) in radioButtonOptions"
        :key="index"
        class="p-2 border-2 flex flex-col"
      >
        <p>{{ choice.desc }}</p>

        <div v-for="(option, i) in choice.from.options" :key="i">
          <!-- display for counted reference -->
          <label v-if="option.option_type === 'counted_reference'" class="flex">
            <input
              type="radio"
              v-model="selectedOption[index]"
              :value="{ amount: option.count, item: option.of.name }"
            />
            <p class="m-2 my-1">{{ option.of.name }} ( {{ option.count }} )</p>
          </label>

          <!-- display for multiple -->
          <label v-if="option.option_type === 'multiple'" class="flex">
            <input
              type="radio"
              v-model="selectedOption[index]"
              :value="[
                { amount: option.items[0].count, item: option.items[0].of.name },
                { amount: option.items[1].count, item: option.items[1].of.name }
              ]"
            />
            <p class="m-2 my-1">
              {{ option.items[0].of.name }} ( {{ option.items[0].count }} ) &
              {{ option.items[1].of.name }} ( {{ option.items[1].count }} )
            </p>
          </label>

          <!-- display for choice -->
          <label v-if="option.option_type === 'choice'" class="flex">
            <p>{{ index }}</p>
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
  </div>
  <WizardNav />
</template>

<script setup lang="ts">
import axios from 'axios'
import WizardNav from './WizardNav.vue'
import { useWizardStore } from '@/stores/wizard-store'
import BaseLabel from './BaseLabel.vue'
import { ref } from 'vue'
import RequestSelect from './RequestSelect.vue'

const store = useWizardStore()

const itemValue = ref([''])
console.log(itemValue.value)

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

const selectedOption = ref<string[]>([''])
for (let i = 1; i < radioButtonOptions.value.length; i++) {
  selectedOption.value.push('')
}

console.log(selectedOption.value)
</script>
