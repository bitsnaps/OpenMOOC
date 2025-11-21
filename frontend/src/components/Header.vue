<script setup>
import { ref } from 'vue'

defineProps({
  links: Array
})

</script>

<template>
  <nav>
    <ul>
      <li v-for="link in links">
        <a :href="link.url">{{ link.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
