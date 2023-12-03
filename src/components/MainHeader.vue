<template>
  <header
    class="w-full py-2 px-4 flex justify-center items-center bg-base-300 h-fit"
  >
    <ul class="flex justify-end items-center gap-4 px-4">
      <li class=""><ThemeSwitch /></li>
      <li class="btn">Add new</li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitch from "./ThemeSwitch.vue";
</script>
