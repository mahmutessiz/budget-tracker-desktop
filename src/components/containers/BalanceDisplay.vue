<template>
  <div class="w-full h-fit flex flex-wrap justify-between py-8 gap-4">
    <BalanceInfo :incomeData="incomeData" :expenseData="expenseData" />
    <SpendingInfo />
  </div>
</template>

<script setup lang="ts">
import BalanceInfo from "../InfoComponents/BalanceInfo.vue";
import SpendingInfo from "../InfoComponents/SpendingInfo.vue";

const dataFromProps = defineProps({
  expenseData: Object,
  incomeData: Object,
});
console.log(dataFromProps.expenseData, dataFromProps.incomeData);
</script>
