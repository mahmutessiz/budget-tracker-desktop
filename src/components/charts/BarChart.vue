<template>
  <div
    class="w-full p-4 mb-12 bg-base-200 rounded-md shadow shadow-base-300"
    v-if="data.labels"
  >
    <!-- Bar chart to display income and spendings data -->
    <Bar
      class="w-full px-4 h-60 md:max-h-[15rem]"
      :data="data"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, Ref } from "vue";

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

// Chart data representation
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

// References to the expense and income data
const expenseData: Ref<any> = ref({});
const incomeData: Ref<any> = ref({});
const incomeDataProp = defineProps({
  incomeData: { type: Object, default: () => {} },
  expenseData: { type: Object, default: () => {} },
});

onMounted(async () => {
  // Fetch income data from props and expense data from the store
  watchEffect(() => {
    incomeData.value = incomeDataProp.incomeData;
    expenseData.value = incomeDataProp.expenseData;

    // Initialize an array with 12 zeros for expenses and incomes
    let expenseArray = Array(12).fill(0);
    let incomeArray = Array(12).fill(0);

    // Populate the expenseArray with data from expenseData
    if (expenseData.value) {
      for (let expense of expenseData.value) {
        let month = new Date(expense.date).getMonth();
        expenseArray[month] += expense.amount;
      }
    }

    // Populate the incomeArray with data from incomeData
    if (incomeData.value) {
      for (let income of incomeData.value) {
        let month = new Date(income.date).getMonth();
        incomeArray[month] += income.amount;
      }
    }

    // Update the chart data with the new expense and income arrays
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
});

// Chart options configuration
const options = {
  responsive: true,
  maintainAspectRatio: true,
};

// Register required components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
</script>
