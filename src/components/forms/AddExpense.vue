<template>
  <form @submit.prevent="addexpense" class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <label for="amount" class="text-sm font-semibold text-gray-700"
        >Amount:</label
      ><br />
      <input
        id="amount"
        v-model="amount"
        type="number"
        required
        class="input input-bordered input-primary w-full"
      />
    </div>
    <div class="flex items-center gap-2">
      <label for="category" class="text-sm font-semibold text-gray-700"
        >Category:</label
      >
      <input
        id="category"
        v-model="category"
        type="text"
        required
        class="input input-bordered input-secondary w-full"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add expense</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
/* import { Store } from "tauri-plugin-store-api"; */
import { UseAddExpense } from "../utils/addExpense.ts";

/* const date = new Date();  */

const amount = ref();
const category = ref("");
const expense: any = ref([]);

const addexpense = async () => await UseAddExpense(expense, amount, category);
/* async function pushexpense() {
  expense.value.unshift({
    date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    amount: amount.value,
    category: category.value,
  });
}

const store = new Store(".budget.dat");

const addexpense = async () => {
  if (await store.get("expense")) {
    expense.value = await store.get("expense");
  } else {
    expense.value = [];
  }

  await pushexpense();

  await store.set("expense", expense.value);
  await store.save();

  amount.value = 0;
  category.value = "";
}; */
</script>
