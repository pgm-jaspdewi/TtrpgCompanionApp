<template>

  <section 
  :class=" mirror ? 'ml-5' : 'mr-5'"
  class="z-50 relative"
  >

    <button 
    :class="mirror ? 'flex-row-reverse' : 'flex-row'"
    class="flex items-center group" @click="openClose"
    >
      <p 
      :class="mirror ? 'ml-2' : 'mr-2'"
      class="text-xl text-darkKhaki group-hover:text-maroon"
      > {{ menuTitle }}</p>
      <div v-if="!isOpen" class="border-2 p-1 rounded-full border-darkKhaki group-hover:border-maroon">
        <FaChevronDown class="fill-darkKhaki group-hover:fill-maroon w-4 h-4" />
      </div>
      <div v-if="isOpen" class="border-2 p-1 rounded-full border-darkKhaki group-hover:border-maroon">
        <FaChevronUp class="fill-darkKhaki group-hover:fill-maroon w-4 h-4" />
      </div>
    </button>

    <section class="dropdownMenu absolute top-full w-full border-2 border-maroon rounded-xl bg-lightKhaki px-3 py-2 mt-2" v-if="isOpen" >
      <slot/>
    </section>

  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FaChevronDown, FaChevronUp } from 'vue3-icons/fa6'


defineProps({
  menuTitle: {
    type: String,
    required: true
  },
  mirror : {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)

const openClose = () => {
  isOpen.value = !isOpen.value
}

</script>

