<template>
  <div class="w-full h-fit flex flex-wrap justify-between py-8 px-4 gap-4">
    <BalanceInfo />
    <SpendingInfo />
  </div>
</template>

<script setup lang="ts">
import BalanceInfo from "../InfoComponents/BalanceInfo.vue";
import SpendingInfo from "../InfoComponents/SpendingInfo.vue";
</script>
