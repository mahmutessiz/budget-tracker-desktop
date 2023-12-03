<template>
  <div class="w-full flex">
    <MainHeader />
    <div>
      <BalanceDisplay />
      <BarChart class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BalanceDisplay from "./containers/BalanceDisplay.vue";
import MainHeader from "./MainHeader.vue";
import BarChart from "./charts/BarChart.vue";
</script>
