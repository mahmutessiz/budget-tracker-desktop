<template>
  <div class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50">
    <Doughnut class="" :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
// Import necessary Vue composition API and Tauri plugin
import { ref, onMounted } from "vue";
import { Store } from "tauri-plugin-store-api";

// Import necessary Chart.js components and types
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { ChartOptions } from "chart.js";

// Create a new instance of Store to persist data
const store = new Store(".budget.dat");

// Refs to hold dynamic data
const chartData: any = ref();
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
  // Fetch expense data from the store if not already loaded
  if (!chartData.value) {
    chartData.value = await store.get("expense");
  }

  // Process fetched data to calculate sums for each category
  let summedCategories: { [key: string]: number } = {};
  chartData.value.forEach((item: any) => {
    if (summedCategories[item.category]) {
      summedCategories[item.category] += item.amount;
    } else {
      summedCategories[item.category] = item.amount;
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
});

// Chart options configuration
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "left",
    },
  },
};

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
</script>
