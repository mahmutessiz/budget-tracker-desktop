<template>
  <div class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50">
    <Doughnut class="" :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
// Import necessary Vue composition API and Tauri plugin
import { ref, onMounted, watchEffect, Ref } from "vue";
import { useI18n } from "vue-i18n";

// Import necessary Chart.js components and types
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { ChartOptions } from "chart.js";

// Refs to hold dynamic data
const chartData: any = ref();

// Define props for the component that will receive the expense data
const expenseData = defineProps({
  expenseData: Object,
});

const { t } = useI18n();
const data = ref({
  // Initial chart data with labels and datasets
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: [
        "#009688",
        "#FF5722",
        "#03A9F4",
        "#8BC34A",
        "#FFEB3B",
        "#9E9E9E",
      ],
      data: [40, 20, 80, 10],
    },
  ],
});

// Lifecycle hook to fetch and process data once component is mounted
onMounted(async () => {
  watchEffect(() => {
    // Fetch expense data from the store if not already loaded
    chartData.value = expenseData.expenseData;

    // Get the current year
    let currentYear = new Date().getFullYear();

    // Process fetched data to calculate sums for each category
    let summedCategories: { [key: string]: number } = {};
    chartData.value.forEach((item: any) => {
      let date = new Date(item.date);
      let year = date.getFullYear(); // get the year of the expense

      // Only add the expense amount to the corresponding category if it's in the current year
      if (year === currentYear) {
        if (summedCategories[item.category]) {
          summedCategories[item.category] += item.amount;
        } else {
          summedCategories[item.category] = item.amount;
        }
      }
    });

    // Update chart data with the summed values
    data.value = {
      labels: Object.keys(summedCategories),
      datasets: [
        {
          backgroundColor: [
            "#009688",
            "#FF5722",
            "#03A9F4",
            "#8BC34A",
            "#FFEB3B",
            "#9E9E9E",
          ],
          data: Object.values(summedCategories),
        },
      ],
    };
    options.value = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "left",
        },
        title: {
          display: true,
          text: t("expense_by_category"),
          position: "top",
        },
      },
    };
  });
});

// Chart options configuration
const options: Ref<ChartOptions<"doughnut">> = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: t("expense_by_category"),
      position: "top",
    },
  },
});

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
</script>
