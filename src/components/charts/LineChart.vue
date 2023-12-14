<template>
  <div
    class="w-full rounded-lg p-4 shadow dark:shadow-base-300 bg-base-200/50"
    v-if="data.labels"
  >
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { Store } from "tauri-plugin-store-api";

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
  const store = new Store(".budget.dat");
  expenseData.value = await store.get("expense");

  // Initialize an array with 12 zeros
  let expenseArray = Array(12).fill(0);

  // If there is expense data, update the expenseArray
  if (expenseData.value) {
    for (let expense of expenseData.value) {
      let month = new Date(expense.date).getMonth(); // get the month of the expense
      expenseArray[month] += expense.amount; // add the expense amount to the corresponding month
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
        label: "Monthly Expense",
        backgroundColor: "#f87979",
        data: expenseArray,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        pointStyle: "rectRounded",
        pointBackgroundColor: "#8381db",
        pointBorderColor: "#4e4cb3",
        tension: 0.1,
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Monthly Expense",
    },
  },
};

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
