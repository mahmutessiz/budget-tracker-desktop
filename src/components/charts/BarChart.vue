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
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();

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
      label: t("spending_history"),
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

    // Get the current year and month
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Function to populate array with data
    const populateArray = (dataArray: any, arrayToUpdate: any) => {
      if (dataArray.value) {
        for (let data of dataArray.value) {
          let date = new Date(data.date);
          // Only consider data from the current year
          if (date.getFullYear() === currentYear) {
            let month = date.getMonth();
            arrayToUpdate[month] += data.amount;
          }
        }
      }
    };

    // Populate the expenseArray and incomeArray
    populateArray(expenseData, expenseArray);
    populateArray(incomeData, incomeArray);

    // Find the first non-zero month
    let firstNonZeroMonth = Math.min(
      expenseArray.findIndex((month) => month !== 0),
      incomeArray.findIndex((month) => month !== 0)
    );

    // Display the chart from 3 months before the first non-zero month
    let startMonth = Math.max(0, firstNonZeroMonth - 3);

    // Limit the display of zero values to a maximum of 4 months
    let endMonth = Math.min(currentMonth + 4, 11);

    // Update the chart data with the new expense and income arrays
    data.value = {
      labels: [
        t("january"),
        t("february"),
        t("march"),
        t("april"),
        t("may"),
        t("june"),
        t("july"),
        t("august"),
        t("september"),
        t("october"),
        t("november"),
        t("december"),
      ].slice(startMonth, endMonth + 1),
      datasets: [
        {
          label: t("spendings"),
          backgroundColor: "#f87979",
          data: expenseArray.slice(startMonth, endMonth + 1),
        },
        {
          label: t("income"),
          backgroundColor: "#00d8ff",
          data: incomeArray.slice(startMonth, endMonth + 1),
        },
      ],
    };
  });
});

// Chart options configuration
const options = ref({
  responsive: true,
  maintainAspectRatio: true,
});

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
