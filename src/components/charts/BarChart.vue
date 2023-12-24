<template>
  <div
    class="w-full p-4 mb-12 bg-base-200 rounded-md shadow shadow-base-300"
    v-if="data.labels"
  >
    <Bar
      class="w-full px-4 h-60 md:max-h-[15rem]"
      :data="data"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { Store } from "tauri-plugin-store-api";
import { useIncomeStore } from "../../store/incomeStore";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

const expenseData: Ref<any> = ref({});
const incomeData: Ref<any> = ref({});
const data = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Spendings",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
    {
      label: "Incomes",
      backgroundColor: "#00d8ff",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
});
const store = new Store(".budget.dat");

onMounted(async () => {
  /*   incomeData.value = await store.get("income"); */
  await useIncomeStore().getIncome();
  incomeData.value = useIncomeStore().income;

  expenseData.value = await store.get("expense");

  // Initialize an array with 12 zeros
  let expenseArray = Array(12).fill(0);
  let incomeArray = Array(12).fill(0);

  // If there is expense data, update the expenseArray
  if (expenseData.value) {
    for (let expense of expenseData.value) {
      let month = new Date(expense.date).getMonth(); // get the month of the expense
      expenseArray[month] += expense.amount; // add the expense amount to the corresponding month
    }
  }

  // If there is income data, update the incomeArray
  if (incomeData.value) {
    for (let income of incomeData.value) {
      let month = new Date(income.date).getMonth(); // get the month of the income
      incomeArray[month] += income.amount; // add the income amount to the corresponding month
    }
  }

  data.value = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Spendings",
        backgroundColor: "#f87979",
        data: expenseArray,
      },
      {
        label: "Incomes",
        backgroundColor: "#00d8ff",
        data: incomeArray,
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
</script>
