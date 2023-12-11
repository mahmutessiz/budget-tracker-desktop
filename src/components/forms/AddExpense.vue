<template>
  <form @submit.prevent="addexpense" class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <label for="amount" class="text-sm font-semibold text-gray-700"
        >Amount:</label
      >
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
import { Store } from "tauri-plugin-store-api";

// Get the current date
const date = new Date();

// Refs to store the expense amount and category inputs
const amount = ref(0);
const category = ref("");
// Ref to store the array of expense entries
const expense: any = ref([]);

/**
 * Push a new expense entry into the expense array
 */
async function pushexpense() {
  expense.value.unshift({
    date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    amount: amount.value,
    category: category.value,
  });
}

/**
 * Add a new expense entry to the store and reset the input fields
 */
const addexpense = async () => {
  // Initialize the store
  const store = await new Store(".budget.dat");

  // Retrieve the current expense array from the store or initialize it if not present
  if (await store.get("expense")) {
    expense.value = await store.get("expense");
  } else {
    expense.value = [];
  }

  // Add the new expense entry to the array
  await pushexpense();

  // Save the updated expense array to the store
  await store.set("expense", expense.value);
  await store.save();

  // Reset input fields
  amount.value = 0;
  category.value = "";
};
</script>
