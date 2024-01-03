<template>
  <div
    class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50"
    v-if="data.labels"
  >
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

const expenseData: Ref<any> = ref({});

const { t } = useI18n();

// Define props for the component that will receive the expense data
const expenseDataProps = defineProps({
  expenseData: Object,
});

const data = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      pointStyle: "rectRounded",
      pointBackgroundColor: "#4e4cb3",
      pointBorderColor: "#4e4cb3",
      tension: 0.1,
    },
  ],
});

onMounted(async () => {
  watchEffect(() => {
    expenseData.value = expenseDataProps.expenseData;

    // Initialize an array with 12 zeros
    let expenseArray = Array(12).fill(0);

    // Get the current year and month
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // If there is expense data, update the expenseArray
    if (expenseData.value) {
      for (let expense of expenseData.value) {
        let date = new Date(expense.date);
        let year = date.getFullYear(); // get the year of the expense
        let month = date.getMonth(); // get the month of the expense

        // Only add the expense amount to the corresponding month if it's in the current year
        if (year === currentYear) {
          expenseArray[month] += expense.amount;
        }
      }
    }

    // Find the first non-zero month
    let firstNonZeroMonth = expenseArray.findIndex((month) => month !== 0);

    // Display the chart from 3 months before the first non-zero month
    let startMonth = Math.max(0, firstNonZeroMonth - 3);

    // Limit the display of zero values to a maximum of 4 months
    let endMonth = Math.min(currentMonth + 4, 11);

    // Update the chart data with the new expense array
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
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          pointStyle: "rectRounded",
          pointBackgroundColor: "#8381db",
          pointBorderColor: "#4e4cb3",
          tension: 0.2,
        },
      ],
    };
    options.value = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: t("monthly_spendings"),
        },
      },
    };
  });
});

const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: true,
      text: t("monthly_spendings"),
    },
  },
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
</script>
