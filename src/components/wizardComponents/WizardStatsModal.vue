<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-3xl font-bold font-title text-maroon">Roll Stats</h2>
    <hr class="mb-2 border-2 border-maroon" />

    <div class="m-4">
      <p class="font-bold">Generate values</p>
      <p class="text-sm ml-3">
        You can generate personalized values by clicking the button, or you can choose to use the
        standard values provided.
      </p>
      <div class="flex justify-center my-2">
        <BaseButton type="button" btnContent="Generate values" @click="generateStats()">
          <FaDice class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButton>
      </div>
    </div>

    <div class="m-4">
      <div class="flex justify-center">
        <div class="p-2 border-2 border-maroon rounded-lg flex my-2">
          <p
            v-for="(number, index) in generatedNumbers"
            :key="index"
            class="text-2xl font-bold mx-2"
          >
            {{ number }}
          </p>
        </div>
      </div>
    </div>

    <div class="m-4">
      <p class="font-bold">Assign the values to your stat of choice & confirm.</p>

      <div class="flex justify-center my-2">
        <BaseSelectSmall
          label="Str"
          v-model="v$.str.$model"
          :options="generatedNumbers"
          :fillerValue="wizardStore.charStats.str"
        />
        <BaseSelectSmall
          label="Dex"
          v-model="v$.dex.$model"
          :options="generatedNumbers"
          :fillerValue="wizardStore.charStats.dex"
        />
        <BaseSelectSmall
          label="Con"
          v-model="v$.con.$model"
          :options="generatedNumbers"
          :fillerValue="wizardStore.charStats.con"
        />
        <BaseSelectSmall
          label="Int"
          v-model="v$.int.$model"
          :options="generatedNumbers"
          :fillerValue="wizardStore.charStats.int"
        />
        <BaseSelectSmall
          label="Wis"
          v-model="v$.wis.$model"
          :options="generatedNumbers"
          :fillerValue="wizardStore.charStats.wis"
        />
        <BaseSelectSmall
          label="Cha"
          v-model="v$.cha.$model"
          :options="generatedNumbers"
          :fillerValue="wizardStore.charStats.cha"
        />
      </div>
      <p class="text-xs ml-3">
        For more information on how the stats are rolled or where the standard values come from, see
        the explanation of ability scores on page 9 of the
        <a
          href="https://dnd.wizards.com/what-is-dnd/basic-rules"
          class="text-indigo underline hover:text-maroon font-bold"
          >"Basic Rules for Dungeons & Dragons"</a
        >
        or page 12-13 of the "Player's Handbook".
      </p>
    </div>

    <div class="flex justify-between">
      <BaseButton type="button" btnContent="Back" @click="store.toggleStatModal">
        <FaXmark class="fill-maroon group-hover:fill-lightKhaki w-5 h-5" />
      </BaseButton>
      <BaseButton type="submit" btnContent="Confirm">
        <FaCheck class="fill-maroon group-hover:fill-lightKhaki w-5 h-5" />
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { BaseButton, BaseSelectSmall } from '@/components/baseComponents'
import { FaXmark, FaCheck, FaDice } from 'vue3-icons/fa6'
import { useStatModalStore } from '@/stores/modal-stores'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import { useWizardStore } from '@/stores/wizard-store'

const store = useStatModalStore()
const wizardStore = useWizardStore()
const roll = new DiceRoll('4d6dl1')

const generatedNumbers: number[] = reactive([15, 14, 13, 12, 10, 8])

const generateStats = () => {
  if (generatedNumbers.length > 0) {
    generatedNumbers.splice(0, generatedNumbers.length)
  }
  for (let i = 0; i < 6; i++) {
    roll.roll()
    generatedNumbers.push(roll.total)
  }
}

// Define the form data object
const formData = reactive({
  str: '',
  dex: '',
  con: '',
  int: '',
  wis: '',
  cha: ''
})

// Define the validation rules
const rules = computed(() => {
  return {
    str: { required },
    dex: { required },
    con: { required },
    int: { required },
    wis: { required },
    cha: { required }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    wizardStore.closeModal({
      str: formData.str,
      dex: formData.dex,
      con: formData.con,
      int: formData.int,
      wis: formData.wis,
      cha: formData.cha
    })
  }
}
</script>
