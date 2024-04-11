<template>
  <h1>Login</h1>
  <div>
    <form>
      <AppButton type="submit" btnContent="Login">
        <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-7 h-7" />
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { FaAngleRight } from 'vue3-icons/fa'
</script>
