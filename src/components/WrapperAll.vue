<template>
  <div
    class="w-full flex flex-wrap lg:flex-nowrap overflow-x-hidden"
    v-if="!isLoading"
  >
    <MainHeader class="fixed z-10 w-32" />
    <div class="w-full flex flex-wrap lg:flex-nowrap justify-center ml-32">
      <div class="w-full lg:w-[70%] overflow-x-hidden px-4">
        <BalanceDisplay :expenseData="expenseData" :incomeData="incomeData" />
        <BarChart :incomeData="incomeData" :expenseData="expenseData" />
        <div class="flex flex-wrap lg:flex-nowrap gap-4 md:gap-8 mt-12">
          <DoughnutChart :expenseData="expenseData" class="lg:w-[50%]" />
          <LineChart :expenseData="expenseData" class="lg:w-[50%]" />
        </div>
      </div>
      <div
        class="w-full lg:w-[18%] flex lg:flex-col justify-center items-start gap-12 mt-12 mb-12 lg:ml-8 bg-base-00"
      >
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
import BarChart from "./charts/BarChart.vue";
import DoughnutChart from "./charts/DoughnutChart.vue";
import LineChart from "./charts/LineChart.vue";
import MainHeader from "./MainHeader.vue";
import TableIncome from "./tables/TableIncome.vue";
import TableExpense from "./tables/TableExpense.vue";

// Importing store to handle income data
import { useExpenseStore } from "../store/expenseStore";
import { useIncomeStore } from "../store/incomeStore";
import { Store } from "tauri-plugin-store-api";

// Reactive references to hold income data and loading state
const expenseData: Ref<any> = ref([]);
const incomeData: Ref<any> = ref([]);
const isLoading: Ref<boolean> = ref(true);

// Initialize the store
const store = new Store(".budget.dat");

// Fetch income data on component mount
onMounted(async () => {
  await useIncomeStore().getIncome();
  incomeData.value = useIncomeStore().income;
  await useExpenseStore().getExpense();
  expenseData.value = useExpenseStore().expenseData;

  store.onChange(async () => {
    incomeData.value = await store.get("income");
    expenseData.value = await store.get("expense");
  });

  isLoading.value = false; // Set loading state to false once the data is loaded
});
</script>
