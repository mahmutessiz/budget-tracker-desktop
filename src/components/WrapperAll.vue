<template>
  <div
    class="w-full flex flex-wrap lg:flex-nowrap overflow-x-hidden"
    v-if="!isLoading"
  >
    <MainHeader class="fixed z-10 w-32" />
    <div class="w-full flex flex-wrap lg:flex-nowrap justify-center ml-32">
      <div class="w-full lg:w-[70%] overflow-x-hidden px-4">
        <BalanceDisplay />
        <BarChart :incomeData="incomeData" />
        <div class="flex flex-wrap lg:flex-nowrap gap-4 md:gap-8 mt-12">
          <DoughnutChart :expenseData="expenseData" class="lg:w-[50%]" />
          <LineChart :expenseData="expenseData" class="lg:w-[50%]" />
        </div>
      </div>
      <div
        class="w-full lg:w-[18%] flex lg:flex-col justify-center items-start gap-12 mt-12 mb-12 lg:ml-8"
      >
        <!-- Only render the TableIncome component when the data is loaded -->
        <TableIncome :incomeData="incomeData" />
        <TableExpense :expenseData="expenseData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";

// Importing component modules
import BalanceDisplay from "./containers/BalanceDisplay.vue";
import MainHeader from "./MainHeader.vue";
import BarChart from "./charts/BarChart.vue";
import DoughnutChart from "./charts/DoughnutChart.vue";
import LineChart from "./charts/LineChart.vue";
import TableIncome from "./tables/TableIncome.vue";
import TableExpense from "./tables/TableExpense.vue";

// Importing store to handle income data
import { useIncomeStore } from "../store/incomeStore";
import { useExpenseStore } from "../store/expenseStore";

// Reactive references to hold income data and loading state
const incomeData = ref([]);
const expenseData = ref([]);
const isLoading: Ref<boolean> = ref(true);

// Fetch income data on component mount
onMounted(async () => {
  await useIncomeStore().getIncome();
  incomeData.value = useIncomeStore().income;
  await useExpenseStore().getExpense();
  expenseData.value = useExpenseStore().expenseData;
  isLoading.value = false; // Set loading state to false once the data is loaded
});
</script>
