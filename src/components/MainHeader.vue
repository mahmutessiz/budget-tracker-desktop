<template>
  <header
    class="w-fit h-[100vh] py-2 px-2 flex flex-col justify-start items-start bg-base-300"
  >
    <ul class="h-full flex flex-col justify-start items-center gap-4 px-2 py-6">
      <li class=""><ThemeSwitch /></li>
      <li><AddNew /></li>
      <li><ClearAll /></li>
      <li><SettingsButton /></li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitch from "./buttons/ThemeSwitch.vue";
import AddNew from "./buttons/AddNew.vue";
import SettingsButton from "./buttons/SettingsButton.vue";
import ClearAll from "./buttons/ClearAll.vue";
</script>
