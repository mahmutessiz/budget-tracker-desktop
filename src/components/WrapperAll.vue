<template>
  <div class="w-full flex flex-wrap overflow-auto">
    <MainHeader class="fixed z-10 w-32" />
    <div class="w-full md:w-[80%] lg:w-[70%] overflow-x-hidden ml-36">
      <BalanceDisplay />
      <BarChart class="" />
      <div class="flex flex-wrap md:flex-nowrap gap-4 md:gap-1 mt-12">
        <DoughnutChart class="md:w-[50%]" />
        <LineChart class="md:w-[50%]" />
      </div>
    </div>
    <div
      class="w-full lg:w-auto flex lg:flex-col justify-center items-center gap-12 mt-12 mb-12 ml-36 lg:ml-2"
    >
      <TableIncome class="" />
      <TableExpense class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BalanceDisplay from "./containers/BalanceDisplay.vue";
import MainHeader from "./MainHeader.vue";
import BarChart from "./charts/BarChart.vue";
import DoughnutChart from "./charts/DoughnutChart.vue";
import LineChart from "./charts/LineChart.vue";
import TableIncome from "./tables/TableIncome.vue";
import TableExpense from "./tables/TableExpense.vue";
</script>
