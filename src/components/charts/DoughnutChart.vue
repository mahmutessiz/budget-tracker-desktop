<template>
  <div class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50">
    <Doughnut class="" :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { ChartOptions } from "chart.js";

const data = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

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

ChartJS.register(ArcElement, Tooltip, Legend);
</script>
