<template>

  <section class="z-50 relative mr-5">

    <button class="flex items-center group" @click="openClose">
      <p class="text-xl text-darkKhaki mr-2 group-hover:text-maroon"> {{ menuTitle }}</p>
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
  }
})

const isOpen = ref(false)

const openClose = () => {
  isOpen.value = !isOpen.value
}

</script>

