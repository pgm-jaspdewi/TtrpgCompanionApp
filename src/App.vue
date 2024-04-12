<!-- 
  Template tag 
  Place to write the HTML structure of the component
-->
<template>
  <RouterView />
</template>

<!-- 
  Script tag 
  Place to import components, define props, and other logic
-->
<script setup lang="ts">
// Vue-router for navigation
// Routerlink creates a link to navigate to different routes
// RouterView is a component that renders the matched component for the given path
import { RouterLink, RouterView } from 'vue-router'
</script>

<!-- 
  Style tag 
  Place to write the CSS styles of the component
-->
<style scoped></style>
