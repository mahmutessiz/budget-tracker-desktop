<template>
  <div class="overflow-x-auto">
    <table class="table table-xs table-zebra" v-if="!expense">
      <caption class="text-primary-content font-bold text-lg">
        Expense
      </caption>
      <thead>
        <tr>
          <th></th>
          <th>location</th>
          <th>Last Login</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>

          <td>Canada</td>
          <td>12/16/2020</td>
          <td>Blue</td>
        </tr>
        <tr>
          <th>2</th>

          <td>United States</td>
          <td>12/5/2020</td>
          <td>Purple</td>
        </tr>
        <tr>
          <th>3</th>

          <td>China</td>
          <td>8/15/2020</td>
          <td>Red</td>
        </tr>
        <tr>
          <th>4</th>

          <td>Russia</td>
          <td>3/25/2021</td>
          <td>Crimson</td>
        </tr>
        <tr>
          <th>5</th>

          <td>Brazil</td>
          <td>5/22/2020</td>
          <td>Indigo</td>
        </tr>
        <tr>
          <th>6</th>

          <td>Venezuela</td>
          <td>12/8/2020</td>
          <td>Purple</td>
        </tr>
        <tr>
          <th>7</th>

          <td>Philippines</td>
          <td>2/17/2021</td>
          <td>Yellow</td>
        </tr>
        <tr>
          <th>8</th>

          <td>Indonesia</td>
          <td>5/23/2020</td>
          <td>Crimson</td>
        </tr>
        <tr>
          <th>9</th>

          <td>Philippines</td>
          <td>2/21/2021</td>
          <td>Maroon</td>
        </tr>
        <tr>
          <th>10</th>

          <td>Chad</td>
          <td>6/23/2020</td>
          <td>Green</td>
        </tr>
        <tr>
          <th>11</th>

          <td>Poland</td>
          <td>7/9/2020</td>
          <td>Indigo</td>
        </tr>
        <tr>
          <th>12</th>

          <td>Indonesia</td>
          <td>2/12/2021</td>
          <td>Maroon</td>
        </tr>
        <tr>
          <th>13</th>

          <td>Poland</td>
          <td>5/31/2020</td>
          <td>Purple</td>
        </tr>
        <tr>
          <th>14</th>
          <td>Portugal</td>
          <td>4/27/2021</td>
          <td>Aquamarine</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-xs table-zebra" v-if="expense">
      <caption
        class="w-full bg-primary text-primary-content font-bold text-lg rounded-sm"
      >
        Expense
      </caption>
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in expense" :key="item">
          <th>{{ i + 1 }}</th>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Store } from "tauri-plugin-store-api";

// Ref to hold the expense data
const expense = ref();

onMounted(async () => {
  // Initialize the store on component mount
  const store = new Store(".budget.dat");

  // If the expense is not already set, retrieve it from the store
  if (!expense.value) {
    expense.value = await store.get("expense");
  }

  // Subscribe to store changes and update the expense accordingly
  store.onChange(async () => {
    expense.value = await store.get("expense");
  });
});
</script>
