<template>
  <div class="w-full flex">
    <MainHeader />
    <div class="w-full lg:w-[50%]">
      <BalanceDisplay />
      <BarChart class="" />
      <DoughnutChart class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BalanceDisplay from "./containers/BalanceDisplay.vue";
import MainHeader from "./MainHeader.vue";
import BarChart from "./charts/BarChart.vue";
import DoughnutChart from "./charts/DoughnutChart.vue";
</script>
