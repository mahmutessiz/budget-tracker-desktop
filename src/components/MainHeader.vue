<template>
  <header
    class="w-fit h-[100vh] py-2 px-2 flex flex-col justify-start items-start bg-base-300"
  >
    <LanguageOpt class="self-center pt-8" />
    <ul class="h-full flex flex-col justify-start items-center gap-4 px-2 py-6">
      <li><ThemeSwitch /></li>
      <li><AddNew /></li>
      <li><SettingsButton /></li>
      <li><ReloadPage /></li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import AddNew from "./buttons/AddNew.vue";
import ReloadPage from "./buttons/ReloadPage.vue";
import SettingsButton from "./buttons/SettingsButton.vue";
import ThemeSwitch from "./buttons/ThemeSwitch.vue";
import LanguageOpt from "./buttons/LanguageOpt.vue";
</script>
